import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import GameReport from "../../components/dashboard/applicationReport/gameReport";
import UserReport from "../../components/dashboard/applicationReport/userReport";
import VipReport from "../../components/dashboard/applicationReport/vipReport";
import NewAchievements from "../../components/dashboard/documentReport/newAchievements";
import NewBlogs from "../../components/dashboard/documentReport/newBlogs";
import NewBooks from "../../components/dashboard/documentReport/newBooks";
import NewVideos from "../../components/dashboard/documentReport/newVideos";
import AjaxRequestHostnameReport from "../../components/dashboard/systemReport/AjaxRequestHostnameReport";
import AjaxRequestHttpMethodReport from "../../components/dashboard/systemReport/AjaxRequestHttpMethodReport";
import AjaxRequestHttpResponseCodeHostnameReport from "../../components/dashboard/systemReport/AjaxRequestHttpResponseCodeHostnameReport";
import AjaxRequestPageUrlReport from "../../components/dashboard/systemReport/AjaxRequestPageUrlReport";
import ApdexReport from "../../components/dashboard/systemReport/ApdexReport";
import BrowserInteractionReport from "../../components/dashboard/systemReport/BrowserInteractionReport";
import MetricSummaryReport from "../../components/dashboard/systemReport/MetricSummaryReport";
import TransactionSummaryReport from "../../components/dashboard/systemReport/TransactionSummaryReport";
export default function AdminDashboardPage() {
  const theme = localStorage.getItem("theme");
  const defaultData = useMemo(() => {
    return {
      books: [],
      videos: [],
      blogs: [],
      achievements: [],
    };
  }, []);
  const [data, setData] = useState(defaultData);
  useEffect(() => {
    setData(defaultData);
  }, [defaultData]);

  return (
    <Fragment>
      <Container maxW="container.2xl" py={4}>
        <Flex>
          <Box w={"41%"}>
            <MetricSummaryReport />
            <AjaxRequestHttpMethodReport theme={theme} />
          </Box>
          <Spacer />
          <Box w={"41%"}>
            <TransactionSummaryReport />
            <ApdexReport theme={theme} />
          </Box>
          <Spacer />
          <Box w={"16%"}>
            <NewBooks data={data?.books} />
            <NewVideos data={data?.videos} />
            <NewBlogs data={data?.blogs} />
            <NewAchievements data={data?.achievements} />
          </Box>
        </Flex>
        <Flex>
          <Box w={"50%"}>
            <UserReport />
            <GameReport />
            <VipReport />
          </Box>
          <Spacer />
          <Box w={"49%"}>
            <AjaxRequestHttpResponseCodeHostnameReport theme={theme} />
            <BrowserInteractionReport theme={theme} />
            <AjaxRequestHostnameReport theme={theme} />
            <AjaxRequestPageUrlReport theme={theme} />
          </Box>
        </Flex>
      </Container>
    </Fragment>
  );
}
