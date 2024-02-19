import { Box, Container } from "@chakra-ui/react"
import { Flex, Text } from "@chakra-ui/react";

export default function GameInfo(props)
{
    const { game } = props;
    const { player1, player2, settings } = game
    return (
        <Container>
            <Box padding="0 4rem" fontSize="small">
                <Flex>
                    <Text width="5rem" textAlign="left" fontWeight="bold">{game.variant} {}</Text>
                    <Text >Chess: {settings.time} + {settings.bonus}s</Text>
                </Flex>
                <Flex>
                    <Text width="5rem" textAlign="left">{player1.username}</Text>
                    <Text>Chess: {player1.chess_rating} Xiangqi: {player1.xiangqi_rating}</Text>
                </Flex>
                <Flex>
                    <Text width="5rem" textAlign="left">{player2.username}</Text>
                    <Text>Chess: {player2.chess_rating} Xiangqi: {player2.xiangqi_rating}</Text>
                </Flex>
            </Box>
        </Container>
    )
}