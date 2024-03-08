import { Text, Image, Spacer, HStack, VStack, Link } from "@chakra-ui/react";
import { FaEnvelope, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <HStack
      spacing={4}
      d={{ base: "none", sm: "flex" }}
      justifyContent={{ sm: "space-between", md: "normal" }}
      px={40}
      bgColor={"lightgray"}
    >
      <VStack>
        <Image src="/logo.png" alt="UTE CHESS CLUB" h={128} />
      </VStack>
      <VStack>
        <Text fontSize="xl" fontWeight="bold">
          UTE CHESS CLUB
        </Text>
        <Text fontSize="sm" color="fg.subtle">
          &copy; {new Date().getFullYear()} UTE CHESS CLUB. All rights reserved.
        </Text>
      </VStack>
      <Spacer />
      <VStack spacing={4} alignItems="flex-start">
        <Text fontSize="xl" fontWeight="bold">
          More
        </Text>
        <VStack spacing={2} alignItems="flex-start" color="gray.700">
          <CustomLink href="/faq">FAQ</CustomLink>
          <CustomLink href="/about">About</CustomLink>
        </VStack>
      </VStack>
      <VStack spacing={4} alignItems="flex-start">
        <Text fontSize="xl" fontWeight="bold">
          Community
        </Text>
        <VStack spacing={2} alignItems="flex-start" color="gray.700">
          <CustomLink href="https://www.facebook.com/utechessclub">
            <Text ml={2} display="flex" alignItems="center">
              <FaFacebook style={{ marginRight: "8px" }} />
              Facebook
            </Text>
          </CustomLink>
          <CustomLink href="https://mail.google.com/mail/?view=cm&fs=1&to=clbcospkt@gmail.com">
            <Text ml={2} display="flex" alignItems="center">
              <FaEnvelope style={{ marginRight: "8px" }} />
              Gmail
            </Text>
          </CustomLink>
        </VStack>
      </VStack>
    </HStack>
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
