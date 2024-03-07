import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";

const AvatarUploadModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef();

  const handleUpload = () => {
    // Implement your logic to handle the avatar upload here
    // You can use the selected file from the fileInputRef.current.files
    // Close the modal after handling the upload
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Set Avatar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Select an image:</FormLabel>
            <Input type="file" ref={fileInputRef} p={1} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" onClick={handleUpload}>
            Upload
          </Button>
          <Button ml={2} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AvatarUploadModal;
