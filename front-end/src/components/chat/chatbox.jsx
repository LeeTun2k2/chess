import React, { useState } from "react";
import { Box, Input, Button, Text, HStack, Flex } from "@chakra-ui/react";
import { getUserData } from "../../lib/auth";
import { IoSend } from "react-icons/io5";

const ChatBox = () => {
  const user = getUserData();
  const [messages, setMessages] = useState([
    {
      username: "leetun2k2",
      text: "Hello",
      user_id: 123123,
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, { text: inputValue, user_id: user?.id }]);
      setInputValue("");
    }
  };

  return (
    <Box w={"100%"} mx="auto">
      <Flex
        p={4}
        mb={4}
        borderRadius="md"
        boxShadow={4}
        h={400}
        overflowY="auto"
        scrollBehavior={"smooth"}
        border={"1px solid lightgray"}
        flexDir={"column"}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            mb={2}
            maxW={"80%"}
            alignSelf={user?.id === message.user_id ? "flex-end" : "flex-start"}
          >
            <Text
              fontSize={"x-small"}
              color={"gray.500"}
              textAlign={user?.id === message.user_id ? "right" : "left"}
              mx={1}
            >
              @{message.username}
            </Text>
            <Text
              bgColor={user?.id === message.user_id ? "gray.100" : "lightgray"}
              textAlign={user?.id === message.user_id ? "right" : "left"}
              px={4}
              py={1}
              borderRadius={8}
            >
              {message.text}
            </Text>
          </Box>
        ))}
      </Flex>
      {user?.id ? (
        <HStack>
          <Input
            placeholder="Type your message here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            colorScheme="gray"
            variant={"outline"}
            borderColor={"lightgray"}
          />
          <Button colorScheme="gray" onClick={sendMessage}>
            <IoSend fontSize={24} />
          </Button>
        </HStack>
      ) : (
        <Text color={"gray"} fontSize={"sm"} align={"center"}>
          Please log in to send message
        </Text>
      )}
    </Box>
  );
};

export default ChatBox;
