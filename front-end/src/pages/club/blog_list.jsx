import React from "react";
import { Container } from "@chakra-ui/react";
import ClientLayout from "../../components/layouts/clientLayout";

export default function BlogPage(props) {
  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        Blogs
      </Container>
    </ClientLayout>
  );
}
