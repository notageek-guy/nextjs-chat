import React, { useState } from "react";
import {
  Avatar,
  Button,
  Center,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  VStack,
  Input,
} from "@chakra-ui/react";
import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "@/context/AuthContext";
import Logout from "./Logout";
import ChatList from "./ChatList";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roomName, setRoomName] = useState("");
  const [snapshot] = useCollection(collection(db, "chats"));

  const { user } = useAuth();
  const chats = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const chatExists = (email: string) => {
    return chats?.find(
      (chat: any) =>
        chat.users.includes(user.email) && chat.users.includes(email)
    );
  };
 
  const newchat = async () => {
    if (!chatExists(roomName)) {
      await addDoc(collection(db, "chats"), {
        users: [user.email, roomName],
      });
    }
  };
  return (
    <Flex maxW="300px" borderEnd={"1px solid"} direction="column" flex="1">
      <Flex p="3" h="80px" alignItems="center" justifyContent="space-between">
        <Avatar size="sm" src={user?.photoURL} />
        <Center>
          <DarkModeToggle />
          <Logout />
        </Center>
      </Flex>
      <Flex align="center" px="3">
        <Button onClick={onOpen} colorScheme="blue" w="100%" h="50px">
          Create Room
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Room</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Room Name"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  newchat();
                  onClose();
                }}
              >
                Done
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Flex
        direction="column"
        flex="1"
        overflowX={"scroll"}
        sx={{
          "&::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
          "&::-webkit-scrollbar-track": {
            width: 0,
            height: 0,
          },
        }}
      >
        <Flex p="3" mt="4" gap="3" direction="column">
          {chats?.map((chat: any) => {
            return <ChatList key={chat.id} id={chat.id} users={chat.users} />;
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
