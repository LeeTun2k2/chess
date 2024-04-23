import {
  Box,
  Container,
  Divider,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ClientLayout from "../../components/layouts/clientLayout";
import axios from "../../lib/axios";
import { formatDate } from "../../lib/datetime";
import { toast_error } from "../../lib/hooks/toast";
import appSettings from "../../settings/appSettings";

export default function AchievementPage() {
  const { t } = useTranslation();
  const theme = localStorage.getItem("theme");
  const toast = useToast();
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${appSettings.API_PROXY}/achievements/honor-list`)
      .then((resp) => {
        setData(resp?.data?.honor_list ?? {});
        setEvents(resp?.data?.events ?? []);
      })
      .catch((err) => {
        toast(toast_error(t("common.something_went_wrong")));
      });
  }, [toast, t]);

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading as="h1" mb={4}>
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
