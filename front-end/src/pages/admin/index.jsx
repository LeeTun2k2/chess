import { Container, Heading } from "@chakra-ui/react";
import { Fragment } from "react";
export default function AdminDashboardPage() {
  return (
    <Fragment>
      <Container maxW="container.2xl" py={4}>
        <Heading fontSize={"xl"} mb={4}>
          Dashboard
        </Heading>
      </Container>
    </Fragment>
  );
}
