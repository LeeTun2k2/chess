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
import { toast_error } from "../../lib/hooks/toast";

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

  const handleChangePassword = () => {
    let ok = true;
    if (validatePassword(oldPassword) === false) {
      const model = toast_error(
        "Old password fail.",
        "New password has a minimum length of 8 characters and do not contain any special charaters."
      );
      toast(model);
      ok = false;
    }

    if (validatePassword(newPassword) === false) {
      const model = toast_error(
        "Change password fail.",
        "New password has a minimum length of 8 characters and do not contain any special charaters."
      );
      toast(model);
      ok = false;
    }

    if (ok === false) return;

    onClose();
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
