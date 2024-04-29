import { Image } from "@chakra-ui/react";
import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const ImageSlider = ({
  images,
  interval = 9000,
  width = "100%",
  height = "100%",
}) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      effect={"fade"}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: interval,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, EffectFade, Pagination]}
      className="mySwiper"
    >
      {images.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <Image
            src={imageUrl}
            alt={`Slide ${index}`}
            w={width}
            h={height}
            objectFit={"fill"}
            borderRadius={8}
            aspectRatio={16 / 9}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
