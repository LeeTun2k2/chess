import {
  Card,
  Heading
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SiBaremetrics } from "react-icons/si";

export default function MetricReport({ data }) {
  const { t } = useTranslation();
  return (
    <Card p={1} variant={"outline"} overflow={"hidden"} borderRadius={4} mb={2} minH={120}>
      <Heading as={"h5"} fontSize={"md"} display={"flex"} alignItems={"center"} mb={1}>
        <SiBaremetrics style={{ marginRight: 4 }} />
        {t("dashboard.metric_report")}
      </Heading>
      Usage Metrics:

      Traffic Overview: Total number of visitors, unique visitors, and page views over the reporting period.
      User Engagement: Average session duration, bounce rate, and pages per session.
      Geographic Distribution: Distribution of users by geographic location.
      Device Usage: Breakdown of traffic by device type (desktop, mobile, tablet).
      Conversion Rates: Rates of conversion for key actions or goals (e.g., sign-ups, purchases, form submissions).
    </Card>
  );
}
