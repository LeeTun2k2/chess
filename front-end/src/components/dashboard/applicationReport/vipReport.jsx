import { Box, Card, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaDiamond } from "react-icons/fa6";
import CountChart from "./vipReport/countChart";

export default function VipReport({ vipReport, userReport }) {
  const { t } = useTranslation();
  const theme = localStorage.getItem("theme");

  return (
    <Card
      filter="auto"
      brightness="98%"
      p={1}
      variant={"outline"}
      overflow={"hidden"}
      borderRadius={4}
      mb={2}
      minH={120}
    >
      <Heading
        as={"h5"}
        fontSize={"md"}
        display={"flex"}
        alignItems={"center"}
        mb={1}
      >
        <FaDiamond style={{ marginRight: 4 }} />
        {t("dashboard.vip_report")}
      </Heading>
      <Flex w={"100%"}>
        <Box w={"50%"}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {t("dashboard.total_vips")}
          </Text>
          <Text fontSize={"4xl"} fontWeight={"bold"} textAlign={"left"}>
            {vipReport?.recent_vip_count ?? 0}
            {vipReport?.upcoming_expiry_count ?? 0}
            {vipReport?.vip_count ?? 0}
          </Text>
        </Box>
      </Flex>
      <Flex>
        <Box w={"50%"}>
          <CountChart
            theme={theme}
            data={{
              vip: vipReport?.vip_count,
              not_vip: userReport?.count - vipReport?.vip_count ?? 0,
            }}
          />
        </Box>
      </Flex>
      <Flex>
        <Box w={"50%"}>
          <CountChart
            theme={theme}
            data={{
              vip: vipReport?.vip_count,
              not_vip: userReport?.count - vipReport?.vip_count ?? 0,
            }}
          />
        </Box>
        <Box w={"50%"}>
          <CountChart
            theme={theme}
            data={{
              vip: vipReport?.vip_count,
              not_vip: userReport?.count - vipReport?.vip_count ?? 0,
            }}
          />
        </Box>
      </Flex>
    </Card>
  );
}
