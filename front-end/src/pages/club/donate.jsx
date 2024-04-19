import { Container, Heading, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ClientLayout from "../../components/layouts/clientLayout";
import appSettings from "../../settings/appSettings";

export default function DonatePage() {
  const { t } = useTranslation();

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading as="h1" mb={4}>
          {t("club.support_ute_chess_club")}
        </Heading>

        <Text fontSize="lg" mb={4}>
          {t("club.your_donate_help_us_providing")}
        </Text>
        <Image
          h={200}
          w={200}
          src={`${appSettings.API_PROXY}/images/donate`}
          alt={t("club.support_ute_chess_club")}
        />
        <Text fontSize="lg">{t("club.thank_you")}</Text>
      </Container>
    </ClientLayout>
  );
}
