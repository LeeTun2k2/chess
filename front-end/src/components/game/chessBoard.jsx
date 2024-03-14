import { Box, Flex } from "@chakra-ui/react";
import Chessground from "@react-chess/chessground";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { Fragment } from "react";

export default function ChessBoard() {
  const config = {
    turnColor: "black",
  };

  return (
    <Fragment>
      {/* Chess board md */}
      <Flex display={{ base: "none", md: "flex" }}>
        <Chessground width={600} height={600} config={config} />;
      </Flex>

      {/* Chess board base */}
      <Flex display={{ base: "flex", md: "none" }}>
        <Chessground width={350} height={350} config={config} />;
      </Flex>
    </Fragment>
  );
}
