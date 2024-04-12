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
import { useTranslation } from "react-i18next";

const AdminHeader = () => {
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme");
  const [user, setUser] = useState(null);
  const user_data = getUserData();
  useEffect(() => {
    if (user_data) setUser({ ...user_data });
  }, []);

  return (
    <Box bgColor={theme === "dark" ? "black" : "lightgray"} p={4} zIndex={9999}>
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Fragment>
      <Menu>
        <MenuButton
          textTransform={"uppercase"}
          as={Button}
          variant="ghost"
          mx={2}
          display={{ base: "none", md: "flex" }}
          onClick={() => navigate("/admin")}
        >
          {t("header.dashboard")}
        </MenuButton>
      </Menu>
      <Menu>
        <MenuButton
          textTransform={"uppercase"}
          as={Button}
          variant="ghost"
          rightIcon={<ChevronDownIcon />}
          mx={2}
          display={{ base: "none", md: "flex" }}
        >
          {t("header.documents")}
        </MenuButton>
        <MenuList p={0} overflow={"hidden"} zIndex={9999}>
          <MenuItem onClick={() => navigate("/admin/blogs")}>
            {t("header.blogs")}
          </MenuItem>
          <MenuItem onClick={() => navigate("/admin/achievements")}>
            {t("header.achievements")}
          </MenuItem>
          <MenuItem onClick={() => navigate("/admin/books")}>
            {t("header.books")}
          </MenuItem>
          <MenuItem onClick={() => navigate("/admin/videos")}>
            {t("header.videos")}
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          textTransform={"uppercase"}
          as={Button}
          variant="ghost"
          rightIcon={<ChevronDownIcon />}
          mx={2}
          display={{ base: "none", md: "flex" }}
        >
          {t("header.games")}
        </MenuButton>
        <MenuList p={0} overflow={"hidden"} zIndex={9999}>
          <MenuItem onClick={() => navigate("/admin/games")}>
            {t("header.games")}
          </MenuItem>
          <MenuItem onClick={() => navigate("/admin/tournaments")}>
            {t("header.tournaments")}
          </MenuItem>
          <MenuItem onClick={() => navigate("/admin/puzzles")}>
            {t("header.puzzles")}
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          textTransform={"uppercase"}
          as={Button}
          variant="ghost"
          rightIcon={<ChevronDownIcon />}
          mx={2}
          display={{ base: "none", md: "flex" }}
        >
          {t("header.accounts")}
        </MenuButton>
        <MenuList p={0} overflow={"hidden"} zIndex={9999}>
          <MenuItem onClick={() => navigate("/admin/users")}>
            {t("header.users")}
          </MenuItem>
          <MenuItem onClick={() => navigate("/admin/admins")}>
            {t("header.admins")}
          </MenuItem>
        </MenuList>
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
            <MenuList p={0} overflow={"hidden"} zIndex={9999}>
              <MenuItem onClick={() => navigate("/profile")}>
                {t("header.profile")}
              </MenuItem>
              <MenuItem onClick={() => navigate("/settings")}>
                {t("header.settings")}
              </MenuItem>
              <MenuItem onClick={() => navigate("/logout")}>
                {t("header.logout")}
              </MenuItem>
            </MenuList>
          </Menu>
        </Fragment>
      ) : (
        <Fragment>
          <Spacer />
          <Button onClick={() => navigate("/login")} mx={2}>
            {t("header.login")}
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};
