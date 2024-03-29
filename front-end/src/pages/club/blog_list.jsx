import { useState, useEffect } from "react";
import { Box, Container, Flex, Heading, Spacer, Button, Image, Text, Input } from "@chakra-ui/react";
import ClientLayout from "../../components/layouts/clientLayout";
import { Link } from 'react-router-dom';
import axios from 'axios';

import ItemList from "../../components/item_list";
import { FaBlog } from "react-icons/fa";
import DocNav from "../../components/nav/doc_nav";
import { API_PROXY } from "../../settings/appSettings";
import { FaThumbsUp, FaComment } from 'react-icons/fa';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [commentedBlogId, setCommentedBlogId] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const response = await axios.get(`${API_PROXY}/blog`);
      return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch blogs'); // Ném ra lỗi nếu không thành công
    }
  };

  // Sử dụng hàm getBlogs để lấy danh sách blogs khi cần
  const fetchBlogs = async () => {
    try {
      const blogsData = await getBlogs();
      // Xử lý dữ liệu ở đây (ví dụ: set state, render danh sách blogs, ...)
      setBlogs(blogsData);
    } catch (error) {
      console.error(error);
      // Xử lý lỗi ở đây nếu cần
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (blogId) => {
    try {
      const response = await axios.post(`${API_PROXY}/blog/${blogId}/comment`, { content: newComment }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error("Failed to add comment");
      }
      setNewComment('');
      setCommentedBlogId('');
      fetchBlogs(); // Reload blogs after adding comment
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleLike = async (blogId) => {
    try {
      const response = await axios.put(`${API_PROXY}/blog/${blogId}/like`);
      if (response.status !== 200) {
        throw new Error("Failed to like blog");
      }
      fetchBlogs(); // Reload blogs after liking
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading mb={8} display="flex" alignItems="center">
          <FaBlog style={{ marginRight: "16px" }} /> Blogs
        </Heading>
        <Link to="/blog/create-blog" style={{ textDecoration: 'none' }}>
          <Button colorScheme="teal" mb={4}>Create a new blog</Button>
        </Link>
        {blogs.map((blog) => (
          <Box key={blog._id} p={4} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
            <Heading as="h1" size="md" mb={2}>{blog.title}</Heading>
            <Text fontSize="sm" mb={4}>{blog.description}</Text>
            <Button leftIcon={<FaThumbsUp />} colorScheme="teal" mr={2} onClick={() => handleLike(blog._id)}>Like {blog.likes}</Button>

            <Button leftIcon={<FaComment />} colorScheme="blue" onClick={() => setCommentedBlogId(blog._id)}>Comment</Button>
            {commentedBlogId === blog._id && (
              <Box mt={4}>
                <Input placeholder="Nhập comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <Button colorScheme="blue" mt={2} onClick={() => handleComment(blog._id)}>Gửi</Button>
              </Box>
            )}
            <Box mt={4}>
              <Heading as="h4" size="sm" mb={2}>Comments:</Heading>
              {blog.comments && blog.comments.length > 0 ? (
                <ul>
                  {blog.comments.map((comment, index) => (
                    <li key={index}>
                      <Text fontWeight="bold">Anonymous</Text>
                      <Text>{comment.content}</Text>
                      <Text fontSize="sm" color="gray">{comment.created_at}</Text>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text fontSize="sm">Chưa có comment nào.</Text>
              )}
            </Box>
          </Box>
        ))}
      </Container>
    </ClientLayout>
  );
}
