import { useState } from "react";
import { Container, Heading, Box, Button, Input } from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_PROXY } from "../../../settings/appSettings";
import AdminLayout from "../../../components/layouts/adminLayout";
import LessonEditor from "../../../components/item_list/editor_content";
import { getAccessToken } from "../../../lib/auth";

export default function CreateLessonPage() {
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    image: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContentChange = (newContent) => {
    setLessonData((prevData) => ({
      ...prevData,
      content: newContent,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_PROXY}/lessons`, lessonData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      navigate("/admin/lessons");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <Container maxW="6xl" py={8}>
        <Heading mb={8} display="flex" alignItems="center">
          <FaBook style={{ marginRight: "16px" }} /> Create new lesson
        </Heading>
        <Box>
          <Input
            name="title"
            value={lessonData.title}
            onChange={handleChange}
            placeholder="Title"
            mb={4}
          />
          <Input
            name="description"
            value={lessonData.description}
            onChange={handleChange}
            placeholder="Description"
            mb={4}
          />
          <Input
            name="image"
            value={lessonData.image}
            onChange={handleChange}
            placeholder="Link image"
            mb={4}
          />
          <LessonEditor
            content={lessonData.content}
            onChange={handleContentChange}
          />
          <Button colorScheme="teal" onClick={handleSubmit}>
            Enter
          </Button>
        </Box>
      </Container>
    </AdminLayout>
  );
}
