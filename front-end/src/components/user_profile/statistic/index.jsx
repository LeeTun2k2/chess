import React, { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
} from "@chakra-ui/react";
import ChessStatistics from "./chess_statistic";
import XiangqiStatistics from "./xiangqi_statistic";
import PuzzleStatistics from "./puzzle_statistic";

export default function Statistics(props) {
  const { data } = props;

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Box width={{ base: "100%", md: "1/3" }} py={6} px={4}>
      <Heading mb={4}>Statistics</Heading>

      <Tabs
        onChange={handleTabChange}
        index={tabIndex}
        isFitted
        colorScheme="teal"
      >
        <TabList>
          <Tab>Chess</Tab>
          <Tab>Xiangqi</Tab>
          <Tab>Puzzle</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ChessStatistics data={data.chess} />
          </TabPanel>
          <TabPanel>
            <XiangqiStatistics data={data.xianqi} />
          </TabPanel>
          <TabPanel>
            <PuzzleStatistics data={data.puzzle} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
