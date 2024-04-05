import {
  Container,
  Heading,
  Text,
  Image,
  Flex,
  Box,
  Link,
  ListItem,
  List,
  OrderedList,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"; // Import thẻ Link từ react-router-dom
import ClientLayout from "../../components/layouts/clientLayout";

export default function BooksPage() {
  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading as="h1" mb={4}>Chess Books</Heading>
        <Text fontSize="lg" mb={6}>
          Explore our curated collection of chess books to improve your game.
        </Text>

        <List spacing={3}>
          <ListItem>
            <Flex alignItems="center">
              <Image src="/book1.jpg" alt="Book 1" boxSize="100px" mr={4} />
              <Box>
                <Link as={RouterLink} to="/book1" textDecoration="none">
                  <Heading as="h2" size="md">Chess Fundamentals</Heading>
                </Link>
                <Text fontSize="md">By José Raúl Capablanca</Text>
              </Box>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex alignItems="center">
              <Image src="/book2.jpg" alt="Book 2" boxSize="100px" mr={4} />
              <Box>
                <Link as={RouterLink} to="/book2" textDecoration="none">
                  <Heading as="h2" size="md">My System</Heading>
                </Link>
                <Text fontSize="md">By Aron Nimzowitsch</Text>
              </Box>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex alignItems="center">
              <Image src="/book3.jpg" alt="Book 3" boxSize="100px" mr={4} />
              <Box>
                <Link as={RouterLink} to="/book3" textDecoration="none">
                  <Heading as="h2" size="md">Bobby Fischer Teaches Chess</Heading>
                </Link>
                <Text fontSize="md">By Bobby Fischer</Text>
              </Box>
            </Flex>
          </ListItem>
        </List>
      </Container>
    </ClientLayout>
  );
}
