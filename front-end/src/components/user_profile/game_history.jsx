import React, { useState, useEffect } from 'react';
import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import appSettings from "../../settings/appSettings";
import axios from "../../lib/axios";

function GameHistory({ userId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`${appSettings.API_PROXY}/player/${userId}/history`)
      .then(response => {
        setHistory(response.data);
        console.error('game history:', response.data);
      })
      .catch(error => {
        console.error('Failed to fetch game history:', error);
      });
  }, [userId]);

  return (
    <Box>
      <Heading size="md" mb={4}>Game History</Heading>
      <List spacing={3}>
        {history.map((game, index) => (
          <ListItem key={index}>
            <Text>Game against {game.opponent} on {new Date(game.timestamp).toLocaleDateString()} - Result: {game.result}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default GameHistory; 