import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/layouts/adminLayout";
import {
  Flex,
  Button,
  Container,
  Heading,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../../../lib/axios";
import { API_PROXY } from "../../../settings/appSettings";
import { toast_success, toast_error } from "../../../lib/hooks/toast";
import { useCurrentPath } from "../../../lib/hooks/route";
import EditorContent from "../../../components/item_list/editor_content";
import ReactPlayer from "react-player";

const defaultData = {
  title: "",
  description: "",
  link: "",
  content: "",
};

export default function AdminUpdateVideoPage() {
  const path = useCurrentPath();
  const id = path[path.length - 1];
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    axios
      .get(`${API_PROXY}/videos/${id}`)
      .then((resp) => {
        setFormData(resp?.data?.video ?? defaultData);
      })
      .catch((err) => {
        if (err.response) toast(toast_error(err.response?.data?.message));
        else toast(toast_error("Something went wrong. Please try again."));
      });
  }, [id, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`${API_PROXY}/videos/${id}`, formData)
      .then(() => {
        navigate("/admin/videos");
        toast(toast_success(t("common.update_success")));
      })
      .catch((err) => {
        if (err.response) toast(toast_error(err.response?.data?.message));
        else toast(toast_error("Something went wrong. Please try again."));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AdminLayout>
      <Container maxW="6xl" py={8}>
        <Flex justify={"space-between"}>
          <Heading mb={4}>{t("videos.update")}</Heading>
          <Button
            onClick={() => {
              navigate("/admin/videos");
            }}
          >
            {"<"} {t("common.back")}
          </Button>
        </Flex>
        <form onSubmit={handleSubmit}>
          <FormControl id="title" isRequired mt={2} flex={3} mr={16}>
            <FormLabel>{t("videos.title")}</FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              maxLength={100}
              placeholder={t("common.text_max_100")}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="description" isRequired mt={2}>
            <FormLabel>{t("videos.description")}</FormLabel>
            <Input
              type="text"
              name="description"
              value={formData.description}
              maxLength={100}
              placeholder={t("common.text_max_100")}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="link" mt={4} isRequired>
            <FormLabel>{t("videos.video")}</FormLabel>
            <Input
              type="text"
              name="link"
              value={formData.link}
              placeholder={t("common.text_max_100")}
              onChange={handleChange}
              mb={4}
            />
            {formData?.link?.length > 10 && (
              <ReactPlayer url={formData.link} controls />
            )}
          </FormControl>
          <FormControl id="content" mt={4} isRequired>
            <FormLabel>{t("videos.content")}</FormLabel>
            <EditorContent
              content={formData.content}
              onChange={(value) => {
                setFormData({ ...formData, content: value });
              }}
            />
          </FormControl>

          <Center>
            <Button
              type="submit"
              colorScheme="teal"
              mt={4}
              isLoading={isLoading}
              minW={200}
            >
              {t("common.submit")}
            </Button>
          </Center>
        </form>
      </Container>
    </AdminLayout>
  );
}
