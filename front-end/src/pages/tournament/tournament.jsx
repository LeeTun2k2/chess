import {
  Box,
  Card,
  Container,
  Divider,
  Flex,
  Heading,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";

import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ClientLayout from "../../components/layouts/clientLayout";
import axios from "../../lib/axios";
import { formatDate } from "../../lib/datetime";
import { useCurrentPath } from "../../lib/hooks/route";
import { toast_error } from "../../lib/hooks/toast";
import appSettings from "../../settings/appSettings";

export default function TournamentPage(props) {
  const path = useCurrentPath();
  const id = path[path.length - 1];
  const toast = useToast();
  const theme = localStorage.getItem("theme");
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [userJoin, setUserJoin] = useState(false);
  const [your_games, setYourGames] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [renderRanking, setRenderRanking] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    axios
      .get(`${appSettings.API_PROXY}/tournaments/${id}`)
      .then((resp) => {
        setData(resp?.data?.tournament ?? {});
      })
      .catch((err) => {
        toast(toast_error(t("common.something_went_wrong")));
      });
  }, [toast, id, t]);

  useEffect(() => {
    axios
      .get(`${appSettings.API_PROXY}/tournaments/${id}/your-games`)
      .then((resp) => {
        setYourGames(resp?.data?.games ?? []);
      })
      .catch((err) => {
        toast(toast_error(t("common.something_went_wrong")));
      });
  }, [toast, t]);

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Flex>
          <Box w={"66%"}>
            <Flex align={"center"}>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                {t("tournaments.tournament")} {" > "}
              </Text>
              <Heading noOfLines={1} fontSize={"2xl"} flex={1}>
                {data.name}
              </Heading>
            </Flex>
            <Flex>
              <Text noOfLines={2}>{data.description}</Text>
              <Spacer />
              <Text
                fontSize={"sm"}
                color={"gray"}
                w={"25%"}
                textAlign={"right"}
              >
                {t("common.created_at")} {formatDate(data.created_at)}
              </Text>
            </Flex>
            <Divider mb={4} borderColor={theme === "dark" ?? "black"} />
            <Box>
              <Flex mb={2} alignItems={"end"}>
                <Text fontSize={"l"} fontWeight={"bold"}>
                  {t("tournaments.ranking")}
                </Text>
                <Spacer />
                {Date.now() < new Date(data?.start) &&
                  (userJoin ? (
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        setUserJoin(false);
                      }}
                    >
                      <CloseIcon />
                      <Text ml={2}>{t("tournaments.leave")}</Text>
                    </Button>
                  ) : (
                    <Button
                      colorScheme="green"
                      onClick={() => {
                        setUserJoin(true);
                      }}
                    >
                      <AddIcon />
                      <Text ml={2}>{t("tournaments.join")}</Text>
                    </Button>
                  ))}
              </Flex>
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
                    <Th width="15%" textAlign={"center"}>
                      {t("common.no")}
                    </Th>
                    <Th width="30%">{t("tournaments.username")}</Th>
                    <Th width="40%">{t("tournaments.name")}</Th>
                    <Th width="15%" textAlign={"right"}>
                      {t("tournaments.point")}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {renderRanking
                    .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
                    .map((item, index) => (
                      <Tr key={index} userSelect="none">
                        <Td textAlign={"center"}>
                          {(pageNumber - 1) * pageSize + index + 1}
                        </Td>
                        <Td
                          textAlign={"left"}
                          overflow="hidden"
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
                        >
                          {item.username}{" "}
                        </Td>
                        <Td
                          textAlign={"left"}
                          overflow="hidden"
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
                        >
                          {item.name}
                        </Td>
                        <Td
                          textAlign={"right"}
                          overflow="hidden"
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
                        >
                          {item.point ?? 0}
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Td colSpan={4}>
                      <Flex justify="center" mt={4}>
                        <ButtonGroup>
                          <Button
                            colorScheme="gray"
                            size="sm"
                            onClick={() =>
                              pageNumber - 1 > 0 &&
                              setPageNumber(pageNumber - 1)
                            }
                          >
                            <ChevronLeftIcon />
                          </Button>
                          {Array.from(
                            {
                              length: Math.ceil(
                                renderRanking.length / pageSize
                              ),
                            },
                            (_, i) =>
                              pageNumber - 5 <= i &&
                              i <= pageNumber + 3 && (
                                <Button
                                  key={i}
                                  colorScheme={
                                    pageNumber === i + 1 ? "teal" : "gray"
                                  }
                                  size="sm"
                                  onClick={() => setPageNumber(i + 1)}
                                >
                                  {i + 1}
                                </Button>
                              )
                          )}
                          <Button
                            colorScheme="gray"
                            size="sm"
                            onClick={() =>
                              (pageNumber + 1) * pageSize <=
                                renderRanking.length &&
                              setPageNumber(pageNumber + 1)
                            }
                          >
                            <ChevronRightIcon />
                          </Button>
                        </ButtonGroup>
                      </Flex>
                    </Td>
                  </Tr>
                </Tfoot>
              </Table>
            </Box>
          </Box>
          <Spacer />
          <Box w={"30%"} border={"1px solid lightgray"} borderRadius={8} p={4}>
            <Text fontWeight={"bold"}>{t("tournaments.your_games")}</Text>
            {your_games.map((item, index) => (
              <Card key={index} p={2} variant={"outline"} borderRadius={4}>
                <Flex>
                  <Text>{item.white}</Text>
                  <Text>-</Text>
                  <Text>{item.black}</Text>
                </Flex>
              </Card>
            ))}
          </Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
