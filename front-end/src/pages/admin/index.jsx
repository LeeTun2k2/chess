import { Container, Heading } from "@chakra-ui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Container maxW="6xl" py={8}>
        <Heading mb={4}>Dashboard</Heading>
      </Container>
    </Fragment>
  );
}
