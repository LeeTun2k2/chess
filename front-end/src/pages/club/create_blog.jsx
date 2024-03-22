import { useState } from 'react';
import { Container, Heading, Box, Button, Textarea, Input, Image } from '@chakra-ui/react';
import ClientLayout from '../../components/layouts/clientLayout';
import { FaBlog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API_PROXY } from "../../settings/appSettings";
import { getAccessToken } from "../../lib/auth";
import axios from 'axios';
export default function CreateBlogPage() {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    media: null, // Thêm state để lưu trữ hình ảnh hoặc video
    mediaType: null // Thêm state để xác định loại của media (image hoặc video)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý thay đổi khi người dùng chọn hình ảnh hoặc video
  const handleMediaChange = (e) => {
    const mediaFile = e.target.files[0];
    const mediaType = mediaFile.type.split('/')[0]; // Lấy ra loại của media (image hoặc video)
    setBlogData(prevData => ({
      ...prevData,
      media: mediaFile,
      mediaType: mediaType
    }));
  };

  const handleSubmit = async () => {
    try {      
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('description', blogData.description);
      formData.append('media', blogData.media); // Thêm hình ảnh hoặc video vào formData

      axios
        .post(`${API_PROXY}/blog`, formData)
        .finally(() => {
          // Xử lý logic sau khi gửi yêu cầu
        });  
    } catch (error) {
      console.error(error);
    }
};


  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading mb={8} display="flex" alignItems="center">
          <FaBlog style={{ marginRight: '16px' }} /> Tạo blog mới
        </Heading>
        <Box>
          {blogData.media && blogData.mediaType === 'image' && (
            <Image src={URL.createObjectURL(blogData.media)} alt="Chosen Image" mb={4} />
          )}
          <Input
            type="file"
            name="media"
            accept="image/*" // Chỉ chấp nhận hình ảnh
            onChange={handleMediaChange}
            mb={4}
          />
          <Textarea
            name="title"
            value={blogData.title}
            onChange={handleChange}
            placeholder="Tiêu đề"
            mb={4}
          />
          <Textarea
            name="description"
            value={blogData.description}
            onChange={handleChange}
            placeholder="Mô tả"
            mb={4}
          />
          <Button colorScheme="teal" onClick={handleSubmit}>Tạo blog</Button>
        </Box>
      </Container>
    </ClientLayout>
  );
}
