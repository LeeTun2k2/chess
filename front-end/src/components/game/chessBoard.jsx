import { Flex } from "@chakra-ui/react";
import Chessground from "@react-chess/chessground";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { Fragment, useEffect, useState } from "react";
import { getUserData } from "../../lib/auth";
import { CHESS_FEN } from "../../settings/game";
import { Chess } from "chess.js";
import { io } from "socket.io-client";
import { API_PROXY, SOCKET_PROXY } from "../../settings/appSettings";
import axios from "../../lib/axios";

export default function ChessBoard({ game, setGameStatus, toggleBaseTurn }) {
  const user = getUserData() ?? { id: "" };
  const socket = io(SOCKET_PROXY);
  const [chess] = useState(new Chess(CHESS_FEN));
  const [fen, setFen] = useState("");
  const [lastMove, setLastMove] = useState([]);
  const [isMovable] = useState(false);
  const [turn, setTurn] = useState("white");
  const [orientation, setOrientation] = useState("white");
  const [isCheck, setIsCheck] = useState(false);
  const [isGameOver] = useState(false);

  const toggleTurn = () => {
    setTurn(turn === "white" ? "black" : "white");
    toggleBaseTurn();
  };

  useEffect(() => {
    setOrientation(user.id === game.black ? "black" : "white");
  }, [game, user.id]);

  const findMovableDests = (square) => {
    const moves = chess.moves({ square: square, verbose: true });
    moves.forEach((move) => {
      if (config.movable.dests.has(square)) {
        config.movable.dests.get(square).push(move.to);
      } else {
        config.movable.dests.set(square, [move.to]);
      }
    });
  };

  const isValidMove = (orig, dest) => {
    const moves = chess.moves({ square: orig, verbose: true });
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].to === dest) {
        return true;
      }
    }
    return false;
  };

  const config = {
    fen: fen,
    orientation: orientation,
    turnColor: turn,
    lastMove: lastMove,
    check: isCheck,
    autoCastle: true,
    viewOnly: isGameOver,
    highlight: {
      lastMove: true,
      check: true,
      custom: [],
    },
    animation: {
      enabled: true,
      duration: 0.5,
    },
    movable: {
      free: isMovable,
      color: turn,
      dests: new Map(),
      events: {
        after: () => {},
        afterNewPiece: () => {},
      },
      rookCastle: true,
    },
    events: {
      change: () => {},
      move: (from, to) => {
        // Promotion move
        const moves = chess.moves({ verbose: true });
        for (let i = 0, len = moves.length; i < len; i++) {
          if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
            // setPendingMove([from, to]);
            // setSelectVisible(true);
            console.log("Promotion move", moves[i]);
            return;
          }
        }
        if (!isValidMove(from, to)) {
          console.log("Invalid move.");
          return;
        }
        socket.connect();
        socket.emit("send_move", {
          game_id: game._id,
          move: { from, to },
        });
      },
      dropNewPiece: () => {},
      select: (key) => {
        if (turn === orientation) {
          config.selected = key;
          findMovableDests(key);
        }
      },
      insert: () => {
        const board = chess.board();
        board.forEach((row) => {
          row.forEach((piece) => {
            if (piece) {
              findMovableDests(piece.square);
            }
          });
        });
      },
    },
    drawable: {
      enabled: true,
      visible: true,
    },
  };

  useEffect(() => {
    socket.connect();
    socket.on("receive_move", async (data) => {
      if (data && data.game_id === game._id) {
        const { from, to } = data.move;
        chess.move({ from, to });
        toggleTurn();
        setFen(chess.fen());
        setIsCheck(chess.inCheck());
        setLastMove([from, to]);
      }

      if (chess.isCheckmate()) {
        setGameStatus("ended");
        const png = chess.pgn();
        await axios.put(`${API_PROXY}/game/${game._id}`, {
          game: { ...game, png },
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [game, fen, socket, toggleTurn, setGameStatus, chess]);

  return (
    <Fragment>
      {/* Chess board md */}
      <Flex
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
        mb={4}
      >
        <Chessground width={600} height={600} config={config} />
      </Flex>

      {/* Chess board md */}
      <Flex
        display={{ base: "none", sm: "none", md: "flex", lg: "none" }}
        mb={4}
      >
        <Chessground width={500} height={500} config={config} />
      </Flex>

      {/* Chess board sm */}
      <Flex
        display={{ base: "none", sm: "flex", md: "none", lg: "none" }}
        mb={4}
      >
        <Chessground width={400} height={400} config={config} />
      </Flex>

      {/* Chess board base */}
      <Flex
        display={{ base: "flex", sm: "none", md: "none", lg: "none" }}
        mb={4}
      >
        <Chessground width={300} height={300} config={config} />
      </Flex>
    </Fragment>
  );
}
