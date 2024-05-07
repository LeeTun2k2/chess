import {
  Card,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NewBooks({ data }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Card p={1} variant={"outline"} overflow={"hidden"} borderRadius={4}>
      <Heading as={"h5"} fontSize={"sm"} display={"flex"} alignItems={"center"}>
        <FaBook style={{ marginRight: 4 }} />
        {t("dashboard.new_books")}
      </Heading>
      <UnorderedList>
        {data !== null ? (
          data.map((item, index) => (
            <ListItem key={`books-${index}`}>
              <Text
                fontSize={"sm"}
                noOfLines={1}
                onClick={() => {
                  navigate(`books/${item._id}`);
                }}
              >
                {item}
              </Text>
            </ListItem>
          ))
        ) : (
          <Spinner size={"sm"} />
        )}
      </UnorderedList>
    </Card>
  );
}
