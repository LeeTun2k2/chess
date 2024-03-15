import { Box, Flex, Spacer } from "@chakra-ui/react";
import Stats from "./stats";

export default function ChessStatistics(props) {
  const { elo, game } = props.data;

  return (
    <Flex>
      <Box p={2} borderRadius={4} border="lightgray 1px solid" w="48%">
        <Stats
          label="Chess ELO"
          oldValue={elo.last_month}
          newValue={elo.current_month}
        />
      </Box>
      <Spacer />
      <Box p={2} borderRadius={4} border="lightgray 1px solid" w="48%">
        <Stats
          label="Number of games"
          oldValue={game.last_month}
          newValue={game.current_month}
        />
      </Box>
    </Flex>
  );
}
