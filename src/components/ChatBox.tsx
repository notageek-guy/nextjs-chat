import { useState } from "react";
import { FormControl, Input, Button } from "@chakra-ui/react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Timestamp } from "firebase/firestore";

export default function ChatBox({ id, user }: { id: any; user: any }) {
  const [input, setInput] = useState("");
  const messageRef = collection(db, `chats/${id}/messages`);
  return (
    <FormControl
      as="form"
      onSubmit={async (e) => {
        e.preventDefault();
        await addDoc(messageRef, {
          text: input,
          timestamp : Timestamp.now(),
          sender: user.email,
        });
        setInput("");
      }}
      p={3}
    >
      <Input
        placeholder="Enter your message"
        value={input}
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit" hidden>
        Submit
      </Button>
    </FormControl>
  );
}
