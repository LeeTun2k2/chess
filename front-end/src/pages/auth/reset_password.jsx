import React from "react";
import {
  Box,
  Container,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";

export default function ForgotPasswordConfirmationPage() {
  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <VStack>
          <HStack>
            <Image src="/logo.png" alt="UTE CHESS CLUB" h={16} w={16} />
            <Text
              fontSize="xl"
              fontWeight="bold"
              display={{ md: "block", sm: "none" }}
              cursor="pointer"
            >
              UTE CHESS CLUB
            </Text>
          </HStack>
        </VStack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={{
            base: "transparent",
            sm: "bg.surface",
          }}
          boxShadow={{
            base: "none",
            sm: "md",
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <Stack spacing="6">
            <Stack
              spacing={{
                base: "2",
                md: "3",
              }}
              textAlign="center"
            >
              <Heading
                size={{
                  base: "sm",
                  md: "md",
                }}
              >
                Reset Password
              </Heading>
            </Stack>
            <Stack spacing="5">
              <Text textAlign="center">
                An email with a <strong>reset password</strong> has been sent to
                your email address. Please check your inbox.
              </Text>
            </Stack>
            <Stack spacing="6">
              <Text color="fg.muted" textAlign="center">
                <Link href="/login" color="darkcyan">
                  Log in
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
