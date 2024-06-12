import { Box, Heading, Tab, TabList, Tabs, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChessStatistics from "./chess_statistic";
import GameHistory from "../game_history"; // Ensure this is the correct path to your GameHistory component

export default function Statistics({ data, userId }) {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <Box width={{ base: "100%", md: "1/3" }} py={6} px={4}>
      <Heading fontSize={"xl"} mb={4} onClick={toggleHistory} cursor="pointer">
        {t("profile.statistics")}
      </Heading>

      {showHistory ? (
        <GameHistory userId={userId} />
      ) : (
        <Tabs onChange={handleTabChange} index={tabIndex} isFitted colorScheme="teal">
          <TabList>
            <Tab onClick={toggleHistory} >{t("profile.chess")}</Tab>
          </TabList>
          <ChessStatistics data={data.chess} />
        </Tabs>
      )}
      
      
    </Box>
  );
}
