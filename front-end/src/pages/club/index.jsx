import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ChatBox from "../../components/chat/chatbox";
import axios from "../../lib/axios";
import { formatDate, formatDatetime } from "../../lib/datetime";
import { toast_error } from "../../lib/hooks/toast";
import appSettings from "../../settings/appSettings";

export default function ClubPage(props) {
  const theme = localStorage.getItem("theme");
  const { t } = useTranslation();
  const toast = useToast();

  const [meetingInfo, setMeetingInfo] = useState({});

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get(`${appSettings.API_PROXY}/offline-calendar`)
      .then((resp) => {
        setMeetingInfo(resp?.data?.offline_calendar ?? []);
      })
      .catch((err) => {
        toast(toast_error(t("common.something_went_wrong")));
      });
  }, [toast, t]);

  useEffect(() => {
    axios
      .get(`${appSettings.API_PROXY}/notifications/top`)
      .then((resp) => {
        setNotifications(resp?.data?.notifications ?? []);
      })
      .catch((err) => {
        toast(toast_error(t("common.something_went_wrong")));
      });
  }, [toast, t]);

  return (
    <Fragment>
      <Container maxW="6xl" py={8}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent={"sta"}
          minH={650}
        >
          <VStack w={{ base: "100%", md: "66%" }} mb={{ base: 8, md: 0 }}>
            <Box
              w={"100%"}
              boxShadow={4}
              border={"1px solid lightgray"}
              borderRadius={8}
              p={4}
              bgColor={theme === "dark" ? "black" : "gray.100"}
            >
              <Heading as="h2" mb={4}>
                {t("club.calendar_club_meeting")}
              </Heading>
              <Text fontSize="xl" mb={4}>
                {t("club.welcome_to_calendar_club_meeting")}
              </Text>
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  {t("club.date_time")}
                </Text>
                <Text>
                  {meetingInfo?.time
                    ? formatDatetime(meetingInfo.time)
                    : t("club.datetime_not_found")}
                </Text>
              </Box>
              <Box mt={4}>
                <Text fontSize="lg" fontWeight="bold">
                  {t("club.location")}
                </Text>
                <Text>
                  {meetingInfo?.location ?? t("club.location_not_found")}
                </Text>
              </Box>
            </Box>
            <Box w={"100%"}>
              <Heading as={"h5"} fontSize={"xl"} mx={4} mt={8} mb={4}>
                {t("club.notifications")}
              </Heading>
              <Box border={"1px lightgray solid"} borderRadius={8}>
                {notifications.map((notification, idx) => {
                  return (
                    <Card key={idx} px={4} py={2}>
                      <Flex alignItems={"center"} minH={20}>
                        <Box w={"75%"}>
                          <Text fontWeight={"bold"}>{notification.title}</Text>
                          <Text>{notification.description}</Text>
                        </Box>
                        <Box w={"25%"}>
                          <Text fontSize="xs" color="gray.500" align={"right"}>
                            {t("club.created")}{" "}
                            {formatDate(notification.created_at)}
                          </Text>
                        </Box>
                      </Flex>
                    </Card>
                  );
                })}
              </Box>
            </Box>
          </VStack>
          <Spacer display={{ base: "none", md: "block" }} />
          <Box
            w={{ base: "100%", md: "30%" }}
            display={{ base: "none", md: "block" }}
            h={"fit-content"}
            borderRadius={8}
          >
            <ChatBox />
          </Box>
        </Flex>
      </Container>
    </Fragment>
  );
}
