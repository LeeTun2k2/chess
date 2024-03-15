import React from "react";
import {
  Container,
  Heading,
  Box,
  Grid,
  GridItem,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { game } from "./data";
import { useCurrentPath } from "../../lib/hooks/route";
import ClientLayout from "../../components/layouts/clientLayout";
import ChessBoard from "../../components/game/chessBoard";

export default function OnlineGamePage(props) {
  const path = useCurrentPath();
  const id = path[path.length - 1];

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
          <Box w={{ base: "100%", md: "66%" }} mb={{ base: 8, md: 0 }}>
            <ChessBoard />
          </Box>

          <Spacer display={{ base: "none", md: "block" }} />

          <Box w={{ base: "100%", md: "30%" }}>Chat in game</Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
