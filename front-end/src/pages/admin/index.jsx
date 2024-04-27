import { Container, Heading } from "@chakra-ui/react";
import { Fragment } from "react";
export default function AdminDashboardPage() {
  return (
    <Fragment>
      <Container maxW="6xl" py={8}>
        <Heading mb={4}>Dashboard</Heading>
      </Container>
    </Fragment>
  );
}
