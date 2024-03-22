import { Container, Heading, Text, Image } from "@chakra-ui/react";
import ClientLayout from "../../components/layouts/clientLayout";
import aboutImage from "../../assets/images/icon/avatar_CLB.jpg"; // Đường dẫn đến hình ảnh minh họa

export default function AboutPage() {
  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading as="h1" mb={4}>About Us</Heading>
        <Image src={aboutImage} alt="About Us" mb={4} />

        <Text fontSize="lg">
          The SPKT Chess Club is an organization with the goal of developing and promoting chess within the student community of HCMC University of Technology and Education – HCMUTE.
        </Text>
        <Text fontSize="lg" mt={4}>
          We organize chess learning activities, tournaments, and chess-related events to create a positive learning and networking environment for our members.
        </Text>
        <Text fontSize="lg" mt={4}>
          Join us to explore the world of chess and meet fellow chess enthusiasts!
        </Text>
      </Container>
    </ClientLayout>
  );
}
