import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import Statistics from "../../components/user_profile/statistic";
import UserInfo from "../../components/user_profile/user_info";
import { getUserData } from "../../lib/auth";
import axios from "../../lib/axios";
import { useCurrentPath } from "../../lib/hooks/route";
import appSettings from "../../settings/appSettings";

export default function UserProfile() {
  const path = useCurrentPath();
  const username = path[path.length - 1];
  const user_data = getUserData();
  const [user, setUser] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getAvatarUrl = () => {
      return `${appSettings.API_PROXY}/user-${user_data.id}`;
    };

    const getUser = () => {
      if (user_data) {
        setUser({
          ...user_data,
          avatar: getAvatarUrl(),
        });
        return;
      }

      axios
        .get(`${appSettings.API_PROXY}/user/${username}`)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [username, user_data]);

  useEffect(() => {
    axios.get(`${appSettings.API_PROXY}/player/${user_data.id}/history`)
      .then(response => {
        setHistory(response.data);
        console.log('game history:', response.data);
      })
      .catch(error => {
        console.error('Failed to fetch game history:', error);
      });
  }, [user_data.id]);

  const getStatistics = () => {
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const gamesLastMonth = history.filter(game => {
      const gameDate = new Date(game.timestamp);
      return gameDate.getMonth() === lastMonth;
    }).length;

    const gamesCurrentMonth = history.filter(game => {
      const gameDate = new Date(game.timestamp);
      return gameDate.getMonth() === currentMonth;
    }).length;

    return {
      chess: {
        elo: {
          last_month: 1943,
          current_month: 2041,
        },
        game: {
          last_month: gamesLastMonth,
          current_month: gamesCurrentMonth,
        },
      },
    };
  };

  const statistic = getStatistics();

  return (
    <Fragment>
      <Container maxW="container.2xl" py={4}>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box w={{ base: "100%", md: "30%" }} mb={{ base: 8, md: 0 }}>
            <UserInfo user={user} />
          </Box>
          <Spacer display={{ base: "none", md: "block" }} />
          <Box w={{ base: "100%", md: "66%" }}>
            <Statistics data={statistic} userId={user_data.id} />
          </Box>
        </Flex>
      </Container>
    </Fragment>
  );
}
