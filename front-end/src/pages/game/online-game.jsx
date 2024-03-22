import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Box,
  Spacer,
  Flex,
  useToast,
  VStack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useCurrentPath } from "../../lib/hooks/route";
import ClientLayout from "../../components/layouts/clientLayout";
import ChessBoard from "../../components/game/chessBoard";
import axios from "../../lib/axios";
import { toast_error } from "../../lib/hooks/toast";
import { API_PROXY, PROXY } from "../../settings/appSettings";
import Timer from "../../components/game/timer";
import { getUserData } from "../../lib/auth";
import io from "socket.io-client";

const user = getUserData() ?? { id: "" };
export default function OnlineGamePage(props) {
  const path = useCurrentPath();
  const id = path[path.length - 1];
  const namespace = `game-${id}`;

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

  const toggleTurn = () => {
    setYou({ ...you, is_turn: !you.is_turn });
    setOpponent({ ...opponent, is_turn: !opponent.is_turn });
  };

  useEffect(() => {
    axios
      .get(`${API_PROXY}/game/${id}&mode=online`)
      .then((res) => {
        const game = res.data;
        setGame(game);
        setYou(
          user.id === game.white
            ? {
                ...game.white_player,
                is_turn: true,
              }
            : { ...game.black_player, is_turn: false }
        );
        setOpponent(
          user.id === game.white
            ? {
                ...game.black_player,
                is_turn: false,
              }
            : { ...game.white_player, is_turn: true }
        );
        if (!game.png) {
          const socketio = io(PROXY, { transports: ["websocket"] });
          socketio.emit("join_game", { game_id: id });
          socketio.disconnect();
          console.log("join_game");
        }
      })
      .catch((err) => {
        toast(toast_error("Error", "Failed to load game"));
        console.log(err);
      });
  }, [id, toast]);

  useEffect(() => {
    const socket = io(`${PROXY}/${namespace}`);
    socket.on("game_start", (data) => {
      console.log("game_start");
      if (gameStatus !== "started") setGameStatus("started");
    });

    return () => {
      socket.disconnect();
    };
  }, [gameStatus]);

  return (
    <ClientLayout>
      <Container maxW="container.xl" mt={10}>
        <Heading as="h1" size="lg" mb={5}>
          Online Game
        </Heading>
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
              />
              <Spacer />
              <HStack>
                <Button
                  bgColor={"lightgray"}
                  onClick={() => alert("offer draw")}
                >
                  Offer Draw
                </Button>
                <Button bgColor={"lightgray"} onClick={() => alert("Resign")}>
                  Resign
                </Button>
              </HStack>
              <Spacer />
              <Timer
                game={game}
                isActive={gameStatus === "started" && you.is_turn}
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
