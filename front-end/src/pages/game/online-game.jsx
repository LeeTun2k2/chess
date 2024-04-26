import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ChessBoard from "../../components/game/chessBoard";
import Timer from "../../components/game/timer";
import ClientLayout from "../../components/layouts/clientLayout";
import { getUserData } from "../../lib/auth";
import axios from "../../lib/axios";
import { useCurrentPath } from "../../lib/hooks/route";
import { toast_error, toast_info } from "../../lib/hooks/toast";
import socket from "../../lib/socket";
import appSettings from "../../settings/appSettings";

export default function OnlineGamePage() {
  const user = getUserData() ?? { id: "" };
  const path = useCurrentPath();
  const id = path[path.length - 1];
  const { t } = useTranslation();
  const toast = useToast();

  const [game, setGame] = useState({
    initial_time: 10,
    bonus_time: 0,
    white: "white",
    black: "black",
    white_player: { username: "white" },
    black_player: { username: "black" },
  });

  const [gameStatus, setGameStatus] = useState("ended");
  const [isOfferDraw, setIsOfferDraw] = useState(false);
  const [you, setYou] = useState({
    id: "you",
    username: "you",
    name: "You",
    is_turn: false,
  });

  const [opponent, setOpponent] = useState({
    id: "opponent",
    username: "opponent",
    name: "Opponent",
    is_turn: false,
  });

  const toggleTurn = useCallback(() => {
    setYou((prevYou) => ({ ...prevYou, is_turn: !prevYou.is_turn }));
    setOpponent((prevOpponent) => ({
      ...prevOpponent,
      is_turn: !prevOpponent.is_turn,
    }));
  }, []);

  const handleGameReady = useCallback(
    (data) => {
      if (data && data.game_id === id && gameStatus !== "started") {
        setGameStatus("started");
        console.log("started");
      }
    },
    [id, gameStatus]
  );

  const handleOfferDraw = useCallback(
    (data) => {
      if (
        data &&
        data.game_id === id &&
        gameStatus === "started" &&
        data.player_offer_id !== user?.id
      ) {
        toast(
          toast_info(
            t("games.offer_draw_sent"),
            t("games.your_opponent_offer_draw")
          )
        );
        setIsOfferDraw(true);
        console.log("offer_draw");
      }
    },
    [id, gameStatus, toast, t, user?.id]
  );

  const handleAcceptDraw = useCallback(
    (data) => {
      if (data && data.game_id === id && gameStatus === "started") {
        if (data.player_accept_id === opponent?.id) {
          toast(
            toast_info(
              t("games.offer_draw_accepted"),
              t("games.your_opponent_accept_offer_draw")
            )
          );
        }
        setGameStatus("ended");
        console.log("accept_draw");
      }
    },
    [id, gameStatus, opponent?.id, toast, t]
  );

  const handleRejectDraw = useCallback(
    (data) => {
      if (
        data &&
        data.game_id === id &&
        gameStatus === "started" &&
        data.player_reject_id === opponent?.id
      ) {
        toast(
          toast_info(
            t("games.offer_draw_rejected"),
            t("games.your_opponent_reject_offer_draw")
          )
        );
        console.log("reject_draw");
      }
    },
    [id, gameStatus, opponent?.id, toast, t]
  );

  const handleResign = useCallback(
    (data) => {
      if (data && data.game_id === id && gameStatus === "started") {
        if (data.player_resign_id === opponent?.id) {
          toast(toast_info(t("games.resign"), t("games.your_opponent_resign")));
        }
        setGameStatus("ended");
        console.log("resign");
      }
    },
    [id, gameStatus, opponent?.id, toast, t]
  );

  const handleTimeout = useCallback(
    (data) => {
      if (data && data.game_id === id && gameStatus === "started") {
        if (data.player_timeout_id === opponent?.id) {
          toast(
            toast_info(t("games.timeout"), t("games.your_opponent_timeout"))
          );
        }
        setGameStatus("ended");
        console.log("timeout");
      }
    },
    [id, gameStatus, opponent?.id, toast, t]
  );

  useEffect(() => {
    axios
      .get(`${appSettings.API_PROXY}/game/${id}&mode=online`)
      .then((res) => {
        const gameData = res.data;
        setGame(gameData);
        setYou((prevYou) =>
          user.id === gameData.white
            ? { ...gameData.white_player, is_turn: true }
            : { ...gameData.black_player, is_turn: false }
        );
        setOpponent((prevOpponent) =>
          user.id === gameData.white
            ? { ...gameData.black_player, is_turn: false }
            : { ...gameData.white_player, is_turn: true }
        );
        if (!gameData.png) {
          socket.emit("join_game", { game_id: id });
        }
      })
      .catch((err) => {
        toast(toast_error("Error", "Failed to load game"));
        console.log(err);
      });
  }, [id, toast, user.id]);

  useEffect(() => {
    socket.connect();

    socket.on("game_start", handleGameReady);
    socket.on("offer_draw", handleOfferDraw);
    socket.on("accept_draw", handleAcceptDraw);
    socket.on("reject_draw", handleRejectDraw);
    socket.on("resign", handleResign);
    socket.on("timeout", handleTimeout);

    return () => {
      socket.off("game_start", handleGameReady);
      socket.off("offer_draw", handleOfferDraw);
      socket.off("accept_draw", handleAcceptDraw);
      socket.off("reject_draw", handleRejectDraw);
      socket.off("resign", handleResign);
      socket.off("timeout", handleTimeout);
      socket.disconnect();
    };
  }, [
    handleGameReady,
    handleOfferDraw,
    handleAcceptDraw,
    handleRejectDraw,
    handleResign,
    handleTimeout,
  ]);

  return (
    <ClientLayout>
      <Button
        onClick={() => {
          alert(`${you.id}, ${opponent.id}, ${you.id === opponent.id}`);
        }}
      >
        Test
      </Button>
      <Container maxW="6xl" mt={4}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box w={{ base: "100%", md: "66%" }} mb={{ base: 8, md: 0 }} pt={4}>
            <ChessBoard
              game={game}
              setGameStatus={setGameStatus}
              toggleBaseTurn={toggleTurn}
              socket={socket}
            />
          </Box>

          <Spacer display={{ base: "none", md: "block" }} />

          <Box
            w={{ base: "100%", md: "30%" }}
            h={{ base: 300, sm: 400, md: 500, lg: 500 }}
            border={"1px solid lightgray"}
            borderRadius={4}
            p={4}
          >
            <VStack h={"100%"} py={12}>
              <Text color="gray.500" fontSize="md">
                @{opponent.username}
              </Text>
              <Heading fontSize="xl">{opponent.name}</Heading>
              <Timer
                game={game}
                isActive={gameStatus === "started" && opponent.is_turn}
                onTimeout={() => {
                  socket.emit("timeout", {
                    game_id: id,
                    player_timeout_id: opponent?.id,
                  });
                  toast(toast_info(t("games.timeout")));
                }}
              />
              <Spacer />
              <HStack>
                {(user?.id === you.id || user?.id === opponent.id) &&
                  (isOfferDraw ? (
                    <>
                      <Button
                        w={120}
                        colorScheme="orange"
                        onClick={() => {
                          socket.emit("accept_draw", {
                            game_id: id,
                            player_accept_id: user?.id,
                          });
                          setIsOfferDraw(false);
                          setGameStatus("ended");
                          toast(
                            toast_info(
                              t("games.accept_draw"),
                              t("games.you_send_accept_draw")
                            )
                          );
                        }}
                      >
                        {t("games.accept_draw")}
                      </Button>
                      <Spacer />
                      <Button
                        w={120}
                        colorScheme="gray"
                        onClick={() => {
                          socket.emit("reject_draw", {
                            game_id: id,
                            player_reject_id: user?.id,
                          });
                          setIsOfferDraw(false);
                          toast(
                            toast_info(
                              t("games.reject_draw"),
                              t("games.you_send_reject_draw")
                            )
                          );
                        }}
                      >
                        {t("games.reject_draw")}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        w={120}
                        colorScheme="yellow"
                        onClick={() => {
                          socket.emit("offer_draw", {
                            game_id: id,
                            player_offer_id: user?.id,
                          });
                          toast(
                            toast_info(
                              t("games.offer_draw"),
                              t("games.you_send_offer_draw")
                            )
                          );
                        }}
                        disabled={gameStatus !== "started"}
                      >
                        {t("games.offer_draw")}
                      </Button>
                      <Spacer />
                      <Button
                        w={120}
                        colorScheme="red"
                        onClick={() => {
                          socket.emit("resign", {
                            game_id: id,
                            player_resign_id: user?.id,
                          });
                          toast(
                            toast_info(t("games.resign"), t("games.you_resign"))
                          );
                        }}
                        disabled={gameStatus !== "started"}
                      >
                        {t("games.resign")}
                      </Button>
                    </>
                  ))}
              </HStack>
              <Spacer />
              <Timer
                game={game}
                isActive={gameStatus === "started" && you.is_turn}
                onTimeout={() => {
                  socket.emit("timeout", {
                    game_id: id,
                    player_timeout_id: you?.id,
                  });
                }}
              />
              <Heading fontSize="xl">{you.name}</Heading>
              <Text color="gray.500" fontSize="md">
                @{you.username}
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
