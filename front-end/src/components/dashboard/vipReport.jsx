import {
  Card,
  Heading
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaDiamond } from "react-icons/fa6";

export default function VipReport({ data }) {
  const { t } = useTranslation();
  return (
    <Card p={1} variant={"outline"} overflow={"hidden"} borderRadius={4} mb={2} minH={120}>
      <Heading as={"h5"} fontSize={"md"} display={"flex"} alignItems={"center"} mb={1}>
        <FaDiamond style={{ marginRight: 4 }} />
        {t("dashboard.vip_report")}
      </Heading>
      
    </Card>
  );
}
