import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  Image,
  VStack,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { validateEmail } from "../../lib/hooks/validateUser";
import { toast_error, toast_success } from "../../lib/hooks/toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validate = () => {
    if (validateEmail(email) === false) {
      const model = toast_error(
        "Password reset failed.",
        "Invalid email address."
      );
      toast(model);
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (validate()) {
      const model = toast_success(
        "Password reset instructions sent to your email."
      );
      toast(model);
      navigate("/auth/login");
    }
  };

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
        <Stack>
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
        </Stack>
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
                Forgot Password
              </Heading>
            </Stack>
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  required
                  onChange={onEmailChange}
                />
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button onClick={onSubmit}>Reset Password</Button>
              <Divider />
              <Text color="fg.muted" textAlign="center">
                Remember your password?{" "}
                <Link href="/auth/login" color="darkcyan">
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
