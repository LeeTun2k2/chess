import { Flex, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearTokens, clearUserData } from "../../lib/auth";
import { useTranslation } from "react-i18next";

const LogoutPage = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      clearTokens();
      clearUserData();
      navigate("/");
      setLoggedIn(false);
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
        {t("auth.logging_out")}
      </Heading>
      <Spinner size="xl" variant="primary" />
    </Flex>
  );
};

export default LogoutPage;
