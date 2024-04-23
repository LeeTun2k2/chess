import {
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FindFriend from "../../components/friends/findFriend";
import FriendRequests from "../../components/friends/friend_requests";
import FriendsList from "../../components/friends/friends_list";
import ClientLayout from "../../components/layouts/clientLayout";

const FriendsPage = () => {
  const { t } = useTranslation();

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading mb={4}>{t("friends.heading")}</Heading>
        <Tabs onChange={handleTabChange} index={tabIndex} colorScheme="teal">
          <TabList>
            <Tab>{t("friends.friends_list")}</Tab>
            <Tab>{t("friends.friends_request")}</Tab>
            <Tab>{t("friends.find_friends")}</Tab>
          </TabList>

          <TabPanels minH={400}>
            <TabPanel>
              <FriendsList />
            </TabPanel>
            <TabPanel>
              <FriendRequests />
            </TabPanel>
            <TabPanel>
              <FindFriend />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </ClientLayout>
  );
};

export default FriendsPage;
