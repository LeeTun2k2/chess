import {
  Avatar,
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CometChat } from "@cometchat-pro/chat";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ClientLayout from "../../components/layouts/clientLayout";
import axios from "../../lib/axios";
import { toast_error } from "../../lib/hooks/toast";
import appSettings from "../../settings/appSettings";

export default function FriendPage(props) {
  const { t } = useTranslation();
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [friends, setFriends] = useState([]);
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    axios
      .get(`${appSettings.API_PROXY}/users/friends`)
      .then((resp) => {
        setFriends(resp?.data?.friends ?? []);
        setReceiver(friends[0]);
      })
      .catch((err) => {
        toast(toast_error(t("common.something_went_wrong")));
      });
  }, [toast]);

  const sendMessage = async () => {
    if (text.trim() === "") return;

    let receiverType = "user";
    let message = new CometChat.TextMessage(receiver.id, text, receiverType);

    try {
      const sentMessage = await CometChat.sendMessage(message);
      setMessages((prev) => [...prev, sentMessage]);
      setText("");
      console.log("Message sent successfully:", sentMessage);
    } catch (error) {
      console.error("Message sending failed with error:", error);
    }
  };
  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading mb={4}>{t("chat.messages")}</Heading>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box
            display={{ base: "none", md: "block" }}
            w={{ base: "100%", md: "25%" }}
            mb={{ base: 8, md: 0 }}
            h={"80vh"}
            overflowY={"auto"}
          >
            {friends.map((item, index) => (
              <Card
                key={index}
                p={2}
                boxShadow={"xs"}
                variant={"outline"}
                mx={2}
                overflow={"hidden"}
                cursor={"pointer"}
                onClick={() => {}}
              >
                <Flex
                  overflow={"hidden"}
                  textOverflow="ellipsis"
                  alignItems={"center"}
                >
                  <Avatar
                    alignSelf={"center"}
                    size={"md"}
                    name={item.name}
                    src={`${appSettings.API_PROXY}/images/user-${item?.id ?? ""}`}
                    mr={2}
                  />
                  <Box>
                    <Text noOfLines={1} color="gray" fontSize={"sm"}>
                      @{item.username}
                    </Text>
                    <Text fontWeight={500} noOfLines={2}>
                      {item.name}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            ))}
          </Box>

          <Spacer display={{ base: "none", md: "block" }} />

          <Box
            w={{ base: "100%", md: "75%" }}
            border={"1px lightgray solid"}
            p={4}
            borderRadius={4}
            boxShadow={2}
            h={"80vh"}
            overflowY={"auto"}
          >
            123
          </Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
