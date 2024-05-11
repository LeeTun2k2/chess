import {
  Card,
  Heading
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { MdEnergySavingsLeaf } from "react-icons/md";

export default function PerformanceReport({ data }) {
  const { t } = useTranslation();
  return (
    <Card p={1} variant={"outline"} overflow={"hidden"} borderRadius={4} mb={2} minH={120}>
      <Heading as={"h5"} fontSize={"md"} display={"flex"} alignItems={"center"} mb={1}>
        <MdEnergySavingsLeaf style={{ marginRight: 4 }} />
        {t("dashboard.performanceReport")}
      </Heading>
      
                
Performance Metrics:

Page Load Time: Average load time for key pages or sections of the website.
Server Response Time: Average time taken by the server to respond to requests.
Error Rates: Percentage of requests resulting in errors (e.g., 4xx, 5xx HTTP status codes).
Uptime: Percentage of time the website is operational and accessible.
Scalability: Assessment of the system's ability to handle increased traffic or load.
    </Card>
  );
}
