import React, { useEffect } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import java from "highlight.js/lib/languages/java";

type MarkdownRendererProps = {
  content: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const parseMarkdown = (markdown: string): string => {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("python", python);
    hljs.registerLanguage("c", c);
    hljs.registerLanguage("cpp", cpp);
    hljs.registerLanguage("java", java);

    // Escape HTML entities to prevent XSS
    const escapeHtml = (str: string) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    // Parsing order matters to avoid collisions!
    const escaped = escapeHtml(markdown);

    // Bold Italic
    let html = escaped.replace(
      /\*\*\*(.*?)\*\*\*/g,
      "<strong><em>$1</em></strong>"
    );

    // Underline
    html = html.replace(/__(.*?)__/g, "<u>$1</u>");

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Code blocks (multiline)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      const highlightedCode = hljs.highlight(code, {
        language: lang,
      }).value;
      return `<pre><code class="hljs language-${lang} !bg-transparent">${highlightedCode}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`(.*?)`/g, "<code class='hljs rounded-md'>$1</code>");

    // Hyperlinks
    html = html.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-hot_pink-normal">$1</a>'
    );

    // Headers
    html = html
      .replace(/^### (.*$)/gm, "<h3 class='text-lg'>$1</h3>")
      .replace(/^## (.*$)/gm, "<h2 class='text-xl'>$1</h2>")
      .replace(/^# (.*$)/gm, "<h1 class='text-2xl'>$1</h1>");

    // Tables
    html = html.replace(/(\|.+\|[\r\n])+/g, (match) => {
      const rows = match
        .split("\n")
        .filter((line) => !/^(\|[-:]+)+\|$/.test(line)) // Filter out the separator line
        .map((line, index) => {
          const cells = line
            .split("|")
            .map((cell) => cell.trim())
            .filter(Boolean); // Remove empty cells

          // Wrap the first row in <thead> and the others in <tbody>
          if (index === 0) {
            // First row is the header row
            return `<thead ><tr><th class="border px-4 py-2">${cells.join(
              "</th><th class='border px-4 py-2'>"
            )}</th></tr></thead>`;
          } else {
            // Other rows are data rows
            return `<tr><td class="border px-4 py-2 text-center">${cells.join(
              "</td class='border px-4 py-2'><td>"
            )}</td></tr>`;
          }
        })
        .join("");

      // Wrap all rows in a <tbody>
      return `<table class="table-auto rounded-lg border-separate border border-text-light dark:border-text-dark">${rows}</table>`;
    });

    // Replace newlines with <br>
    html = html.replace(/\n/g, "<br />");

    return html;
  };

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: parseMarkdown(content),
      }}
    />
  );
};

export default MarkdownRenderer;
