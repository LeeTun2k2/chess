import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../lib/number";
import UpdateVipNow from "./updateVipNow";

export default function VipBannerSmall() {
  const { t } = useTranslation();
  const price = 200000;

  return (
    <Card border={"1px solid"} borderColor={"green.500"} px={4} pt={12}>
      <Heading as={"h2"} fontSize={"2xl"} textAlign={"center"} noOfLines={1}>
        {t("vip.title")}
      </Heading>
      <Text fontSize={"md"} textAlign={"center"} noOfLines={1} color={"gray"}>
        {t("vip.description")}
      </Text>
      <Flex justifyContent={"center"} alignItems={"end"}>
        <Text fontSize={"4xl"} fontWeight={"bold"} color={"green.500"}>
          {formatNumber(price)}
        </Text>
        <Text fontSize={"sm"} color={"gray"} fontWeight={"bold"} mx={1} mb={2}>
          vnđ
        </Text>
        <Text
          fontSize={"sm"}
          color={"gray"}
          fontWeight={"bold"}
          textTransform={"lowercase"}
          mb={2}
        >
          / {t("vip.month")}
        </Text>
      </Flex>
      <List spacing={4} px={4} mt={4}>
        <ListItem>
          <ListIcon as={CheckIcon} color="green.500" />
          {t("vip.better_puzzle")}
          <Text ml={6} fontSize={"sm"} color={"gray"}>
            {t("vip.better_puzzle_info")}
          </Text>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckIcon} color="green.500" />
          {t("vip.powerful_ai")}
          <Text ml={6} fontSize={"sm"} color={"gray"}>
            {t("vip.powerful_ai_info")}
          </Text>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckIcon} color="green.500" />
          {t("vip.special_tag")}
          <Text ml={6} fontSize={"sm"} color={"gray"}>
            {t("vip.special_tag_info")}
          </Text>
        </ListItem>
        <Box py={1} />
        <UpdateVipNow />
      </List>
    </Card>
  );
}
