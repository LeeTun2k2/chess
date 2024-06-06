import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaDiamond } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import appSettings from "../../settings/appSettings";

export default function UpdateVipNow() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isVip, setIsVip] = useState(true);

  useEffect(() => {
    const checkVipStatus = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`${appSettings.API_PROXY}/users/vip-status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsVip(response.data.is_vip); // Update state with the is_vip value
      } catch (error) {
        console.error("There was an error checking the VIP status!", error);
      }
    };

    checkVipStatus();
  }, []);
  useEffect(() => {
    console.log("VIP status updated:", isVip);
  }, [isVip]);
  if (isVip) {
    return null;
  }

  return (
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
  );
}
