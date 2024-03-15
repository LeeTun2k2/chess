import React from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import AvatarUploadModal from "./avatar_upload_modal";
import ChangePasswordModal from "./change_password_modal";
import { EmailIcon, EditIcon } from "@chakra-ui/icons";

const UserInfo = ({ user }) => {
  const {
    isOpen: isAvatarUploadOpen,
    onOpen: onAvatarUploadOpen,
    onClose: onAvatarUploadClose,
  } = useDisclosure();
  const {
    isOpen: isChangePasswordOpen,
    onOpen: onChangePasswordOpen,
    onClose: onChangePasswordClose,
  } = useDisclosure();

  const containerWidth = useBreakpointValue({ base: "100%", md: "1/3" });

  return (
    <Stack
      maxW="container.lg"
      width={containerWidth}
      py={6}
      px={4}
      boxShadow="md"
      borderRadius="md"
      bg="white"
      textAlign="center"
    >
      <AvatarUploadModal
        isOpen={isAvatarUploadOpen}
        onClose={onAvatarUploadClose}
      />
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={onChangePasswordClose}
      />

      <Stack spacing={4}>
        {/* Avatar */}
        <Center>
          <Avatar
            name={user.name}
            src={user.avatar}
            cursor="pointer"
            size="2xl"
            position="relative"
            onClick={onAvatarUploadOpen}
          >
            <EditIcon
              color="inherit"
              fontSize="2xl"
              position="absolute"
              bottom={6}
              right={2}
              boxShadow="md"
            />
          </Avatar>
        </Center>

        {/* Name and Username */}
        <Box>
          <Heading fontSize="xl">{user.name}</Heading>
          <Text color="gray.500" fontSize="md">
            @{user.username}
          </Text>
          <Text color="gray.500" fontSize="md">
            <EmailIcon fontSize="lg" /> {user.email}
          </Text>
        </Box>

        {/* Change Password */}
        <Box>
          <Button colorScheme="teal" size="sm" onClick={onChangePasswordOpen}>
            Change Password
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default UserInfo;
