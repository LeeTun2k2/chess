import React from "react";
import { Container, Heading, Box, Grid, GridItem } from "@chakra-ui/react";
import GameControl from "../../components/game/gameControl";
import { game } from "./data"
import { useCurrentPath } from "../../lib/hooks/route"
import GameInfo from "../../components/game/gameInfo";

export default function GamePage(props)
{
    const path = useCurrentPath()
    const id = path[path.length-1];

    return (
        <Container mt={4} textAlign="center" background="purple">
            <Heading>{id}</Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                <GridItem bgColor="lightpink">
                    <Box p={4}>
                        <Heading size="md">Info</Heading>
                        <GameInfo game={game}/>
                    </Box>
                </GridItem>
                <GridItem bgColor="lightgreen">
                    <Box p={4}>
                        <Heading size="md">Game {id}</Heading>
                    </Box>
                </GridItem>
                <GridItem bgColor="lightblue">
                    <Box p={4}>
                        <Heading size="md">Control</Heading>
                        <GameControl game={game} />
                    </Box>
                </GridItem>
            </Grid>
        </Container>
    );
}