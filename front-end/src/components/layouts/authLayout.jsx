import { Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Outlet />
    </Flex>
  );
};

export default AuthLayout;
