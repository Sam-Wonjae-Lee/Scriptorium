import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
        {/* <footer className="flex justify-between w-full h-10 bg-background_secondary-dark dark:bg-background_secondary-light text-text-dark dark:text-text-light">
          <div className="ml-4">Copyright 2024</div>
          <div className="mr-4">CSC309 Group 8068</div>
          </footer> */}
      </body>
    </Html>
  );
}
