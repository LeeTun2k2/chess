import React, { useEffect, useRef, useState } from "react";
import ClientLayout from "../../components/layouts/clientLayout";
import {
  ButtonGroup,
  Flex,
  Box,
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
  useToast,
  Input,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
  AddIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../../lib/axios";
import appSettings from "../../settings/appSettings";
import { toast_error, toast_success } from "../../lib/hooks/toast";
import { formatDate } from "../../lib/datetime";

export default function AdmintournamentsPage() {
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme");
  const toast = useToast();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [data, setData] = useState([]);
  const [renderData, setRenderData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const pageSize = 10;

  useEffect(() => {
    axios
      .get(`${appSettings.API_PROXY}/tournaments`)
      .then((resp) => {
        setData(resp?.data?.tournaments ?? []);
        setRenderData(resp?.data?.tournaments ?? []);
      })
      .catch((err) => {
        if (err?.response) toast(toast_error(err?.response?.data));
        else toast(toast_error(t("common.something_went_wrong")));
      });
  }, [toast]);

  const handleDelete = () => {
    if (!selectedItem) {
      toast(toast_error(t("common.not_found")));
    }
    axios
      .delete(`${appSettings.API_PROXY}/tournaments/${selectedItem._id}`)
      .then((resp) => {
        setRenderData(
          renderData.filter((item) => item._id !== selectedItem._id),
        );
        setData(data.filter((item) => item._id !== selectedItem._id));
        toast(toast_success(t("common.delete_success")));
      })
      .catch((err) => {
        if (err?.response) toast(toast_error(err?.response?.data));
        else toast(toast_error(t("common.something_went_wrong")));
      })
      .finally(() => {
        onClose();
      });
  };

  return (
    <ClientLayout>
      <Container maxW="6xl" py={8}>
        <Flex justify={"space-between"}>
          <Heading mb={4}>{t("tournaments.tournaments")}</Heading>
          <Flex>
            <Box position={"relative"} mr={4}>
              <Input
                colorScheme="gray"
                placeholder={t("common.search")}
                onChange={(e) => {
                  setSearchText(e?.target?.value ?? "");
                }}
                w={300}
              />
              <Button
                position={"absolute"}
                top={0}
                right={0}
                zIndex={1}
                colorScheme="gray"
                onClick={() => {
                  setRenderData(
                    data.filter((value) =>
                      value?.name
                        ?.toLowerCase()
                        .includes(searchText.toLowerCase()),
                    ),
                  );
                }}
              >
                <SearchIcon />
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Container>

      <Table
        size={{ base: "sm", md: "md" }}
        colorScheme="gray"
        borderRadius={4}
        overflow={"hidden"}
        __css={{ "table-layout": "fixed", width: "full" }}
        variant={"striped"}
      >
        <Thead bgColor={theme === "dark" ? "black" : "gray.200"}>
          <Tr>
            <Th width="10%" textAlign={"center"}>
              {t("common.no")}
            </Th>
            <Th width="20%" cursor={"pointer"}>
              {t("tournaments.name")}
            </Th>
            <Th width="30%" cursor={"pointer"}>
              {t("tournaments.description")}
            </Th>
            <Th width="10%" textAlign={"center"} cursor={"pointer"}>
              {t("common.variant")}
            </Th>
            <Th width="10%" textAlign={"center"} cursor={"pointer"}>
              {t("common.time")}
            </Th>
            <Th width="10%" textAlign={"center"} cursor={"pointer"}>
              {t("common.start")}
            </Th>
            <Th width="10%" textAlign={"center"} cursor={"pointer"}>
              {t("common.end")}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {renderData
            .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
            .map((item, index) => (
              <Tr
                key={index}
                userSelect="none"
                cursor="pointer"
                onClick={() => navigate(`/tournament/${item._id}`)}
              >
                <Td textAlign={"center"}>
                  {(pageNumber - 1) * pageSize + index + 1}
                </Td>
                <Td
                  textAlign={"left"}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {item.name}{" "}
                </Td>
                <Td
                  textAlign={"left"}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {item.description}
                </Td>
                <Td
                  textAlign={"center"}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {item.variant}
                </Td>
                <Td
                  textAlign={"center"}
                >{`${item.initial_time} + ${item.bonus_time}`}</Td>
                <Td textAlign={"center"}>{formatDate(item.start)}</Td>
                <Td textAlign={"center"}>{formatDate(item.end)}</Td>
              </Tr>
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={7}>
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
                    { length: Math.ceil(renderData.length / pageSize) },
                    (_, i) => (
                      <Button
                        key={i}
                        colorScheme={pageNumber === i + 1 ? "teal" : "gray"}
                        size="sm"
                        onClick={() => setPageNumber(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ),
                  )}
                  <Button
                    colorScheme="gray"
                    size="sm"
                    onClick={() =>
                      (pageNumber + 1) * pageSize <= renderData.length &&
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
    </ClientLayout>
  );
}
