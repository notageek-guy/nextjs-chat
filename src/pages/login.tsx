import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { Box, Flex, Heading, HStack, IconButton, Text } from "@chakra-ui/react";
import { BsFillChatDotsFill } from "react-icons/bs";
export default function Login() {
  const { handleGoogleLogin } = useAuth();
  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="100%" maxW="400px" p={4} borderWidth="1px" borderRadius="md">
        <Flex
          direction="column"
          align="center"
          justifyContent="center"
          mb={4}
          p="4"
        >
          <HStack my="4" spacing={2}>
            <BsFillChatDotsFill size={40} />
            <Heading size="md">Chat App</Heading>
          </HStack>

          <IconButton
            onClick={handleGoogleLogin}
            bg="red.500"
            _hover={{
              bg: "red.600",
            }}
            aria-label="Google"
            icon={<FaGoogle />}
            w="100%"
            mb={4}
          />
        </Flex>
      </Box>
    </Box>
  );
}
