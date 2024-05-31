import { EditIcon, EmailIcon } from "@chakra-ui/icons";
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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getUserData } from "../../lib/auth";
import appSettings from "../../settings/appSettings";
import AvatarUploadModal from "./avatar_upload_modal";
import ChangePasswordModal from "./change_password_modal";

const UserInfo = () => {
  const { t } = useTranslation();
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
  const toast = useToast();

  const containerWidth = useBreakpointValue({ base: "100%", md: "1/3" });
  const user = getUserData();
  const theme = localStorage.getItem("theme");

  const [vipStatus, setVipStatus] = useState(null);
  useEffect(() => {
    const fetchVipStatus = async () => {
      axios
        .get(`${appSettings.API_PROXY}/users/vip-status`)
        .then((resp) => {
          setVipStatus(resp.data);
          console.error("Success to fetch VIP status", resp.data);
        })
        .catch((err) => {
          toast({
            title: t("common.something_went_wrong"),
            status: "error",
            isClosable: true,
          });
          console.error("Failed to fetch VIP status", err);
        });
    };

    fetchVipStatus();
  }, [t, toast]);

  return (
    <Stack
      maxW="container.lg"
      width={containerWidth}
      py={6}
      px={4}
      boxShadow="md"
      borderRadius="md"
      bgColor={theme === "dark" ? "black" : "white"}
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
          {vipStatus && (
            <Text color="green.500" fontSize="md">
              {vipStatus.is_vip
                ? `VIP until ${new Date(vipStatus.vip_expiry).toLocaleDateString()}`
                : "Not a VIP"}
            </Text>
          )}
        </Box>

        {/* Change Password */}
        <Box>
          <Button colorScheme="teal" size="sm" onClick={onChangePasswordOpen}>
            {t("profile.changePassword")}
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default UserInfo;
