import {
  Container,
  Heading,
  Text,
  Button,
  Link,
  Image,
  useToast,
} from "@chakra-ui/react";
import ClientLayout from "../../components/layouts/clientLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { toast_error } from "../../lib/hooks/toast";
import appSettings from "../../settings/appSettings";

export default function DonatePage() {
  const { t } = useTranslation();
  const toast = useToast();
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`${appSettings.API_PROXY}/donate`)
      .then((resp) => {
        setImage(resp?.data?.image ?? {});
      })
      .catch((err) => {
        if (err?.response) toast(toast_error(err?.response?.data));
        else toast(toast_error(t("common.something_went_wrong")));
      });
  }, [toast]);

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
          src={image}
          alt={t("club.support_ute_chess_club")}
        />
        <Text fontSize="lg">{t("club.thank_you")}</Text>
      </Container>
    </ClientLayout>
  );
}
