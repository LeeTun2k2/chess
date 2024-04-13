import {
  Container,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Box,
  useToast,
} from "@chakra-ui/react";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import ClientLayout from "../../components/layouts/clientLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import appSettings from "../../settings/appSettings";
import { toast_error } from "../../lib/hooks/toast";

export default function AchievementPage() {
  const { t } = useTranslation();
  const toast = useToast();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${appSettings.API_PROXY}/achievements/honor-list`)
      .then((resp) => {
        setData(resp?.data?.achievements ?? []);
      })
      .catch((err) => {
        if (err?.response) toast(toast_error(err?.response?.data));
        else toast(toast_error("Something went wrong. Please try again."));
      });
  }, [toast]);

  return (
    <ClientLayout>
      <Container maxW="xl" py={8} textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          {t("achievements.achievements")}
        </Heading>

        <Text fontSize="lg" mb={8}>
          Congratulations! You've unlocked the following achievements:
        </Text>

        <List spacing={4}>
          <AchievementItem completed text="Logged in for 7 consecutive days" />
          <AchievementItem text="Completed 10 chess puzzles" />
          <AchievementItem
            completed
            text="Reached a rating of 1500 in online chess games"
          />
          <AchievementItem text="Won a chess tournament at your local club" />
          <AchievementItem text="Completed a chess course with distinction" />
          <AchievementItem
            completed
            text="Contributed to the chess community by teaching beginners"
          />
          <AchievementItem text="Reached a draw against a higher-rated opponent" />
          <AchievementItem
            completed
            text="Participated in a simultaneous chess exhibition"
          />
          <AchievementItem text="Completed the 'Pawn to Queen' challenge" />
          <AchievementItem
            completed
            text="Achieved a perfect score in a chess quiz"
          />
        </List>
      </Container>
    </ClientLayout>
  );
}

// Custom component for each achievement item
const AchievementItem = ({ completed = false, text }) => (
  <ListItem
    p={4}
    borderRadius="md"
    bg="teal.100"
    display="flex"
    alignItems="center"
  >
    <ListIcon
      as={completed ? MdCheckCircle : MdRadioButtonUnchecked}
      color="teal.500"
      fontSize="xl"
      mr={4}
    />
    <Text fontSize="lg">{text}</Text>
  </ListItem>
);
