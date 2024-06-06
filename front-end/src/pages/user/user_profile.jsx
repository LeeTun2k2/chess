import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import UserInfo from "../../components/user_profile/user_info";
import GameHistory from "../../components/user_profile/game_history"; // Import the GameHistory component
import { getUserData } from "../../lib/auth";
import axios from "../../lib/axios";
import { useCurrentPath } from "../../lib/hooks/route";
import appSettings from "../../settings/appSettings";

export default function UserProfile() {
  const path = useCurrentPath();
  const username = path[path.length - 1];
  const user_data = getUserData();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = () => {
      if (user_data) {
        setUser({
          ...user_data,
          avatar: `${appSettings.API_PROXY}/user-${user_data.id}`,
        });
        return;
      }

      axios
        .get(`${appSettings.API_PROXY}/user/${username}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error('Error fetching user:', err);
        });
    };
    getUser();
  }, [username, user_data]);

  return (
    <Fragment>
      <Container maxW="container.xl" py={4}>
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          <Box flex="1">
            <UserInfo user={user} />
          </Box>
          <Box flex="2">
            <GameHistory userId={user.id} />
          </Box>
        </Flex>
      </Container>
    </Fragment>
  );
}
