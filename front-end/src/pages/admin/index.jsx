import { Container, Heading } from "@chakra-ui/react";
import AdminLayout from "../../components/layouts/adminLayout";
import { useNavigate } from "react-router-dom";
export default function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <Container maxW="6xl" py={8}>
        <Heading mb={4}>Dashboard</Heading>
      </Container>
    </AdminLayout>
  );
}
