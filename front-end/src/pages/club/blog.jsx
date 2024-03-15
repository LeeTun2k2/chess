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
      _id: "afasgagwaq",
      title: "Knight or Bishop",
      description:
        "Knight or Bishop? Which piece is more powerful? Something this question may comes to your mind right.",
      publisher: "Lê Quang Tùng",
      date: "03-07-2024",
      image_url: "/logo.png",
      slug: slug,
    };
  };

  const data = getBlog();

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading mb={8} display="flex" alignItems="center">
          <IoDocumentText style={{ marginRight: "16px" }} />
          {data.title}
        </Heading>
        <Flex direction={{ base: "column", md: "row" }}>
          {/* Blog*/}
          <Box w={{ base: "100%", md: "66%" }} mb={{ base: 8, md: 0 }}>
            <Flex justify="space-between" align="center">
              <VStack align="flex-start">
                <Text fontSize="md" color="gray.500">
                  Published by {data.publisher} on {data.date}
                </Text>
              </VStack>
            </Flex>
            <Text align="justify" textIndent={56}>
              {data.description}
            </Text>
          </Box>

          <Spacer display={{ base: "none", md: "block" }} />

          {/* Quick navigations */}
          <Box
            w={{ base: "100%", md: "30%" }}
            boxShadow="md"
            bg="lightgray"
            borderRadius="md"
          >
            <DocNav />
          </Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
