import React, { useRef, useState } from "react";
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
import { getUserData } from "../../lib/auth";

const AvatarUploadModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const user = getUserData();

  const handleUpload = async () => {
    setLoading(true);
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chess_api");
    formData.append("cloud_name", "dkdetevyp");
    formData.append("folder", "chess");
    formData.append("public_id", `user-${user.id}`);

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkdetevyp/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.secure_url);
      onClose();
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
    setLoading(false);
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
          <Button colorScheme="teal" onClick={handleUpload} isLoading={loading}>
            Upload
          </Button>
          <Button ml={2} onClick={onClose} isDisabled={loading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AvatarUploadModal;
