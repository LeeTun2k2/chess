import {
  Card,
  Heading
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaUsers } from "react-icons/fa";

export default function UserReport({ data }) {
  const { t } = useTranslation();
  return (
    <Card p={1} variant={"outline"} overflow={"hidden"} borderRadius={4} mb={2} minH={120}>
      <Heading as={"h5"} fontSize={"md"} display={"flex"} alignItems={"center"} mb={1}>
        <FaUsers style={{ marginRight: 4 }} />
        {t("dashboard.user_report")}
      </Heading>
      
    </Card>
  );
}
