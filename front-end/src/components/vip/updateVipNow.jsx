import { Button } from "@chakra-ui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { FaDiamond } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../lib/auth";

export default function UpdateVipNow({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user_data = getUserData();
  const isVip = user_data?.is_vip;

  return (
    <Fragment>
      {!isVip && (
        <Button
          colorScheme="green"
          w={"100%"}
          mb={4}
          leftIcon={<FaDiamond />}
          rightIcon={<FaDiamond />}
          onClick={() => navigate("/vip")}
        >
          {t("vip.upgrade_your_vip")}
        </Button>
      )}
    </Fragment>
  );
}
