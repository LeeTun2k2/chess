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

const Header = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, setUser] = useState(null);
  const user_data = getUserData();
  useEffect(() => {
    if (user_data)
      setUser({
        ...user_data,
        avatar: `https://res.cloudinary.com/dkdetevyp/image/upload/chess/user-${user_data.id}`,
      });
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
  return (
    <Fragment>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          rightIcon={<ChevronDownIcon />}
          mx={2}
          display={{ base: "none", md: "flex" }}
        >
          CLUB
        </MenuButton>
        <MenuList zIndex={9999}>
          <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
          <MenuItem onClick={() => navigate("/blogs")}>Blogs</MenuItem>
          <MenuItem onClick={() => navigate("/achievements")}>
            Achievements
          </MenuItem>
          <MenuItem onClick={() => navigate("/donate")}>Donate</MenuItem>
          <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          rightIcon={<ChevronDownIcon />}
          mx={2}
          display={{ base: "none", md: "flex" }}
        >
          PLAY
        </MenuButton>
        <MenuList zIndex={9999}>
          <MenuItem onClick={() => navigate("/lobby")}>Lobby</MenuItem>
          <MenuItem onClick={() => navigate("/new-game")}>
            Play with options
          </MenuItem>
          <MenuItem onClick={() => navigate("/tournaments")}>
            Tournaments
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          rightIcon={<ChevronDownIcon />}
          mx={2}
          display={{ base: "none", md: "flex" }}
        >
          PRACTICE
        </MenuButton>
        <MenuList zIndex={9999}>
          <MenuItem onClick={() => navigate("/puzzle")}>Puzzles</MenuItem>
          <MenuItem onClick={() => navigate("/videos")}>Videos</MenuItem>
          <MenuItem onClick={() => navigate("/books")}>Books</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          mx={2}
          onClick={() => navigate("/tv")}
          display={{ base: "none", md: "flex" }}
        >
          TV
        </MenuButton>
      </Menu>
      {user ? (
        <Fragment>
          <Spacer />
          <Menu>
            <MenuButton display={{ base: "none", md: "flex" }}>
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
          <Button onClick={() => navigate("/register")} mr={16}>
            Register
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};
