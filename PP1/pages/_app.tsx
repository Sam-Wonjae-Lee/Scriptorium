import "/styles/globals.css";
import type { AppProps } from "next/app";
import ThemeProvider from "../context/ThemeContext";
import { AlertListener } from "@/components/Alert";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AlertListener />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
