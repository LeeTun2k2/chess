import { AspectRatio, Box, Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function PuzzlePage() {
  const { t } = useTranslation();
  return (
    <Container py={4} maxW={"container.2xl"}>
      <Heading fontSize={"2xl"} mb={4}>
        {t("puzzles.puzzle")}
      </Heading>
      <Flex>
        <Box w="66%">
          <Box position={"relative"} pb={2}>
            <AspectRatio maxW={600} ratio={1}>
              <iframe
                id="chess-puzzle"
                src="https://livetactics.chessbase.com"
                title="Chess Tactics"
                allowFullScreen
              />
            </AspectRatio>
            <Box
              w={"100%"}
              h={5}
              bgColor={"white"}
              position={"absolute"}
              bottom={20}
            />
          </Box>
        </Box>
        <Box w="30%"></Box>
      </Flex>
    </Container>
  );
}
