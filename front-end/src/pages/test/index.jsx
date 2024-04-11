import { Button, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_PROXY } from "../../settings/appSettings";

export default function TestPage() {
  const [data, setData] = useState("Chua co gi");
  const socket = io(SOCKET_PROXY);

  useEffect(() => {
    socket.on("game_start", (data) => {
      console.log("game_start");
    });

    return () => socket.disconnect();
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          socket.emit("request_game", {
            game_id: "123123",
            lobby_id: "12124124",
          });
        }}
      >
        Click
      </Button>
    </>
  );
}
