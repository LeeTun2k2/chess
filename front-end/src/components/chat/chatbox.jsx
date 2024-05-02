import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import OpenAI from "openai";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoSend } from "react-icons/io5";
import { getUserData } from "../../lib/auth";
import appSettings from "../../settings/appSettings";

const ChatBox = () => {
  const user = getUserData();
  const theme = localStorage.getItem("theme");
  const { t } = useTranslation();
  const [openaiInstance, setOpenAIInstance] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: t("chat.hello"),
      username: t("chat.assistant"),
      user_id: "assistant",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const suggestions = [
    t("chat.about_ute_chess_club"),
    t("chat.when_club_offline"),
    t("chat.how_to_play_chess"),
  ];

  useEffect(() => {
    const openai = new OpenAI({
      apiKey: appSettings.OPENAI_KEY,
      dangerouslyAllowBrowser: true,
    });
    setOpenAIInstance(openai);
  }, []);

  const sendMessage = async (text) => {
    const trimmedInputValue = inputValue.trim();
    const trimmedText = text ? text.trim() : "";

    if (trimmedInputValue === "" && trimmedText === "") return;

    const oldMessages = [...messages];
    const message = {
      text: trimmedText || trimmedInputValue,
      user_id: user?.id,
      username: user?.username,
    };

    setMessages([...oldMessages, message]); // Set the message immediately for smooth UX
    setInputValue(""); // Clear input field

    const gptMessage = {
      role: "user",
      content: trimmedText || trimmedInputValue,
    };

    // Show loading indicator
    const loadingMessage = {
      username: "System",
      text: <Spinner size="sm" />,
      user_id: "system",
    };
    setMessages([...oldMessages, message, loadingMessage]);

    try {
      const completion = await openaiInstance.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...oldMessages.map((item) => ({
            role: item.id ? "user" : "assistant",
            content: item.text,
          })),
          gptMessage,
        ],
        model: "gpt-3.5-turbo-0125",
        max_tokens: 100,
      });

      const botMessageContent = completion.choices[0].message.content;
      const botMessage = {
        username: t("chat.assistant"),
        text: botMessageContent,
        user_id: "assistant",
      };

      setTimeout(() => {
        setMessages([...oldMessages, message, botMessage]);
      }, 2500);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box w={"100%"} mx="auto">
      <Flex
        p={4}
        mb={4}
        borderRadius="md"
        boxShadow={4}
        h={430}
        overflowY="auto"
        scrollBehavior={"smooth"}
        border={"1px solid lightgray"}
        flexDir={"column"}
        position={"relative"}
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
              color={theme === "dark" ? "white" : "gray.500"}
              textAlign={user?.id === message.user_id ? "right" : "left"}
              mx={1}
            >
              @{message.username}
            </Text>
            <Text
              bgColor={
                user?.id === message.user_id
                  ? theme === "dark"
                    ? "gray.600"
                    : "black"
                  : theme === "dark"
                    ? "black"
                    : "lightgray"
              }
              textAlign={user?.id === message.user_id ? "right" : "left"}
              color={
                user?.id === message.user_id
                  ? theme === "dark"
                    ? "black"
                    : "white"
                  : theme === "dark"
                    ? "white"
                    : "black"
              }
              px={4}
              py={1}
              borderRadius={8}
            >
              {message.text}
            </Text>
          </Box>
        ))}
        {messages?.length < 2 && user?.id && (
          <Flex
            position={"absolute"}
            flexDir={"column"}
            align={"center"}
            bottom={0}
            w={"100%"}
            px={4}
            left={0}
          >
            {suggestions.map((item, idx) => (
              <Button
                variant={"outline"}
                colorScheme="gray"
                borderRadius={20}
                key={idx}
                w={"100%"}
                mb={2}
                onClick={() => {
                  sendMessage(item);
                }}
              >
                {item}
              </Button>
            ))}
          </Flex>
        )}
      </Flex>
      {user?.id ? (
        <HStack>
          <Input
            placeholder={t("chat.type_your_message_here")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target?.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            colorScheme="gray"
            variant={"outline"}
            borderColor={"lightgray"}
          />
          <Button
            colorScheme="gray"
            onClick={() => {
              sendMessage();
            }}
            title={t("chat.send")}
          >
            <IoSend fontSize={24} />
          </Button>
        </HStack>
      ) : (
        <Text color={"gray"} fontSize={"sm"} align={"center"}>
          {t("chat.please_login")}
        </Text>
      )}
    </Box>
  );
};

export default ChatBox;
