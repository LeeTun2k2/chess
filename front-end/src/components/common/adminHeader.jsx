import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Image,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../lib/auth";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const user_data = getUserData();
  useEffect(() => {
    if (user_data) setUser({ ...user_data });
  }, []);

  return (
    <Box bgColor={"lightgray"} p={4} zIndex={9999}>
      <Flex align="center">
        <HStack
          cursor="pointer"
          onClick={() => navigate("/")}
          ml={{ base: 0, md: 16 }}
        >
          <Image src="/logo.png" alt="UTE CHESS CLUB" w={16} />
          <Text fontSize="xl" fontWeight="bold">
            UTE CHESS CLUB
          </Text>
        </HStack>
        <Spacer />
        <PcMenu user={user} />
      </Flex>
    </Box>
  );
};

export default AdminHeader;

const PcMenu = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          mx={2}
          onClick={() => navigate("/admin")}
          display={"flex"}
        >
          Dashboard
        </MenuButton>
      </Menu>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          mx={2}
          onClick={() => navigate("/admin/books")}
          display={"flex"}
        >
          Books
        </MenuButton>
      </Menu>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          mx={2}
          onClick={() => navigate("/admin/tournaments")}
          display={"flex"}
        >
          Tournaments
        </MenuButton>
      </Menu>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          mx={2}
          onClick={() => navigate("/admin/users")}
          display={"flex"}
        >
          Users
        </MenuButton>
      </Menu>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          mx={2}
          onClick={() => navigate("/admin/videos")}
          display={"flex"}
        >
          Videos
        </MenuButton>
      </Menu>
      {user ? (
        <Fragment>
          <Spacer />
          <Menu>
            <MenuButton display="flex">
              <Flex align="center">
                <Avatar name={user.name} src={user.avatar} />
                <Text ml={2} fontWeight="500" display="block">
                  {user.name}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList zIndex={9999}>
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem onClick={() => navigate("/settings")}>
                Settings
              </MenuItem>
              <MenuItem onClick={() => navigate("/logout")}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Fragment>
      ) : (
        <Fragment>
          <Spacer />
          <Button onClick={() => navigate("/login")} mx={2}>
            Login
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};
