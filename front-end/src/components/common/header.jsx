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
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { FaList } from "react-icons/fa";
import Sidebar from "./sidebar";
import { client_menu } from "./data";
import { getUserData } from "../../lib/auth";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Box display={{ base: "block", md: "none" }}>
          <Button variant="ghost" py={8} px={4} onClick={onOpen}>
            <FaList size={36} />
          </Button>
          <Sidebar data={client_menu} isOpen={isOpen} onClose={onClose} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;

const PcMenu = ({ user }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Fragment>
      <Menu>
        <MenuButton
          textTransform={"uppercase"}
          as={Button}
          variant="ghost"
          rightIcon={<ChevronDownIcon />}
          mx={2}
          display={{ base: "none", md: "flex" }}
        >
          {t("header.club")}
        </MenuButton>
        <MenuList zIndex={9999}>
          <MenuItem onClick={() => navigate("/")}>{t("header.home")}</MenuItem>
          <MenuItem onClick={() => navigate("/blogs")}>
            {t("header.blogs")}
          </MenuItem>
          <MenuItem onClick={() => navigate("/achievements")}>
            {t("header.achievements")}
          </MenuItem>
          <MenuItem onClick={() => navigate("/donate")}>
            {t("header.donate")}
          </MenuItem>
          <MenuItem onClick={() => navigate("/about")}>
            {t("header.about")}
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
          {t("header.play")}
        </MenuButton>
        <MenuList zIndex={9999}>
          <MenuItem onClick={() => navigate("/lobby")}>Lobby</MenuItem>
          <MenuItem onClick={() => navigate("/new-game")}>
            {t("header.playWithOptions")}
          </MenuItem>
          <MenuItem onClick={() => navigate("/tournaments")}>
            {t("header.tournaments")}
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          textTransform={"uppercase"}
          as={Button}
          variant="ghost"
          mx={2}
          onClick={() => navigate("/lessons")}
          display={{ base: "none", md: "flex" }}
        >
          {t("header.lessons")}
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
          {t("header.practice")}
        </MenuButton>
        <MenuList zIndex={9999}>
          <MenuItem onClick={() => navigate("/puzzle")}>
            {t("header.puzzles")}
          </MenuItem>
          <MenuItem onClick={() => navigate("/videos")}>
            {t("header.videos")}
          </MenuItem>
          <MenuItem onClick={() => navigate("/books")}>
            {t("header.books")}
          </MenuItem>
        </MenuList>
      </Menu>
      
      <Menu>
        <MenuButton
          textTransform={"uppercase"}
          as={Button}
          variant="ghost"
          mx={2}
          onClick={() => navigate("/tv")}
          display={{ base: "none", md: "flex" }}
        >
          {t("header.tv")}
        </MenuButton>
      </Menu>
      {user?.id ? (
        <Fragment>
          <Spacer />
          <Menu>
            <MenuButton
              textTransform={"uppercase"}
              display={{ base: "none", md: "flex" }}
            >
              <Flex align="center">
                <Avatar name={user.name} src={user.avatar} />
                <Text
                  ml={2}
                  fontWeight="500"
                  display={{ base: "none", md: "block" }}
                >
                  {user.name}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList zIndex={9999}>
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
          <Button onClick={() => navigate("/register")} mr={16}>
            {t("header.register")}
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};
