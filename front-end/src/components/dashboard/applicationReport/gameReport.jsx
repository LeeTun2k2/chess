import { Card, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaChess } from "react-icons/fa";

export default function GameReport({ data }) {
  const { t } = useTranslation();
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
        <FaChess style={{ marginRight: 4 }} />
        {t("dashboard.game_report")}
      </Heading>
    </Card>
  );
}
