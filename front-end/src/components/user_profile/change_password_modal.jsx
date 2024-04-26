import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { validatePassword } from "../../lib/hooks/validateUser";
import { PasswordField } from "../auth/PasswordField";
import { toast_error, toast_success } from "../../lib/hooks/toast";
import axios from 'axios';
import appSettings from "../../settings/appSettings";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const toast = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const onNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangePassword = async () => {
    let ok = true;
  
    if (validatePassword(oldPassword) === false) {
      const model = toast_error(
        "Old password fail.",
        "New password has a minimum length of 8 characters and do not contain any special charaters.",
      );
      toast(model);
      ok = false;
    }
  
    if (validatePassword(newPassword) === false) {
      const model = toast_error(
        "Change password fail.",
        "New password has a minimum length of 8 characters and do not contain any special charaters.",
      );
      toast(model);
      ok = false;
    }
  
    if (ok === false) return;
  
    try {
      const response = await axios.post(`${appSettings.API_PROXY}/change-password`, {
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
  
      if (response.status === 200) {
        const model = toast_success("Password changed successfully.");
        toast(model);
        onClose();
      } else {
        const model = toast_error("Failed to change password.");
        toast(model);
      }
    } catch (error) {
      const model = toast_error("An error occurred while changing password.");
      toast(model);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PasswordField
            label={"Old password"}
            id={"old-password"}
            onChange={onOldPasswordChange}
          />
          <PasswordField
            label={"New password"}
            id={"new-password"}
            onChange={onNewPasswordChange}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" onClick={handleChangePassword}>
            Change Password
          </Button>
          <Button ml={2} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
