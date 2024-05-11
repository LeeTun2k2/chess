import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import GameReport from "../../components/dashboard/gameReport";
import MetricReport from "../../components/dashboard/metricReport";
import NewAchievements from "../../components/dashboard/newAchievements";
import NewBlogs from "../../components/dashboard/newBlogs";
import NewBooks from "../../components/dashboard/newBooks";
import NewVideos from "../../components/dashboard/newVideos";
import PerformanceReport from "../../components/dashboard/performanceReport";
import UserReport from "../../components/dashboard/userReport";
import VipReport from "../../components/dashboard/vipReport";
export default function AdminDashboardPage() {
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
    setData(defaultData)
  }, [defaultData]);

  return (
    <Fragment>
      <Container maxW="container.2xl" py={4}>
        <Flex>
          <Box w={"50%"}>
            <UserReport />
            <GameReport />
            <VipReport />
          </Box>
          <Spacer />
          <Box w={"36%"}>
            <MetricReport/>
            <PerformanceReport/>
          </Box>
          <Spacer />
          <Box w={"12%"}>
            <NewBooks data={data?.books} />
            <NewVideos data={data?.videos} />
            <NewBlogs data={data?.blogs} />
            <NewAchievements data={data?.achievements} />
          </Box>
        </Flex>
      </Container>
    </Fragment>
  );
}
