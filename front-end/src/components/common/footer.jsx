import {
  Text,
  Image,
  Spacer,
  HStack,
  VStack,
  Link,
  Flex,
  Box,
} from "@chakra-ui/react";
import { FaEnvelope, FaFacebook } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Flex
      spacing={4}
      d={{ base: "none", sm: "flex" }}
      px={{ lg: 20, xl: 40 }}
      py={{ base: 4 }}
      bgColor={"lightgray"}
      direction={{ base: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
      w="100%"
    >
      <Box>
        <HStack>
          <Image
            src="/logo.png"
            alt="UTE CHESS CLUB"
            w={{ base: 16, md: 32 }}
          />
          <VStack>
            <Text fontSize="xl" fontWeight="bold">
              UTE CHESS CLUB
            </Text>
            <Text fontSize="sm" color="fg.subtle">
              &copy; {new Date().getFullYear()} UTE CHESS CLUB. All rights
              reserved.
            </Text>
          </VStack>
        </HStack>
      </Box>
      <Spacer display={{ base: "none", md: "block" }} />
      <Box display={{ base: "none", md: "block" }}>
        <HStack>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="xl" fontWeight="bold">
              {t("footer.more")}
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.700">
              <CustomLink href="/about">{t("footer.about")}</CustomLink>
              <CustomLink href="/settings">{t("footer.settings")}</CustomLink>
            </VStack>
          </VStack>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="xl" fontWeight="bold">
              {t("footer.community")}
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.700">
              <CustomLink href="https://www.facebook.com/utechessclub">
                <Text ml={2} display="flex" alignItems="center">
                  <FaFacebook style={{ marginRight: "8px" }} />
                  {t("footer.facebook")}
                </Text>
              </CustomLink>
              <CustomLink href="https://mail.google.com/mail/?view=cm&fs=1&to=clbcospkt@gmail.com">
                <Text ml={2} display="flex" alignItems="center">
                  <FaEnvelope style={{ marginRight: "8px" }} />
                  {t("footer.gmail")}
                </Text>
              </CustomLink>
            </VStack>
          </VStack>
        </HStack>
      </Box>
    </Flex>
  );
}

const CustomLink = ({ children, href, ...props }) => {
  return (
    <Link
      href={href}
      fontSize="md"
      display="flex"
      alignItems="center"
      _hover={{ textDecoration: "underline" }}
      minWidth={200}
      {...props}
    >
      {children}
    </Link>
  );
};
