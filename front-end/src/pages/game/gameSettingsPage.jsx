import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import NewOnlineGameModal from "../../components/game/newGameModal";
import NoLogicChessBoard from "../../components/game/noLogicChessBoard";
import ClientLayout from "../../components/layouts/clientLayout";
import { FRIEND, OFFLINE, ONLINE } from "../../settings/game";

export default function GameSettingsPage() {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gameMode, setGameMode] = useState("online");

  return (
    <ClientLayout>
      <NewOnlineGameModal isOpen={isOpen} onClose={onClose} mode={gameMode} />
      <Container maxW="6xl" py={8}>
        <Heading mb={4}>{t("games.new_game")}</Heading>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box
            display={{ base: "none", md: "block" }}
            w={{ base: "100%", md: "66%" }}
            mb={{ base: 8, md: 0 }}
          >
            <NoLogicChessBoard isFree={true} />
          </Box>

          <Spacer display={{ base: "none", md: "block" }} />

          <Box
            w={{ base: "100%", md: "30%" }}
            border={"1px lightgray solid"}
            p={4}
            borderRadius={4}
            boxShadow={2}
            h={{ base: "auto", md: "fit-content" }}
          >
            <Button
              w="100%"
              colorScheme="gray"
              onClick={() => {
                setGameMode(ONLINE);
                onOpen();
              }}
            >
              {t("games.play_online")}
            </Button>
            <Button
              w="100%"
              mt={4}
              colorScheme="gray"
              onClick={() => {
                setGameMode(FRIEND);
                onOpen();
              }}
            >
              {t("games.play_friend")}
            </Button>
            <Button
              w="100%"
              mt={4}
              colorScheme="gray"
              onClick={() => {
                setGameMode(OFFLINE);
                onOpen();
              }}
            >
              {t("games.play_bot")}
            </Button>
          </Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
