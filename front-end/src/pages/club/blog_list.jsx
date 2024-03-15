import { Box, Container, Flex, Heading, Spacer } from "@chakra-ui/react";
import ClientLayout from "../../components/layouts/clientLayout";
import ItemList from "../../components/item_list";
import { FaBlog } from "react-icons/fa";
import DocNav from "../../components/nav/doc_nav";

export default function BlogListPage() {
  const getBlogs = () => {
    return [
      {
        _id: "afasgagwaq",
        title: "Knight or Bisop",
        description:
          "Knight or Bishop? Which piece is more powerful? Something this question may comes to your mind right.",
        publisher: "Lê Quang Tùng",
        date: "03-07-2024",
        image_url: "/logo.png",
        slug: "knight-or-bishop",
      },
      {
        _id: "asdasdasd",
        title: "Chess for Life",
        description:
          "Hello everyone! Welcome back to a new blog post. In this post we are not gonna talk about some chess opening or chess trap or something like that. In this blog post we are gonna talk about my new website. ",
        publisher: "Lê Quang Tùng",
        date: "04-12-2023",
        image_url: "abc.asd/",
        slug: "chess-for-life",
      },
    ];
  };

  const blogs = getBlogs();

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading mb={8} display="flex" alignItems="center">
          <FaBlog style={{ marginRight: "16px" }} /> Blogs
        </Heading>
        <Flex direction={{ base: "column", md: "row" }}>
          {/* Blog list */}
          <Box w={{ base: "100%", md: "66%" }} mb={{ base: 8, md: 0 }}>
            <ItemList list={blogs} />
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
