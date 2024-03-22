import React, { useState, useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";

export default function Timer({ game, isActive }) {
  const { initial_time: time, bonus_time: bonus } = game;
  const [remain, setRemain] = useState(time * 60);
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setRemain(time * 60);
  }, [game, time]);

  useEffect(() => {
    if (time <= 0) {
      onTimeout();
    }

    let timer;

    if (isActive && time > 0) {
      timer = setInterval(() => {
        setRemain((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, time]);

  useEffect(() => {
    if (active === false && isActive === true) {
      setActive(true);
      setRemain(remain + bonus);
    }
  }, [isActive, active, remain, bonus]);

  function onTimeout() {
    alert("timeout");
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Flex
      background={isActive ? "lightgreen" : "lightgray"}
      width="100%"
      height="4rem"
      borderRadius="4px"
      justifyContent="center"
      alignItems="center"
    >
      <Heading size="lg">{formatTime(remain)}</Heading>
    </Flex>
  );
}
