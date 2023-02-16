import React from "react";

import { Avatar, Box, Flex, Heading } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";
export default function Header({ email }: { email: string }) {
    const { user } = useAuth();
  return (
    <Flex h="80px" w="100%" align="center" p={5}>
      {/* first letter avatar */}
      <Box
        w={10}
        h={10}
        bg="blue.500"
        borderRadius="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        fontSize="lg"
        fontWeight="bold"
        mr={3}
      >
       {email && email.charAt(0).toUpperCase()}
      </Box>
      <Heading size="lg">{email}</Heading>
    </Flex>
  );
}
