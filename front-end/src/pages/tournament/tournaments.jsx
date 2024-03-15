import React from "react";
import {
  ButtonGroup,
  Flex,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Button,
  Container,
  Heading,
} from "@chakra-ui/react";
import ClientLayout from "../../components/layouts/clientLayout";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../lib/datetime";

export default function TournamentsPage(props) {
  const navigate = useNavigate();
  const getData = () => {
    return [
      {
        _id: "123123",
        name: "Chess love regular",
        description: "Chess love regular for every one",
        variant: "Chess",
        initial_time: 5,
        bonus_time: 2,
        start: "2021-09-01T12:00:00Z",
        end: "2021-09-01T12:00:00Z",
      },
      {
        _id: "456456",
        name: "Chess master blitz",
        description: "Chess master blitz for advanced players",
        variant: "Chess",
        initial_time: 3,
        bonus_time: 1,
        start: "2021-09-01T12:00:00Z",
        end: "2021-09-01T12:00:00Z",
      },
      {
        _id: "789789",
        name: "Xiangqi challenge",
        description: "Xiangqi challenge for experienced players",
        variant: "Xiangqi",
        initial_time: 10,
        bonus_time: 5,
        start: "2021-09-01T12:00:00Z",
        end: "2021-09-01T12:00:00Z",
      },
      {
        _id: "101010",
        name: "Bullet frenzy",
        description: "Bullet frenzy for fast-paced action",
        variant: "Bullet",
        initial_time: 1,
        bonus_time: 0,
        start: "2021-09-01T12:00:00Z",
        end: "2021-09-01T12:00:00Z",
      },
      {
        _id: "111111",
        name: "Classical elegance",
        description: "Classical elegance for a refined experience",
        variant: "Classical",
        initial_time: 30,
        bonus_time: 10,
        start: "2021-09-01T12:00:00Z",
        end: "2021-09-01T12:00:00Z",
      },
    ];
  };

  const data = getData();

  const [pageNumber, setPageNumber] = React.useState(1);
  const pageSize = 10;

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Heading mb={4}>Tournaments</Heading>
        <Table
          size={{ base: "sm", md: "md" }}
          colorScheme="gray"
          borderRadius={4}
          overflow={"hidden"}
        >
          <Thead bgColor="gray.200">
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Variant</Th>
              <Th>Time</Th>
              <Th>Start</Th>
              <Th>End</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data
              .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
              .map((item, index) => (
                <Tr
                  key={index}
                  userSelect="none"
                  cursor="pointer"
                  bgColor={index % 2 === 1 ? "gray.100" : "white"}
                  transition="background-color 0.5s ease-in-out"
                  _hover={{ bgColor: "gray.200 !important" }}
                  onClick={() => navigate(`/game/${item._id}`)}
                >
                  <Td>{item.name}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.variant}</Td>
                  <Td>
                    {item.initial_time}m + {item.bonus_time}s
                  </Td>
                  <Td>{item.start}</Td>
                  <Td>{item.end}</Td>

                  {/* <Td>{formatDate(item.start)}</Td>
                  <Td>{formatDate(item.end)}</Td> */}
                </Tr>
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td colSpan={6}>
                <Flex justify="center" mt={4}>
                  <ButtonGroup>
                    <Button
                      colorScheme="gray"
                      size="sm"
                      onClick={() =>
                        pageNumber - 1 > 0 && setPageNumber(pageNumber - 1)
                      }
                    >
                      <ChevronLeftIcon />
                    </Button>
                    {Array.from(
                      { length: Math.ceil(data.length / pageSize) },
                      (_, i) => (
                        <Button
                          key={i}
                          colorScheme={pageNumber === i + 1 ? "teal" : "gray"}
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
      </Container>
    </ClientLayout>
  );
}
