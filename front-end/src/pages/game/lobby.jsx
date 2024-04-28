import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Heading,
  Input,
  Select,
  Spacer,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NewOnlineGameModal from "../../components/game/newGameModal";
import axios from "../../lib/axios";
import { toast_error } from "../../lib/hooks/toast";
import socket from "../../lib/socket";
import appSettings from "../../settings/appSettings";
import {
  BLITZ,
  BULLET,
  CHESS,
  CLASSICAL,
  ONLINE,
  RAPID,
  XIANGQI,
} from "../../settings/game";

export default function LobbyPage(props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const toast = useToast();
  const theme = localStorage.getItem("theme");
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${appSettings.API_PROXY}/lobby`)
      .then((res) => {
        if (res.data) {
          setData(res.data);
        } else {
          toast(toast_error("Fail to load lobby!"));
        }
      })
      .catch((err) => {
        console.log(err?.response);
        toast(toast_error("Fail to load lobby!"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [toast]);

  const handleLobbyCreated = useCallback(
    (resp) => {
      console.log("lobby_created");
      const lobby = resp.lobby;
      if (lobby) setData((prevData) => [lobby, ...prevData]);
    },
    [setData]
  );

  const handleLobbyClosed = useCallback(
    (resp) => {
      console.log("lobby_closed");
      const lobbyId = resp.lobby_id;
      if (lobbyId)
        setData((prevData) => prevData.filter((item) => item._id !== lobbyId));
    },
    [setData]
  );

  useEffect(() => {
    socket.connect();

    // Subscribe to socket events for lobby updates
    socket.on("lobby_created", handleLobbyCreated);
    socket.on("lobby_closed", handleLobbyClosed);

    return () => {
      // Unsubscribe from socket events when component unmounts
      socket.off("lobby_created", handleLobbyCreated);
      socket.off("lobby_closed", handleLobbyClosed);
      if (socket.readyState === 1) {
        socket.disconnect();
      }
    };
  }, [handleLobbyCreated, handleLobbyClosed]);

  return (
    <Fragment>
      <NewOnlineGameModal isOpen={isOpen} onClose={onClose} mode={ONLINE} />
      <Container maxW="container.2xl" py={4}>
        <Heading fontSize={"xl"} mb={4}>
          {t("games.lobby")}{" "}
          {loading && <Spinner size="lg" variant="primary" />}
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent={"center"}
        >
          <Box
            w={{ base: "100%", md: "66%" }}
            mb={{ base: 8, md: 0 }}
            h={"100%"}
          >
            <Table
              size={{ base: "sm", md: "md" }}
              colorScheme="gray"
              borderRadius={4}
              overflow={"hidden"}
              variant={"striped"}
            >
              <Thead bgColor={theme === "dark" ? "black" : "gray.200"}>
                <Tr>
                  <Th>{t("common.variant")}</Th>
                  <Th>{t("common.player")}</Th>
                  <Th>{t("common.rating")}</Th>
                  <Th>{t("common.time")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data &&
                  data.map((item, index) => {
                    return (
                      (pageNumber - 1) * pageSize <= index &&
                      index < pageNumber * pageSize && (
                        <Tr
                          key={index}
                          userSelect="none"
                          cursor="pointer"
                          onClick={() => {
                            axios
                              .put(`${appSettings.API_PROXY}/lobby/${item._id}`)
                              .then(() => {
                                navigate(`/wait/${item._id}`);
                              })
                              .catch((err) => {
                                console.log(err?.response);
                                toast(toast_error("Fail to join game!"));
                              });
                          }}
                        >
                          <Td>{item.variant}</Td>
                          <Td>{item.player}</Td>
                          <Td>{item.rating}</Td>
                          <Td>
                            {item.initial_time}m + {item.bonus_time}s
                          </Td>
                        </Tr>
                      )
                    );
                  })}
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
                            pageNumber - 1 > 0 && setPageNumber(pageNumber - 1)
                          }
                          title="left"
                        >
                          <ChevronLeftIcon />
                        </Button>
                        {Array.from(
                          { length: Math.ceil(data.length / pageSize) },
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
                            (pageNumber + 1) * pageSize <= data.length &&
                            setPageNumber(pageNumber + 1)
                          }
                          title="right"
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

          <Spacer display={{ base: "none", md: "block" }} />

          <Box w={{ base: "100%", md: "30%" }}>
            <Button w="100%" onClick={onOpen}>
              {t("games.new_game")}
            </Button>
            <HStack mt={4}>
              <Text textAlign={"center"} ml={4}>
                {t("common.variant")}
              </Text>
              <Spacer />
              <Select
                variant="outline"
                placeholder={`-- ${t("common.variant")} --`}
                w={56}
                title={t("lobby.select_variant")}
              >
                <option value={CHESS}>{t("common.chess")}</option>
                <option value={XIANGQI}>{t("common.xiangqi")}</option>
              </Select>
            </HStack>
            <HStack mt={4}>
              <Text textAlign={"center"} ml={4}>
                {t("common.time")}
              </Text>
              <Spacer />
              <Select
                variant="outline"
                placeholder={`-- ${t("common.time")} --`}
                width={56}
                title={t("lobby.select_game_type")}
              >
                <option value={BULLET}>{t("common.bullet")}</option>
                <option value={BLITZ}>{t("common.blitz")}</option>
                <option value={RAPID}>{t("common.rapid")}</option>
                <option value={CLASSICAL}>{t("common.classical")}</option>
              </Select>
            </HStack>
            <HStack mt={4}>
              <Text textAlign={"center"} ml={4}>
                {t("common.rating")}
              </Text>
              <Spacer />
              <Input
                defaultValue={0}
                w={24}
                placeholder={t("lobby.low_rating")}
              />
              <Text mx={1}>~</Text>
              <Input
                defaultValue={3000}
                w={24}
                placeholder={t("lobby.high_rating")}
              />
            </HStack>
            <Button w="100%" mt={4}>
              {t("common.filter")}
            </Button>
          </Box>
        </Flex>
      </Container>
    </Fragment>
  );
}
