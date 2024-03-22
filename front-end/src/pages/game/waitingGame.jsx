import React, { useEffect } from "react";
import { Container, Heading, Flex, Spinner, Toast } from "@chakra-ui/react";
import { useCurrentPath } from "../../lib/hooks/route";
import ClientLayout from "../../components/layouts/clientLayout";
import io from "socket.io-client";
import { PROXY } from "../../settings/appSettings";
import { useNavigate } from "react-router-dom";

export default function WaitingGamePage(props) {
  const path = useCurrentPath();
  const id = path[path.length - 1];
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io(PROXY);

    socket.on("error", (data) => {
      console.log(data);
    });

    socket.on("game_ready", (data) => {
      const { game, lobby_id } = data;
      if (lobby_id !== id) return;
      socket.disconnect();
      navigate(`/online/${game._id}`);
    });

    socket.emit("request_game", {
      lobby_id: id,
      user_id: "65eff3fe49af304d1ff6e25c",
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  return (
    <ClientLayout>
      <Container maxW="container.xl" mt={10}>
        <Heading as="h1" size="lg" mb={5} textAlign={"center"}>
          Please waiting for another player to join the game
        </Heading>
        <Flex justify={"center"} align={"center"}>
          <Spinner size="xl" />
        </Flex>
      </Container>
    </ClientLayout>
  );
}
