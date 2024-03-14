import React, { useEffect, useState } from "react";
import {
  Box,
  ButtonGroup,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  Button,
  Container,
  Spacer,
  Select,
  HStack,
  Input,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ClientLayout from "../../components/layouts/clientLayout";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  BLITZ,
  BULLET,
  CHESS,
  CLASSICAL,
  ONLINE,
  RAPID,
  XIANGQI,
} from "../../settings/game";
import NewOnlineGameModal from "../../components/game/newGameModal";
import { API_PROXY, PROXY } from "../../settings/appSettings";
import io from "socket.io-client";
import axios from "../../lib/axios";
import { toast_error } from "../../lib/hooks/toast";

export default function LobbyPage(props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`${API_PROXY}/lobby`)
      .then((res) => {
        if (res.data) {
          setData(res.data);
        } else {
          toast(toast_error("Fail to load lobby!"));
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        toast(toast_error("Fail to load lobby!"));
      });
  }, []);

  useEffect(() => {
    const socket = io(PROXY, { transports: ["websocket"], autoConnect: false });
    socket.on("lobby_created", (resp) => {
      const lobby = resp.lobby;
      setData((prevData) => [lobby, ...prevData]);
    });

    socket.on("lobby_closed", (resp) => {
      const lobbyId = resp.lobbyId;
      setData((prevData) => prevData.filter((item) => item._id !== lobbyId));
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const [pageNumber, setPageNumber] = React.useState(1);
  const pageSize = 10;

  return (
    <ClientLayout>
      <NewOnlineGameModal isOpen={isOpen} onClose={onClose} mode={ONLINE} />
      <Container maxW="6xl" py={8}>
        <Heading mb={4}>Lobby</Heading>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box w={{ base: "100%", md: "66%" }} mb={{ base: 8, md: 0 }}>
            <TableContainer>
              <Table
                size={{ base: "sm", md: "md" }}
                colorScheme="gray"
                borderRadius={4}
                overflow={"hidden"}
              >
                <Thead bgColor="gray.200">
                  <Tr>
                    <Th>Variant</Th>
                    <Th>Player</Th>
                    <Th>Rating</Th>
                    <Th>Time</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((item, index) => {
                    return (
                      (pageNumber - 1) * pageSize <= index &&
                      index < pageNumber * pageSize && (
                        <Tr
                          key={index}
                          userSelect="none"
                          cursor="pointer"
                          bgColor={index % 2 === 1 ? "gray.100" : "white"}
                          transition="background-color 0.5s ease-in-out"
                          _hover={{ bgColor: "gray.200 !important" }}
                          onClick={() => navigate(`/game/${item._id}`)}
                        >
                          <Td>{item.variant}</Td>
                          <Td>{item.player}</Td>
                          <Td>{item.rating}</Td>
                          <Td>
                            {item.initial_time}m + {item.bonus_time}s
                          </Td>
                        </Tr>
                      )
                    );
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Td colSpan={4}>
                      <Flex justify="center" mt={4}>
                        <ButtonGroup>
                          <Button
                            colorScheme="gray"
                            size="sm"
                            onClick={() =>
                              pageNumber - 1 > 0 &&
                              setPageNumber(pageNumber - 1)
                            }
                          >
                            <ChevronLeftIcon />
                          </Button>
                          {Array.from(
                            { length: Math.ceil(data.length / pageSize) },
                            (_, i) => (
                              <Button
                                key={i}
                                colorScheme={
                                  pageNumber === i + 1 ? "teal" : "gray"
                                }
                                size="sm"
                                onClick={() => setPageNumber(i + 1)}
                              >
                                {i + 1}
                              </Button>
                            )
                          )}
                          <Button
                            colorScheme="gray"
                            size="sm"
                            onClick={() =>
                              (pageNumber + 1) * pageSize <= data.length &&
                              setPageNumber(pageNumber + 1)
                            }
                          >
                            <ChevronRightIcon />
                          </Button>
                        </ButtonGroup>
                      </Flex>
                    </Td>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>

          <Spacer display={{ base: "none", md: "block" }} />

          <Box w={{ base: "100%", md: "30%" }}>
            <Button w="100%" onClick={onOpen}>
              Create game
            </Button>
            <HStack mt={4}>
              <Text textAlign={"center"} ml={4}>
                Variant
              </Text>
              <Spacer />
              <Select variant="outline" placeholder="-- Variant --" w={56}>
                <option value={CHESS}>Chess</option>
                <option value={XIANGQI}>Xiangqi</option>
              </Select>
            </HStack>
            <HStack mt={4}>
              <Text textAlign={"center"} ml={4}>
                Time
              </Text>
              <Spacer />
              <Select variant="outline" placeholder="-- Time --" width={56}>
                <option value={BULLET}>Bullet</option>
                <option value={BLITZ}>Blitz</option>
                <option value={RAPID}>Rapid</option>
                <option value={CLASSICAL}>Classical</option>
              </Select>
            </HStack>
            <HStack mt={4}>
              <Text textAlign={"center"} ml={4}>
                Rating
              </Text>
              <Spacer />
              <Input defaultValue={0} w={24} />
              <Text mx={1}>~</Text>
              <Input defaultValue={3000} w={24} />
            </HStack>
            <Button w="100%" mt={4}>
              Filter
            </Button>
          </Box>
        </Flex>
      </Container>
    </ClientLayout>
  );
}
