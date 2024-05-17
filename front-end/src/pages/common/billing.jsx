import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import appSettings from "../../settings/appSettings";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../lib/number";

export default function BillingPage() {
  const { t } = useTranslation();
  const [payUrl, setPayUrl] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const price = "200000";

  const handlePayment = async () => {
    if (paymentMethod === "vnpay" || paymentMethod === "zalopay") {
      alert("Update later");
      return;
    }

    try {
      const response = await axios.post(
        `${appSettings.API_PROXY}/momo_payment`,
        {
          amount: price
        },
      );
      setPayUrl(response.data.payUrl);
      console.log(response.data);
      if (response.data.payUrl) {
        window.location.href = response.data.payUrl;
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <Container maxW="md" centerContent py={6}>
      <Box textAlign="center" mb={4}>
        <Heading size="lg">{t("payment.amount_due")}</Heading>
        <Text fontSize="2xl" fontWeight="bold">
          {formatNumber(price)} VND
        </Text>
      </Box>
      <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
        <Heading size="md" mb={4}>{t("payment.payment_method")}</Heading>
        <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
          <Stack direction="column" spacing={4}>
            <Radio value="vnpay">
              <Box display="flex" alignItems="center">
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjeDeEU8y0EmqKl5AtUF5loKkWn9rHvI9lKLAuqOyZ0SrFnAk&s" boxSize="50px" mr={4} />
                <Text>
                  {t("payment.vnpay")}
                  <br />
                  <small>{t("payment.vnpay_description")}</small>
                </Text>
              </Box>
            </Radio>
            <Radio value="zalopay">
              <Box display="flex" alignItems="center">
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD6astgqkNctUyOO43ZDc011j_wr3_ImEmnVVvIPLmf8_Tw5s&s" boxSize="50px" mr={4} />
                <Text>
                  {t("payment.zalopay")}
                  <br />
                  <small>{t("payment.zalopay_description")}</small>
                </Text>
              </Box>
            </Radio>
            <Radio value="momo">
              <Box display="flex" alignItems="center">
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdZKHXNJrsnKlR_LYGBNB9Z-2Rm4ZgEpG-LwBXD4ChKyBqKdQs&s" boxSize="50px" mr={4} />
                <Text>
                  {t("payment.momo")}
                  <br />
                  <small>{t("payment.momo_description")}</small>
                </Text>
              </Box>
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
      <Button colorScheme="blue" w="100%" mt={4} onClick={handlePayment}>
        {t("payment.pay_now")}
      </Button>
    </Container>
  );
}
