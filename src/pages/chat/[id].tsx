import React, { useEffect, useRef } from "react";
import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { query, orderBy, doc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { Box, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getOtherEmail } from "@/utils";
import ChatSection from "@/components/ChatSection";
import ChatBox from "@/components/ChatBox";

export default function Chat() {
  const { user } = useAuth();
  const { id } = useRouter().query;
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));

  const btmref = useRef<HTMLDivElement>(null);
  const [chat] = useDocumentData(doc(db, "chats", String(id)));
  const [messages] = useCollectionData(q);
  useEffect(() => {
    const timer = setTimeout(() => {
      btmref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <Flex h="100vh">
      <Head>
        <title>Chat App</title>
      </Head>
      <Sidebar />
      <Suspense fallback={<Spinner />}>
        <Flex flex="1" direction="column">
          <Header email={getOtherEmail(chat?.users, user)} />
          <Flex
            flex="1"
            direction="column"
            overflowX="scroll"
            px="3"
            sx={{
              "&::-webkit-scrollbar": {
                width: 0,
                height: 0,
              },
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              {messages?.map((msg) => {
                const sender = msg.sender === user.email;
                return (
                  <ChatSection
                    key={Math.random()}
                    sender={sender}
                    text={msg.text}
                    timestamp={msg.timestamp}
                  />
                );
              })}
            </Suspense>
            <Box ref={btmref} />
          </Flex>
          <ChatBox id={id} user={user} />
        </Flex>
      </Suspense>
    </Flex>
  );
}
