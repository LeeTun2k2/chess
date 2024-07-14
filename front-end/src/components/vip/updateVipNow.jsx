import { Button } from "@chakra-ui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { FaDiamond } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function UpdateVipNow({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Fragment>
      {!user?.is_vip && (
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
