import React, { useState, useEffect } from 'react';
import { Container, Input, Button, Text, Flex, Box, List, ListItem, Avatar } from '@chakra-ui/react';
import axios from 'axios';
import ClientLayout from "../../components/layouts/clientLayout";
import appSettings from "../../settings/appSettings";
import { getUserData } from "../../lib/auth";
import { useNavigate } from 'react-router-dom';


const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const userId = getUserData().id;
  const navigate = useNavigate();

  useEffect(() => {
    fetchFriends();
  }, [userId]);
  const fetchFriends = async () => {
    try {
      const response = await axios.get(`${appSettings.API_PROXY}/users/friends`);
      setFriends(response.data.friends);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };
  const handleAddFriend = async (friendId) => {
    try {
      const response = await axios.post(`${appSettings.API_PROXY}/users/send-friend-request/${friendId}`);
      if (response.data.success) {
        setFriends([...friends, response.data.friend]);
        setSearchResults([]);
        setSearchTerm('');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };
  useEffect(() => {
    fetchFriendRequests();
  }, [userId]);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(`${appSettings.API_PROXY}/users/friend-requests`);
      setFriendRequests(response.data.friend_requests);
      console.log("Friend Requests:", response.data.friend_requests);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };
  
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${appSettings.API_PROXY}/users/search?q=${searchTerm}`);
      setSearchResults(response.data.users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };
  const handleAcceptFriendRequest = async (requestId) => {
    try {
      const response = await axios.post(`${appSettings.API_PROXY}/users/accept-friend-request/${requestId}`);
      fetchFriendRequests();
      fetchFriends();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };
  
  const handleRejectFriendRequest = async (requestId) => {
    try {
      const response = await axios.delete(`${appSettings.API_PROXY}/users/decline-friend-request/${requestId}`);
      fetchFriendRequests();
      fetchFriends();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };
  
  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Box mb={4}>
          <Input
            placeholder="Search for users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button ml={4} onClick={handleSearch}>Search</Button>
        </Box>
        <List spacing={3}>
  {searchResults.map((user) => (
    user.id !== userId && !friends.some((friend) => friend.id === user.id) && (
      <ListItem key={user.id}>
        <Flex align="center">
          <Avatar name={user.username} mr={2} />
          <Text>{user.username}</Text>
          <Button ml={4} onClick={() => handleAddFriend(user.id)}>Add Friend</Button>
        </Flex>
      </ListItem>
    )
  ))}
</List>

        <Box mt={8}>
          <Text fontSize="xl">Friends</Text>
          <List spacing={3}>
            {friends.map((friend) => (
              <ListItem key={friend.id}>
                <Flex align="center">
                  <Avatar name={friend.username} mr={2} />
                  <Text>{friend.username}</Text>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box mt={8}>
  <Text fontSize="xl">Friend Requests</Text>
  <List spacing={3}>
  {friendRequests.map((request) => (
    <ListItem key={request.id}>
      <Flex align="center">
        <Avatar name={request.name} mr={2} />
        <Text>{request.name}</Text>
        <Button ml={4} onClick={() => handleAcceptFriendRequest(request.id)}>Accept</Button>
        <Button ml={2} onClick={() => handleRejectFriendRequest(request.id)}>Reject</Button>
      </Flex>
    </ListItem>
  ))}
</List>


</Box>

      </Container>
    </ClientLayout>
  );
};

export default FriendList;
