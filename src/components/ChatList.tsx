import React from "react";
import { useRouter } from "next/router";
import { Avatar, Text, Flex } from "@chakra-ui/react";
import { getOtherEmail } from "@/utils";
import { useAuth } from "@/context/AuthContext";
interface Props {
  id: string;
  users: string[];
}
export default function ChatList({ id, users }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const goToChatRoom = (id: string) => {
    router.push(`/chat/${id}`);
  };
  const newList = users
    .map((user) => user.replace("@gmail.com", ""))
    .map((user) => {
      return user.charAt(0).toUpperCase() + user.slice(1);
    });

  return (
    <Flex
      _hover={{ backgroundColor: "gray.100" }}
      onClick={() => goToChatRoom(id)}
      p="3"
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Avatar src={""} />
      <Flex justifyContent={"flex-end"} direction="column" ml="3">
        <Text fontSize="sm" color="gray.500">
          {getOtherEmail(newList, user)}
        </Text>
      </Flex>
    </Flex>
  );
}
