import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { AuthProvider } from "@/context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme/theme";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
