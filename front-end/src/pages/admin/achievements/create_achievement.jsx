import React, { useState } from "react";
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
import appSettings from "../../../settings/appSettings";
import { toast_success, toast_error } from "../../../lib/hooks/toast";

export default function AdminCreateAchievementPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);

  const defaultData = {
    event: "",
    time: Date.now(),
    member: "",
    reward: "",
  };
  const [formData, setFormData] = useState(defaultData);

  function formatDate(datestring) {
    const date = new Date(datestring);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = Date.now();
    if (
      formData.start <= now ||
      formData.end <= now ||
      formData.start >= formData.end
    ) {
      toast(toast_error(t("common.invalid_datetime")));
      return;
    }
    setLoading(true);
    axios
      .post(`${appSettings.API_PROXY}/achievements`, formData)
      .then(() => {
        navigate("/admin/achievements");
        toast(toast_success(t("common.create_success")));
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
          <Heading mb={4}>{t("achievements.create")}</Heading>
          <Button
            onClick={() => {
              navigate("/admin/achievements");
            }}
          >
            {"<"} {t("common.back")}
          </Button>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Flex>
            <FormControl id="event" isRequired mt={2} flex={3} mr={16}>
              <FormLabel>{t("achievements.event")}</FormLabel>
              <Input
                type="text"
                name="event"
                value={formData.event}
                maxLength={100}
                placeholder={t("common.text_max_100")}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="time" isRequired mt={2} flex={1}>
              <FormLabel>{t("achievements.time")}</FormLabel>
              <Input
                type="date"
                name="time"
                value={formatDate(formData.time)}
                placeholder={t("common.text_max_100")}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    time: new Date(e?.target?.value),
                  });
                }}
              />
            </FormControl>
          </Flex>
          <FormControl id="member" isRequired mt={2}>
            <FormLabel>{t("achievements.member")}</FormLabel>
            <Input
              type="text"
              name="member"
              value={formData.member}
              maxLength={100}
              placeholder={t("common.text_max_100")}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="reward" isRequired mt={2}>
            <FormLabel>{t("achievements.reward")}</FormLabel>
            <Input
              type="text"
              name="reward"
              value={formData.reward}
              maxLength={100}
              placeholder={t("common.text_max_100")}
              onChange={handleChange}
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
