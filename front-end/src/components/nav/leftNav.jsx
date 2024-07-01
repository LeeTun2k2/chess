import { Box } from "@chakra-ui/react";
import { Fragment } from "react";
import { getUserData } from "../../lib/auth";
import ImageSlider from "../slider/imageSlider";
import HasVipBanner from "../vip/hasVipBanner";
import VipBannerSmall from "../vip/vipBannerSmall";

export default function LeftNav() {
  const user_data = getUserData();
  const isVip =
    user_data?.vip_info?.is_vip && user_data?.vip_info?.vip_expiry !== null;
  return (
    <Fragment>
      <ImageSlider
        images={[
          "https://img.riokupon.com/upload/images/2024/02/13/6fa5c448b0eaba53791b2e14176026bf.png",
          "https://cdn.thuvienphapluat.vn/uploads/Hoidapphapluat/2024/NTH/15022024/30-4.jpg",
          "https://aedigi.com/wp-content/uploads/2022/04/ngay-thiet-ke-lao-dong-1-5-1-scaled.jpg",
        ]}
      />
      <Box py={2} />
      {!!isVip ? <HasVipBanner /> : <VipBannerSmall />}
    </Fragment>
  );
}
