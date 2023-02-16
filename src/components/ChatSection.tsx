import React from "react";
import { Flex, Text } from "@chakra-ui/react";
interface Props {
  sender: boolean;
  text: string;
  timestamp: any;
}
import format from "date-fns/format";
import { parseISO } from "date-fns";
export default function ChatSection({ sender, text, timestamp }: Props) {
  const { seconds, nanoseconds } = timestamp;
  const formatInAmPm = format(
    parseISO(new Date(seconds * 1000).toISOString()),
    "PPpp"
  );
  const newFormat = formatInAmPm.replace("AM", "am").replace("PM", "pm");
  const finalFormat = newFormat.slice(0, -3);

  return (
    <Flex
      alignSelf={sender ? "flex-end" : "flex-start"}
      bg={sender ? "blue.500" : "gray.500"}
      w="fit-content"
      minW={100}
      borderRadius={"lg"}
      p="3"
      m="1"
    >
      <Flex direction="column">
        <Text>{text || "..."}</Text>
        <Text fontSize="xs" color="gray.200">
          {finalFormat}
        </Text>
      </Flex>
    </Flex>
  );
}
