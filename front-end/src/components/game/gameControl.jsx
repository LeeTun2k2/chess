import React from "react";
import { Container } from "@chakra-ui/react";
import Timer from "../common/timer";
import PlayerTitle from "../common/playerTitle";
import GroundControl from "./groundControl";
import GameAction from "./gameAction";

export default function GameControl(props)
{
  const { player1, player2, settings } = props.game;
  return (
    <Container>
      <Timer settings={settings} isActive/>
      <PlayerTitle profile={player1} />
      <GroundControl/>
      <GameAction/>
      <PlayerTitle profile={player2} />
      <Timer settings={settings}  isActive={false} />
    </Container>
  )
}