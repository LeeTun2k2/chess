import { useState, useEffect } from "react";
import {
  Container,
  Heading,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ClientLayout from "../../components/layouts/clientLayout";
import axios from "axios";
import { API_PROXY } from "../../settings/appSettings";

export default function LessonDetailPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLesson();
  }, []);

  const fetchLesson = async () => {
    try {
      const response = await axios.get(`${API_PROXY}/lessons/${lessonId}`);
      setLesson(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching lesson:", error);
    }
  };

  if (loading) {
    return (
      <ClientLayout>
        <Container maxW="6xl" py={8}>
          <Heading as="h1" mb={4}>
            Loading...
          </Heading>
        </Container>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Box>
          <Image
            src={lesson.image}
            alt={lesson.title}
            w="50%"
            h="auto"
            objectFit="cover"
          />
          <Heading as="h1" mb={4}>
            {lesson.title}
          </Heading>
          <Text>{lesson.description}</Text>
          <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </Box>
      </Container>
    </ClientLayout>
  );
}
