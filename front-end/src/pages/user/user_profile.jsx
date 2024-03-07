import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import { useCurrentPath } from "../../lib/hooks/route";
import UserInfo from "../../components/user_profile/user_info";
import ClientLayout from "../../components/layouts/clientLayout";
import Statistics from "../../components/user_profile/statistic";

export default function UserProfile() {
  const path = useCurrentPath();
  const username = path[path.length - 1];

  const getUser = () => {
    return {
      username: username,
      email: "lequangtung2002@gmail.com",
      name: "Lê Quang Tùng",
    };
  };

  const getAvatarUrl = () => {
    return `abc.com/avatar/username`;
  };

  const user = {
    avatar: getAvatarUrl(),
    ...getUser(),
  };

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
          {/* User Info */}
          <Box w={{ base: "100%", md: "30%" }} mb={{ base: 8, md: 0 }}>
            <UserInfo user={user} />
          </Box>

          {/* Spacer for separating boxes on larger screens */}
          <Spacer display={{ base: "none", md: "block" }} />

          {/* Statistics */}
          <Box w={{ base: "100%", md: "66%" }}>
            <Statistics data={statistic} />
          </Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
