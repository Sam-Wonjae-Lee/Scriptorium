import "/styles/globals.css";
import type { AppProps } from "next/app";
import ThemeProvider, { useTheme } from "../context/ThemeContext";
import { AlertListener } from "@/components/Alert";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>Scriptorium</title>
      <ThemeProvider>
        <ThemeWrapper>
          <AlertListener />
          <Component {...pageProps} />
        </ThemeWrapper>
      </ThemeProvider>
    </>
  );
}

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    const themeCss =
      theme === "dark"
        ? `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css`
        : `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-light.min.css`;

    // Remove previously loaded theme if exists
    const existingLink = document.getElementById("theme-css");
    if (existingLink) {
      existingLink.setAttribute("href", themeCss);
    } else {
      // Create a new link tag to load the theme
      const link = document.createElement("link");
      link.id = "theme-css";
      link.rel = "stylesheet";
      link.href = themeCss;
      document.head.appendChild(link);
    }
  }, [theme]);

  return <>{children}</>;
};
