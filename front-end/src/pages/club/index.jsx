import ChatBox from "../../components/chat/chatbox";
import ClientLayout from "../../components/layouts/clientLayout";
import {
  Container,
  Flex,
  Box,
  VStack,
  Spacer,
  Text,
  Heading,
  Card,
} from "@chakra-ui/react";

export default function ClubPage(props) {
  const theme = localStorage.getItem("theme");
  const notifications = [
    {
      title: "Hoi thao truong",
      description:
        "Thoi gian: 1h30, dia diem: 2124, asafasf va maihfah jasjkh ahf hajksh auh uhakwhkjahwkuha hu hsauhus a uah uhsu dkha au ahsu haushdu",
      createdDate: "29/03/20240",
    },
    {
      title: "Hoi thao truong",
      description: "Thoi gian: 1h30, dia diem: 2124, asafasf",
      createdDate: "29/03/20240",
    },
    {
      title: "Hoi thao truong",
      description: "Thoi gian: 1h30, dia diem: 2124, asafasf",
      createdDate: "29/03/20240",
    },
    {
      title: "Hoi thao truong",
      description: "Thoi gian: 1h30, dia diem: 2124, asafasf",
      createdDate: "29/03/20240",
    },
    {
      title: "Hoi thao truong",
      description: "Thoi gian: 1h30, dia diem: 2124, asafasf",
      createdDate: "29/03/20240",
    },
  ];

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent={"sta"}
          minH={650}
        >
          <VStack w={{ base: "100%", md: "66%" }} mb={{ base: 8, md: 0 }}>
            <Box
              w={"100%"}
              boxShadow={4}
              border={"1px solid lightgray"}
              borderRadius={8}
              p={4}
              bgColor={theme === "dark" ? "black" : "gray.100"}
            >
              <Heading as="h2" mb={4}>
                Calendar Club Meeting
              </Heading>
              <Text fontSize="xl" mb={4}>
                Welcome to the Calendar Club! Our next meeting will take place
                offline.
              </Text>
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  Date & Time:
                </Text>
                <Text>Sunday April 10th, 2024 at 1:30 PM</Text>
              </Box>
              <Box mt={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Location:
                </Text>
                <Text>No. 1, Vo Van Ngan, Thu Duc, Ho Chi Minh City</Text>
              </Box>
            </Box>
            <Box w={"100%"}>
              <Heading as={"h5"} fontSize={"xl"} mx={4} mt={8} mb={4}>
                Notifications
              </Heading>
              <Box
                border={"1px lightgray solid"}
                borderRadius={8}
                borderBottom={0}
              >
                {notifications.map((notification, idx) => {
                  return (
                    <Card
                      px={4}
                      py={2}
                      _hover={{
                        bgColor: theme === "dark" ? "black" : "gray.100",
                      }}
                    >
                      <Flex alignItems={"center"} minH={20}>
                        <Box w={"75%"}>
                          <Text fontWeight={"bold"}>{notification.title}</Text>
                          <Text>{notification.description}</Text>
                        </Box>
                        <Box w={"25%"}>
                          <Text fontSize="xs" color="gray.500" align={"right"}>
                            Created: {notification.createdDate}
                          </Text>
                        </Box>
                      </Flex>
                    </Card>
                  );
                })}
              </Box>
            </Box>
          </VStack>
          <Spacer display={{ base: "none", md: "block" }} />
          <Box
            w={{ base: "100%", md: "30%" }}
            display={{ base: "none", md: "block" }}
            h={"fit-content"}
            padding={4}
            borderRadius={8}
          >
            <Heading as={"h2"} fontSize={"xl"} mb={4}>
              Community
            </Heading>
            <ChatBox />
          </Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
