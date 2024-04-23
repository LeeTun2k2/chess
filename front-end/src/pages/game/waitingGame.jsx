import { Container, Flex, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import ClientLayout from "../../components/layouts/clientLayout";
import { getUserData } from "../../lib/auth";
import { useCurrentPath } from "../../lib/hooks/route";
import appSettings from "../../settings/appSettings";

export default function WaitingGamePage(props) {
  const path = useCurrentPath();
  const id = path[path.length - 1];
  const navigate = useNavigate();
  const socket = io(appSettings.SOCKET_PROXY);
  const user = getUserData();
  const { t } = useTranslation();

  useEffect(() => {
    socket.connect();

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
      user_id: user.id,
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  return (
    <ClientLayout>
      <Container maxW="container.xl" mt={10}>
        <Heading as="h1" size="lg" mb={5} textAlign={"center"}>
          {t("games.waiting_for_another")}
        </Heading>
        <Flex justify={"center"} align={"center"}>
          <Spinner size="xl" />
        </Flex>
      </Container>
    </ClientLayout>
  );
}
