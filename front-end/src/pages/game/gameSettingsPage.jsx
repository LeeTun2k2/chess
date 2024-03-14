import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Container,
  Spacer,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import ClientLayout from "../../components/layouts/clientLayout";
import { useNavigate } from "react-router-dom";
import { FRIEND, OFFLINE, ONLINE } from "../../settings/game";
import NewOnlineGameModal from "../../components/game/newGameModal";

export default function GameSettingsPage(props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gameMode, setGameMode] = useState("online");

  return (
    <ClientLayout>
      <NewOnlineGameModal isOpen={isOpen} onClose={onClose} mode={gameMode} />
      <Container maxW="6xl" py={8}>
        <Heading mb={4}>New game</Heading>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box
            display={{ base: "none", md: "block" }}
            w={{ base: "100%", md: "66%" }}
            mb={{ base: 8, md: 0 }}
          >
            Something like board
          </Box>

          <Spacer display={{ base: "none", md: "block" }} />

          <Box w={{ base: "100%", md: "30%" }}>
            <Button
              w="100%"
              onClick={() => {
                setGameMode(ONLINE);
                onOpen();
              }}
            >
              Play vs online
            </Button>
            <Button
              w="100%"
              mt={4}
              onClick={() => {
                setGameMode(FRIEND);
                onOpen();
              }}
            >
              Play vs friend
            </Button>
            <Button
              w="100%"
              mt={4}
              onClick={() => {
                setGameMode(OFFLINE);
                onOpen();
              }}
            >
              Play vs computer
            </Button>
          </Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
