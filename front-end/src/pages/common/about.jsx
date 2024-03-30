import {
  Container,
  Heading,
  Text,
  Image,
  Flex,
  Box,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import ClientLayout from "../../components/layouts/clientLayout";
import { useTranslation } from "react-i18next";
export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Flex mb={8} alignItems={"center"}>
          <Image
            src={"./logo.png"}
            alt={t("about.aboutUs.heading")}
            mb={4}
            w={200}
          />
          <Box ml={8}>
            <Heading as="h1" mb={4}>
              {t("about.aboutUs.heading")}
            </Heading>
            <Text mb={6}>{t("about.aboutUs.content")}</Text>
          </Box>
        </Flex>

        <Flex mb={8} alignItems={"center"}>
          <Box mr={8}>
            <Heading as="h3" size="lg" mb={2}>
              {t("about.ourMission.heading")}
            </Heading>
            <OrderedList>
              <ListItem mb={2}>
                <Text fontWeight="bold">
                  {t("about.ourMission.list.promoteChess")}:
                </Text>{" "}
                {t("about.ourMission.content.promoteChess")}
              </ListItem>
              <ListItem mb={2}>
                <Text fontWeight="bold">
                  {t("about.ourMission.list.developSkills")}:
                </Text>{" "}
                {t("about.ourMission.content.developSkills")}
              </ListItem>
              <ListItem mb={2}>
                <Text fontWeight="bold">
                  {t("about.ourMission.list.buildCommunity")}:
                </Text>{" "}
                {t("about.ourMission.content.buildCommunity")}
              </ListItem>
              <ListItem mb={2}>
                <Text fontWeight="bold">
                  {t("about.ourMission.list.encourageSportsmanship")}:
                </Text>{" "}
                {t("about.ourMission.content.encourageSportsmanship")}
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
              {t("about.whatWeOffer.heading")}
            </Heading>
            <Text mb={4}>{t("about.whatWeOffer.content")}</Text>
          </Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
