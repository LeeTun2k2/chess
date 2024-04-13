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
  Textarea,
  Center,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../../../lib/axios";
import appSettings from "../../../settings/appSettings";
import { toast_success, toast_error } from "../../../lib/hooks/toast";
import EditorContent from "../../../components/item_list/editor_content";
import { useCurrentPath } from "../../../lib/hooks/route";

export default function AdminUpdateBlogPage() {
  const path = useCurrentPath();
  const id = path[path.length - 1];
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);

  const defaultData = {
    title: "",
    description: "",
    image: null,
    content: "",
  };
  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    axios
      .get(`${appSettings.API_PROXY}/blogs/${id}`)
      .then((resp) => {
        setFormData(resp?.data?.blog ?? defaultData);
      })
      .catch((err) => {
        if (err?.response) toast(toast_error(err?.response?.data?.message));
        else toast(toast_error("Something went wrong. Please try again."));
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`${appSettings.API_PROXY}/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        navigate("/admin/blogs");
        toast(toast_success(t("common.update_success")));
      })
      .catch((err) => {
        if (err?.response) toast(toast_error(err?.response?.data?.message));
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
          <Heading mb={4}>{t("blogs.update")}</Heading>
          <Button
            onClick={() => {
              navigate("/admin/blogs");
            }}
          >
            {"<"} {t("common.back")}
          </Button>
        </Flex>
        <form onSubmit={handleSubmit}>
          <FormControl id="title" isRequired>
            <FormLabel>{t("blogs.title")}</FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              maxLength={100}
              placeholder={t("common.text_max_100")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="description" mt={4} isRequired>
            <FormLabel>{t("blogs.description")}</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              maxLength={500}
              placeholder={t("common.text_max_500")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="image" mt={4}>
            <FormLabel>{t("blogs.image")}</FormLabel>
            <Input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              p={1}
            />
            {typeof formData?.image === "string" ? (
              formData.image.length > 0 && (
                <Image
                  h={100}
                  w={100}
                  src={`${appSettings.API_PROXY}/images/${formData.image}`}
                  alt={formData.title}
                />
              )
            ) : (
              <Image
                h={100}
                w={100}
                src={
                  formData.image instanceof File &&
                  URL.createObjectURL(formData.image)
                }
                alt={formData.title}
              />
            )}
          </FormControl>

          <FormControl id="content" mt={4} isRequired>
            <FormLabel>{t("blogs.content")}</FormLabel>
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
