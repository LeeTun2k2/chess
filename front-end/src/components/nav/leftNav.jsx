import { Box } from "@chakra-ui/react";
import { Fragment } from "react";
import ImageSlider from "../slider/imageSlider";
import VipBannerSmall from "../vip/vipBannerSmall";

export default function LeftNav() {
  return (
    <Fragment>
      <ImageSlider
        images={[
          "https://img.riokupon.com/upload/images/2024/02/13/6fa5c448b0eaba53791b2e14176026bf.png",
          "https://cdn.thuvienphapluat.vn/uploads/Hoidapphapluat/2024/NTH/15022024/30-4.jpg",
          "https://aedigi.com/wp-content/uploads/2022/04/ngay-thiet-ke-lao-dong-1-5-1-scaled.jpg",
        ]}
        height={52}
      />
      <Box py={2} />
      <VipBannerSmall />
    </Fragment>
  );
}
