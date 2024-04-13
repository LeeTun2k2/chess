import {
  Container,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Box,
  useToast,
  Flex,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import ClientLayout from "../../components/layouts/clientLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import appSettings from "../../settings/appSettings";
import { toast_error } from "../../lib/hooks/toast";
import { formatDate } from "../../lib/datetime";

export default function AchievementPage() {
  const { t } = useTranslation();
  const theme = localStorage.getItem("theme");
  const toast = useToast();
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);

  function getBackgroundColor(reward) {
    if (theme === "dark")
      if (reward.includes("Vàng")) {
        return "gold";
      } else if (reward.includes("Bạc")) {
        return "silver";
      } else if (reward.includes("Đồng")) {
        return "#CD7F32";
      } else {
        return "gray.200";
      }
    else {
      if (reward.includes("Vàng")) {
        return "yellow.200";
      } else if (reward.includes("Bạc")) {
        return "gray.200";
      } else if (reward.includes("Đồng")) {
        return "orange.200";
      } else {
        return "gray.200";
      }
    }
  }

  function getTextColor(bgColor) {
    const brightness = parseInt(bgColor.replace("#", ""), 16);
    const luminance =
      brightness <= 0.03928
        ? brightness / 12.92
        : ((brightness + 0.055) / 1.055) ** 2.4;
    const contrast =
      luminance > 0.03928 ? (luminance + 0.05) / 1.05 : luminance / 12.92;
    return contrast > 3 ? "#ffffff" : "#000000";
  }

  useEffect(() => {
    axios
      .get(`${appSettings.API_PROXY}/achievements/honor-list`)
      .then((resp) => {
        setData(resp?.data?.honor_list ?? {});
        setEvents(resp?.data?.events ?? []);
      })
      .catch((err) => {
        if (err?.response) toast(toast_error(err?.response?.data));
        else toast(toast_error("Something went wrong. Please try again."));
      });
  }, [toast]);

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading as="h1" size="2xl" mb={4}>
          {t("achievements.achievements")}
        </Heading>
        <Box mt={8}>
          {events.map((event, index) => (
            <Box>
              <Flex key={index} align={"start"}>
                <Flex
                  w={"10%"}
                  bgColor={theme === "dark" ? "black" : "lightgray"}
                  p={4}
                  borderRadius={8}
                  justify={"center"}
                  align={"center"}
                  mr={4}
                >
                  <Text textAlign={"center"}>{formatDate(event.time)}</Text>
                </Flex>
                <Flex
                  w={"23%"}
                  bgColor={theme === "dark" ? "black" : "lightgray"}
                  p={4}
                  borderRadius={8}
                  justify={"center"}
                  align={"center"}
                >
                  <Text textAlign={"center"}>{event.event}</Text>
                </Flex>
                <Spacer />
                <Box w={"60%"}>
                  {data[event?.time] &&
                    data[event?.time]
                      .sort(
                        (a, b) => ("" + a.reward).localeCompare(b.reward) * -1
                      )
                      .map((achive, idx) => {
                        const bgColor = getBackgroundColor(achive.reward);
                        const textColor = getTextColor(bgColor);
                        return (
                          <Flex
                            bgColor={bgColor}
                            color={textColor}
                            p={2}
                            borderRadius={8}
                            mb={4}
                          >
                            <Text mr={2}>{t("achievements.member")}</Text>
                            <Text mr={2}>{achive.member}</Text>
                            <Text mr={2}>{t("achievements.has_receive")}</Text>
                            <Text fontWeight={"bold"} mr={2}>
                              {achive.reward}
                            </Text>
                          </Flex>
                        );
                      })}
                </Box>
              </Flex>
              <Divider mb={8} borderColor={theme === "dark" ?? "black"} />
            </Box>
          ))}
        </Box>
      </Container>
    </ClientLayout>
  );
}
