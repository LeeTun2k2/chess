import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageSlider from "../../components/slider/imageSlider";
import VipBannerSmall from "../../components/vip/vipBannerSmall";
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
    <Fragment>
      <Container maxW="container.2xl" py={4}>
        <Flex>
          <Box
            w={{ base: "0%", md: "24%" }}
            display={{ base: "none", md: "block" }}
          >
            <ImageSlider
              images={[
                "https://img.riokupon.com/upload/images/2024/02/13/6fa5c448b0eaba53791b2e14176026bf.png",
                "https://cdn.thuvienphapluat.vn/uploads/Hoidapphapluat/2024/NTH/15022024/30-4.jpg",
                "https://aedigi.com/wp-content/uploads/2022/04/ngay-thiet-ke-lao-dong-1-5-1-scaled.jpg",
              ]}
              height={52}
            />
            <Box py={2} />
            <VipBannerSmall />
          </Box>
          <Spacer />
          <Box w={{ base: "100%", md: "74%" }}>
            <Heading fontSize={"xl"} as="h1" mb={4}>
              {"> "} {t("achievements.achievements")}
            </Heading>
            <Box mt={8}>
              {events
                .sort((a, b) => ("" + a.time).localeCompare(b.time) * -1)
                .map((event, index) => (
                  <Box key={index}>
                    <Flex mb={4} justifyContent={"center"}>
                      <Text
                        textAlign={"center"}
                        fontWeight={"bold"}
                        fontSize={"md"}
                      >
                        {event.event}
                      </Text>
                      <Text
                        textAlign={"center"}
                        ml={4}
                        fontSize={"md"}
                        fontWeight={"light"}
                      >
                        ({formatDate(event.time)})
                      </Text>
                    </Flex>
                    {data[event?.time] && (
                      <Table
                        size={{ base: "sm", md: "md" }}
                        colorScheme="gray"
                        borderRadius={4}
                        overflow={"hidden"}
                        __css={{ "table-layout": "fixed", width: "full" }}
                        variant={"striped"}
                      >
                        <Thead
                          bgColor={theme === "dark" ? "black" : "gray.200"}
                        >
                          <Tr>
                            <Th width="10%" textAlign={"center"}>
                              {t("common.no")}
                            </Th>
                            <Th
                              width="20%"
                              textAlign={"left"}
                              cursor={"pointer"}
                            >
                              {t("achievements.member")}
                            </Th>
                            <Th
                              width="20%"
                              textAlign={"left"}
                              cursor={"pointer"}
                            >
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
          </Box>
        </Flex>
      </Container>
    </Fragment>
  );
}
