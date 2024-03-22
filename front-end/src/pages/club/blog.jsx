import React from "react";
import {
  Container,
  Box,
  Flex,
  Spacer,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useCurrentPath } from "../../lib/hooks/route";
import ClientLayout from "../../components/layouts/clientLayout";
import { IoDocumentText } from "react-icons/io5";
import DocNav from "../../components/nav/doc_nav";

export default function BlogPage(props) {
  const path = useCurrentPath();
  const slug = path[path.length - 1];

  const getBlog = () => {
    return {
      
    };
  };

  const data = getBlog();

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        
      </Container>
    </ClientLayout>
  );
}
