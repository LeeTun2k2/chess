import { Flex, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearTokens } from "../../lib/auth";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      clearTokens();
      navigate("/login");
    }, 1000);
  }, [navigate]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      minH="80vh"
    >
      <Heading textAlign="center" mb={4}>
        Logging out
      </Heading>
      <Spinner size="xl" variant="primary" />
    </Flex>
  );
};

export default LogoutPage;
