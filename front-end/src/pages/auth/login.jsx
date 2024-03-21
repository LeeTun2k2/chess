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
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { PasswordField } from "../../components/auth/PasswordField";
import { useState } from "react";
import {
  validateUsername,
  validatePassword,
} from "../../lib/hooks/validateUser";

import { toast_error, toast_success } from "../../lib/hooks/toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_PROXY } from "../../settings/appSettings";
import { setAccessToken, setRefreshToken, setUserData } from "../../lib/auth";

export default function LoginPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validate = () => {
    let ok = true;

    if (validateUsername(username) === false) {
      const model = toast_error(
        "Log in fail.",
        "Username has a minimum length of 8 characters and contains only lowercase letters or numbers"
      );
      toast(model);
      ok = false;
    }

    if (validatePassword(password) === false) {
      const model = toast_error(
        "Log in fail.",
        "Password has a minimum length of 8 characters and do not contain any special charaters."
      );
      toast(model);
      ok = false;
    }
    return ok;
  };

  const onSubmit = () => {
    const ok = validate();
    if (ok) {
      const ok = validate();

      if (ok) {
        const body = { username, password };
        setLoading(true);
        axios
          .post(`${API_PROXY}/login`, body)
          .then((resp) => {
            toast(toast_success("Login successfully."));
            setAccessToken(resp.data.access_token);
            setRefreshToken(resp.data.refresh_token);
            setUserData(resp.data.user);
            navigate("/");
          })
          .catch((err) => {
            toast(toast_error(err.response.data));
          })
          .finally(() => {
            setLoading(false);
          });
      }
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
                Log in to your account
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
            </Stack>
            <HStack justify="space-between">
              <Spacer />
              <Button
                variant="text"
                size="sm"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button onClick={onSubmit} isLoading={loading}>
                Log in
              </Button>
              <Divider />
              <Text color="fg.muted" textAlign="center">
                Don't have an account?{" "}
                <Link href="/register" color="darkcyan">
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
