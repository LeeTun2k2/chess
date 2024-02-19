import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';

export default function PlayerTitle(props) {
  const {username, chess_rating, xiangqi_rating} = props.profile

  return (
    <Flex background="#bababa" fontSize="medium" justifyContent="space-around" alignItems="center"> 
      <Text>Chess: {chess_rating}</Text>
      <Heading>{username}</Heading>
      <Text>Xiangqi: {xiangqi_rating}</Text>
    </Flex>
  );
};