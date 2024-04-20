import React, { useState, useEffect } from 'react';
import { CometChat } from '@cometchat-pro/chat';
import { Container, Input, Box, List, ListItem, Avatar, Text, Flex } from '@chakra-ui/react';
import ClientLayout from "../../components/layouts/clientLayout";
import { getUserData } from "../../lib/auth";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import appSettings from "../../settings/appSettings";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [friends, setFriends] = useState([]);
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`${appSettings.API_PROXY}/users/friends`);
      setFriends(response.data.friends);
      setReceiver(friends[0]);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const sendMessage = async () => {
    if (text.trim() === '') return;

    let receiverType = "user";
    let message = new CometChat.TextMessage(receiver.id, text, receiverType);

    try {
      const sentMessage = await CometChat.sendMessage(message);
      setMessages(prev => [...prev, sentMessage]);
      setText('');
      console.log("Message sent successfully:", sentMessage);
    } catch (error) {
      console.error("Message sending failed with error:", error);
    }
  };

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Box display="flex">
          <Box flex={1} mr={4}>
            <List spacing={3}>
              {friends.map((friend) => (
                <ListItem key={friend.id} onClick={() => setReceiver(friend)}>
                  <Flex align="center">
                    <Avatar name={friend.name} mr={2} />
                    <Text>{friend.name}</Text>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box flex={2}>
            {receiver && (
              <Box mb={4}>
                <Flex align="center">
                  <Avatar name={receiver.name} mr={2} />
                  <Text fontSize="lg">{receiver.name}</Text>
                </Flex>
              </Box>
            )}
            <div style={{ 
              height: '300px', 
              overflowY: 'scroll', 
              border: '1px solid #E4E6EB', 
              borderRadius: '8px',
              overflowX: 'hidden' // ẩn thanh trượt ngang
            }}>
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: message.sender.uid === getUserData().id ? 'flex-end' : 'flex-start', 
                    marginBottom: '10px',
                    borderRadius: '15px',
                    overflow: 'hidden',
                  }}
                >
                  <div 
                    style={{ 
                      backgroundColor: message.sender.uid === getUserData().id ? '#0084FF' : '#E4E6EB', 
                      color: message.sender.uid === getUserData().id ? '#FFFFFF' : '#000000', 
                      padding: '10px', 
                      borderRadius: '15px',
                      maxWidth: '70%', 
                      wordWrap: 'break-word',
                      alignSelf: message.sender.uid === getUserData().id ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <span>{message.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <Box mb={4} mt={2}>
              <Input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type a message..."
                size="lg"
                rounded="full"
                border="none"
                bg="#E4E6EB"
                px={4}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </ClientLayout>
  );
};

export default ChatPage;
