import {
  ButtonGroup,
  IconButton,
  Text,
  Image,
  Flex,
  Spacer,
  HStack,
  VStack,
  Link,
  Icon,
} from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default function Footer() {
  return (
    <HStack
      spacing={4}
      d={{ base: "none", sm: "flex" }}
      justifyContent={{ sm: "space-between", md: "normal" }}
      px={40}
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
        <VStack spacing={2} alignItems="flex-start" color="gray.500">
          <CustomLink href="/faq">FAQ</CustomLink>
          <CustomLink href="/about">About</CustomLink>
        </VStack>
      </VStack>
      <VStack spacing={4} alignItems="flex-start">
        <Text fontSize="xl" fontWeight="bold">
          Community
        </Text>
        <VStack spacing={2} alignItems="flex-start" color="gray.500">
          <CustomLink>
            <FaFacebook href="https://www.facebook.com/utechessclub" />
            <Text ml={2}>Facebook</Text>
          </CustomLink>
          <CustomLink href="https://mail.google.com/mail/?view=cm&fs=1&to=clbcospkt@gmail.com">
            <IoIosMail />
            <Text ml={2}>Gmail</Text>
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
