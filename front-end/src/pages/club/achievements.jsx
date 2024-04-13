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
  Table,
  Thead,
  Th,
  Tbody,
  Td,
  Tr,
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
          {events
            .sort((a, b) => ("" + a.time).localeCompare(b.time) * -1)
            .map((event, index) => (
              <Box key={index}>
                <Box mb={4}>
                  <Text
                    textAlign={"center"}
                    fontWeight={"bold"}
                    fontSize={"lg"}
                  >
                    {event.event}
                  </Text>
                  <Text textAlign={"center"}>{formatDate(event.time)}</Text>
                </Box>
                {data[event?.time] && (
                  <Table
                    size={{ base: "sm", md: "md" }}
                    colorScheme="gray"
                    borderRadius={4}
                    overflow={"hidden"}
                    __css={{ "table-layout": "fixed", width: "full" }}
                    variant={"striped"}
                  >
                    <Thead bgColor={theme === "dark" ? "black" : "gray.200"}>
                      <Tr>
                        <Th width="10%" textAlign={"center"}>
                          {t("common.no")}
                        </Th>
                        <Th width="20%" textAlign={"left"} cursor={"pointer"}>
                          {t("achievements.member")}
                        </Th>
                        <Th width="20%" textAlign={"left"} cursor={"pointer"}>
                          {t("achievements.reward")}
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data[event?.time].map((item, index) => (
                        <Tr key={index} userSelect="none" cursor="pointer">
                          <Td textAlign={"center"}>{index + 1}</Td>
                          <Td
                            textAlign={"left"}
                            overflow="hidden"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                          >
                            {item.member}
                          </Td>
                          <Td
                            textAlign={"left"}
                            overflow="hidden"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                          >
                            {item.reward}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}
                <Divider mb={8} borderColor={theme === "dark" ?? "black"} />
              </Box>
            ))}
        </Box>
      </Container>
    </ClientLayout>
  );
}
