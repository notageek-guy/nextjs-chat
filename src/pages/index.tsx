import { AuthRoute } from "@/components/AuthRoute";
import Sidebar from "@/components/Sidebar";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
export default function Home() {
  return (
    <AuthRoute>
      <div>
        <Head>
          <title>Chat App</title>
          <meta name="description" content="Chat App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <Box h="100vh">
        <Sidebar />
      </Box>
    </AuthRoute>
  );
}
