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
import ClientLayout from "../../components/layouts/clientLayout";

export default function AboutPage() {
  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Flex mb={8} alignItems={"center"}>
          <Image src={"./logo.png"} alt="About Us" mb={4} w={200} />
          <Box ml={8}>
            <Heading as="h1" mb={4}>
              About UTE Chess Club
            </Heading>
            <Text mb={6}>
              The UTE Chess Club is a vibrant community of chess enthusiasts
              brought together by a shared passion for the game of chess.
              Founded with the mission of promoting chess as a sport and
              fostering a culture of strategic thinking, sportsmanship, and
              camaraderie, the UTE Chess Club provides a welcoming environment
              for players of all skill levels to engage, learn, and compete.
            </Text>
          </Box>
        </Flex>

        <Flex mb={8} alignItems={"center"}>
          <Box mr={8}>
            <Heading as="h3" size="lg" mb={2}>
              Our Mission
            </Heading>
            <Text mb={4}>At the UTE Chess Club, our mission is to:</Text>
            <OrderedList>
              <ListItem mb={2}>
                <Text fontWeight="bold">Promote Chess:</Text> We aim to promote
                chess as a sport and an intellectual pursuit, encouraging
                participation among students, faculty, and staff.
              </ListItem>
              <ListItem mb={2}>
                <Text fontWeight="bold">Develop Skills:</Text> We provide
                opportunities for members to develop their chess skills, whether
                they are beginners looking to learn the basics or advanced
                players seeking to refine their strategies.
              </ListItem>
              <ListItem mb={2}>
                <Text fontWeight="bold">Build Community:</Text> We foster a
                sense of community among chess enthusiasts, creating a
                supportive and inclusive environment where members can connect,
                share their passion for chess, and forge lasting friendships.
              </ListItem>
              <ListItem mb={2}>
                <Text fontWeight="bold">Encourage Sportsmanship:</Text> We
                uphold the values of sportsmanship, fair play, and respect, both
                on and off the chessboard, instilling in our members the
                importance of integrity and graciousness in victory and defeat.
              </ListItem>
            </OrderedList>
          </Box>
          <Image
            src={
              "https://live.staticflickr.com/575/22360631366_b801b39622_b.jpg"
            }
            alt="About Us"
            mb={4}
            w={400}
          />
        </Flex>

        <Flex mb={8} alignItems={"center"}>
          <Image
            src={
              "https://i.guim.co.uk/img/media/ed9713c277cb37ac1fb759f5f06a6e2d3b3f2184/0_514_7716_4630/master/7716.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=e88f0a98c4957f25a2fb96b4291e3641"
            }
            alt="About Us"
            mb={4}
            w={400}
          />
          <Box ml={8}>
            <Heading as="h3" size="lg" mb={2}>
              What We Offer
            </Heading>
            <Text mb={4}>At UTE Chess Club, we offer:</Text>
            <OrderedList>
              <ListItem>Weekly Meetings</ListItem>
              <ListItem>Tournaments</ListItem>
              <ListItem>Training Sessions</ListItem>
              <ListItem>Social Events</ListItem>
            </OrderedList>

            <Text mb={6}>
              Whether you're a seasoned chess player or someone who's just
              starting to explore the world of chess, the UTE Chess Club
              welcomes you to join our community. Come be a part of our growing
              chess family, sharpen your mind, and experience the joy of chess
              with us!
            </Text>

            <Text mb={6}>
              For more information about the UTE Chess Club and how to get
              involved, please contact us at{" "}
              <Link href="mailto:clbcospkt@gmail.com">contact@example.com</Link>{" "}
              or visit our website <Link href="/">www.utechessclub.com</Link>.
              Follow us on social media for updates, events, and chess-related
              content.
            </Text>

            <Text mb={6}>
              Join the UTE Chess Club today and embark on an exciting journey of
              strategy, competition, and friendship!
            </Text>
          </Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
