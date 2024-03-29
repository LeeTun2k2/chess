import { Container, Heading, Text, Button, Link } from "@chakra-ui/react";
import ClientLayout from "../../components/layouts/clientLayout";

export default function DonatePage() {
  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading as="h1" mb={4}>Support SPKT Chess Club</Heading>

        <Text fontSize="lg" mb={4}>
          Your donation helps us continue providing quality chess education and organizing events for our members.
        </Text>

        <Text fontSize="lg" mb={4}>
          To make a donation, please click the button below:
        </Text>

        <Button colorScheme="teal" size="lg" mb={4}>
          <Link href="https://www.paypal.com" isExternal>
            Donate Now
          </Link>
        </Button>

        <Text fontSize="lg">
          Thank you for your support!
        </Text>
      </Container>
    </ClientLayout>
  );
}
