import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import { useCurrentPath } from "../../lib/hooks/route";
import UserInfo from "../../components/user_profile/user_info";
import ClientLayout from "../../components/layouts/clientLayout";
import Statistics from "../../components/user_profile/statistic";
import { getUserData } from "../../lib/auth";
import axios from "../../lib/axios";
import { API_PROXY } from "../../settings/appSettings";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const path = useCurrentPath();
  const username = path[path.length - 1];
  const user_data = getUserData();

  const getAvatarUrl = () => {
    return `https://res.cloudinary.com/dkdetevyp/image/upload/chess/user-${user_data.id}`;
  };

  const [user, setUser] = useState({});

  const getUser = () => {
    if (user_data) {
      setUser({
        ...user_data,
        avatar: getAvatarUrl(),
      });
      return;
    }

    axios
      .get(`${API_PROXY}/user/${username}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const getStatistics = () => {
    return {
      chess: {
        elo: {
          last_month: 1943,
          current_month: 2041,
        },
        game: {
          last_month: 24,
          current_month: 13,
        },
      },
    };
  };

  const statistic = getStatistics();

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box w={{ base: "100%", md: "30%" }} mb={{ base: 8, md: 0 }}>
            <UserInfo user={user} />
          </Box>
          <Spacer display={{ base: "none", md: "block" }} />
          <Box w={{ base: "100%", md: "66%" }}>
            <Statistics data={statistic} />
          </Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
