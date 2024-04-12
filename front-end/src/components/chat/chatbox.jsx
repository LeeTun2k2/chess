import React, { useState, useEffect } from "react";
import { Box, Text, Input, Button, Flex } from "@chakra-ui/react";
import OpenAI from "openai";
import { OPENAI_KEY } from "../../settings/appSettings"

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [openaiInstance, setOpenAIInstance] = useState(null);
  const chessSuggestions = ["What's your next move?", "How about playing Nf3?", "Consider castling kingside."];

  useEffect(() => {
    // Initialize OpenAI instance
    const openai = new OpenAI({ apiKey: OPENAI_KEY, dangerouslyAllowBrowser: true });
    setOpenAIInstance(openai);
  }, []);

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const message = {
      role: "user",
      content: inputText,
    };

    setMessages([...messages, message]);
    setInputText("");

    try {
      const completion = await openaiInstance.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...messages,
          message
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 50
      });

      const botMessage = {
        role: "assistant",
        content: completion.choices[0].message.content,
      };

      setMessages([...messages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const sendChessSuggestion = async (suggestion) => {
    setInputText(suggestion);
    sendMessage();
  };

  return (
    <Box p="4" boxShadow="lg" borderRadius="md">
      <Box h="300px" overflowY="auto" mb="4">
        {messages.map((message, index) => (
          <Box key={index} alignSelf={message.role === "user" ? "flex-end" : "flex-start"} bg={message.role === "user" ? "blue.100" : "gray.100"} p="2" borderRadius="md" mb="2">
            <Text>{message.content}</Text>
          </Box>
        ))}
      </Box>
      <Flex align="center" justify="space-between" padding={2}>
        <Input
          flex="1"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type a message..."
          style={{ whiteSpace: "pre-wrap" }}
        />
        
      </Flex>
      <Button colorScheme="blue" onClick={sendMessage}>Send</Button>
        <Button colorScheme="red" onClick={clearChat}>Clear Chat</Button>
      <Box mt="4">
        <Text fontWeight="bold" mb="2">Chess Suggestions:</Text>
        {chessSuggestions.map((suggestion, index) => (
          <Button key={index} onClick={() => sendChessSuggestion(suggestion)} mr="2">{suggestion}</Button>
        ))}
      </Box>
    </Box>
  );
};

export default ChatPage;
