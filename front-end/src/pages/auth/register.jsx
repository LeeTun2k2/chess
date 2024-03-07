import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  Image,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { PasswordField } from "../../components/auth/PasswordField";
import { useState } from "react";
import {
  validateUsername,
  validatePassword,
  validateEmail,
  validateName,
} from "../../lib/hooks/validateUser";

import { toast_error, toast_success } from "../../lib/hooks/toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const validate = () => {
    let ok = true;

    if (validateUsername(username) === false) {
      const model = toast_error(
        "Register fail.",
        "Username has a minimum length of 8 characters and contains only lowercase letters or numbers"
      );
      toast(model);
      ok = false;
    }

    if (validatePassword(password) === false) {
      const model = toast_error(
        "Register fail.",
        "Password has a minimum length of 8 characters and do not contain any special charaters."
      );
      toast(model);
      ok = false;
    }

    if (validateEmail(email) === false) {
      const model = toast_error("Register fail.", "Invalid email address.");
      toast(model);
      ok = false;
    }

    if (validateName(name) === false) {
      const model = toast_error(
        "Register fail.",
        "Name has a minimum length of 4 characters and contains only letters."
      );

      toast(model);
      ok = false;
    }
    return ok;
  };

  const onSubmit = () => {
    const ok = validate();
    if (ok) {
      const model = toast_success("Register successfully.");
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
                Register new account
              </Heading>
            </Stack>
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  type="username"
                  required
                  onChange={onUsernameChange}
                />
              </FormControl>
              <PasswordField onChange={onPasswordChange} />
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  required
                  onChange={onEmailChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" type="name" required onChange={onNameChange} />
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button onClick={onSubmit}>Register</Button>
              <Divider />
              <Text color="fg.muted" textAlign="center">
                Already have account ?{" "}
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
