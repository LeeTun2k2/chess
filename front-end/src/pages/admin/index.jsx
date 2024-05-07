import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import NewBooks from "../../components/dashboard/newBooks";
export default function AdminDashboardPage() {
  const defaultData = useMemo(() => {
    return {
      books: [],
    };
  }, []);
  const data = useState(defaultData);
  useEffect(() => {}, []);
  return (
    <Fragment>
      <Container maxW="container.2xl" py={4}>
        <Flex>
          <Box bg={"red"} w={"62%"}>
            1
          </Box>
          <Spacer />
          <Box bg={"gray"} w={"12%"}>
            2
          </Box>
          <Spacer />
          <Box bg={"yellow"} w={"12%"}>
            3
          </Box>
          <Spacer />
          <Box bg={"green"} w={"12%"}>
            <NewBooks data={data.books} />
          </Box>
        </Flex>
      </Container>
    </Fragment>
  );
}
