import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChessStatistics from "./chess_statistic";
import PuzzleStatistics from "./puzzle_statistic";
import XiangqiStatistics from "./xiangqi_statistic";

export default function Statistics(props) {
  const { t } = useTranslation();
  const { data } = props;

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Box width={{ base: "100%", md: "1/3" }} py={6} px={4}>
      <Heading fontSize={"xl"} mb={4}>
        {t("profile.statistics")}
      </Heading>

      <Tabs
        onChange={handleTabChange}
        index={tabIndex}
        isFitted
        colorScheme="teal"
      >
        <TabList>
          <Tab>{t("profile.chess")}</Tab>
          <Tab>{t("profile.xiangqi")}</Tab>
          <Tab>{t("profile.puzzle")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ChessStatistics data={data.chess} />
          </TabPanel>
          <TabPanel>
            <XiangqiStatistics data={data.xiangqi} />
          </TabPanel>
          <TabPanel>
            <PuzzleStatistics data={data.puzzle} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
