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
import axios from "axios";
import { API_PROXY } from "../../settings/appSettings";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
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
    const validateField = (value, validationFunction, errorMessage) => {
      if (!validationFunction(value)) {
        const model = toast_error("Register fail.", errorMessage);
        toast(model);
        return false;
      }
      return true;
    };

    return (
      validateField(
        username,
        validateUsername,
        "Username must be at least 8 characters and contain only lowercase letters or numbers"
      ) &&
      validateField(
        password,
        validatePassword,
        "Password must be at least 8 characters and should not contain any special characters"
      ) &&
      validateField(email, validateEmail, "Invalid email address") &&
      validateField(
        name,
        validateName,
        "Name must be at least 4 characters and contain only letters"
      )
    );
  };

  const onSubmit = () => {
    const ok = validate();

    if (ok) {
      const body = { username, email, password, name };
      setLoading(true);
      axios
        .post(`${API_PROXY}/register`, body)
        .then((res) => {
          toast(toast_success("Register success. Please login."));
          navigate("/login");
        })
        .catch((error) => {
          toast(toast_error("Register fail.", error.response.data));
        })
        .finally(() => {
          setLoading(false);
        });
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
              <Button onClick={onSubmit} isLoading={loading}>
                Register
              </Button>
              <Divider />
              <Text color="fg.muted" textAlign="center">
                Already have account ?{" "}
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
