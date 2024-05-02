import { Box, Flex, Heading, Image, Spacer, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import appSettings from "../../settings/appSettings";

const DonatePage = () => {
  const { t } = useTranslation();

  return (
    <Box bgColor={"blue.900"}>
      <Flex>
        <Image
          src="https://news.illinois.edu/files/6367/237328/72520.jpg"
          alt="chess1"
          w={"20%"}
          objectFit={"contain"}
          minH={32}
        />
        <Spacer />
        <Image
          src="https://vcdn-thethao.vnecdn.net/2022/03/07/quang-liem-jpeg-8107-1646637777.jpg"
          alt="chess2"
          w={"30%"}
          objectFit={"contain"}
          minH={32}
          mt={-64}
        />
        <Spacer />

        <Image
          src="https://xdcs.cdnchinhphu.vn/446259493575335936/2023/7/30/svsp-16906753983171909475301.jpg"
          alt="chess3"
          w={"15%"}
          objectFit={"contain"}
          minH={32}
          mt={-16}
        />
        <Spacer />

        <Image
          src="https://cdnphoto.dantri.com.vn/QKTm5DnqNLcwn8gb81o14N6LVls=/thumb_w/1020/2023/08/18/dh-spkt-1692328515567.jpeg"
          alt="chess4"
          w={"20%"}
          objectFit={"contain"}
          minH={32}
        />
      </Flex>
      <Flex mt={12} position={"relative"}>
        <Image
          src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/309753274_5255506844560704_3339914521902564387_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE3kMe2QOWhDXROo8pTRAh07gQQoSLqFZbuBBChIuoVlu9Q2L_q4dmzFFxuqCffltaLPa1UkGT5us_70CUvcrBI&_nc_ohc=SYi-N_W5D9UAb5LM84f&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfDiarZe7D6PmFpok1E9tw5LMqCXRo2nFCEVvlrf1Nb0qA&oe=6634FD6B"
          alt="chess5"
          w={"15%"}
          objectFit={"cover"}
          maxHeight={48}
          minH={32}
        />
        <Spacer />
        <Heading
          as="h1"
          mb={4}
          color={"white"}
          position={"absolute"}
          textAlign={"center"}
          top={-16}
          left={0}
          w={"100%"}
        >
          {t("club.support_ute_chess_club")}
        </Heading>
        <Flex alignItems={"center"}>
          <Image
            h={200}
            w={200}
            src={`${appSettings.API_PROXY}/images/donate`}
            alt={t("club.support_ute_chess_club")}
          />
          <Box ml={8}>
            <Text py={2} fontSize={"2xl"} color={"white"}>
              {t("club.card_bank")}: Vietcombank
            </Text>
            <Text py={2} fontSize={"2xl"} color={"white"}>
              {t("club.card_number")}: 022 6868 6868 6868
            </Text>
            <Text py={2} fontSize={"2xl"} color={"white"}>
              {t("club.card_name")}: CLB CỜ SPKT
            </Text>
          </Box>
        </Flex>
        <Spacer />
        <Image
          src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/309882604_5261282527316469_6349312786424447012_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGu6mPYZnBLEoPYKSBeZ4lnU5DhVXY-1rNTkOFVdj7Ws4b-R6HVolubxTSFZL1c126sTuzUCcVPXLb_wdUYDxX1&_nc_ohc=kTF4F51As9UAb6Z_76C&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfDMaIlWgNZ8htFsPAimooHbRAYyeugh_bN_iSIPFAZ7CA&oe=6634F18B"
          alt="chess6"
          w={"15%"}
          objectFit={"cover"}
          maxHeight={48}
          minH={32}
        />
      </Flex>
      <Flex mt={12}>
        <Image
          src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-9/176162565_2586468951651208_2536814589901494617_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGCo4J_j87ojO5MzFgLr-vgfbG4Hu6rHrx9sbge7qsevNMNgp3kdAdgz98q7yIejezvt50Wg6DkkQbqVC45YN6a&_nc_ohc=8HUMmfCAoGQQ7kNvgGoG0C7&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfB3y9oCULrhs3x75nV_2S6QbWDOJFY2f6RBzW-R3lYeJw&oe=6656AD4B"
          alt="chess7"
          w={"20%"}
          objectFit={"contain"}
          h={48}
        />
        <Spacer />
        <Box px={32} mt={4}>
          <Text fontSize="xl" mb={4} color={"white"} textAlign={"center"}>
            {t("club.your_donate_help_us_providing")}
          </Text>
          <Text fontSize="xl" color={"white"} textAlign={"center"}>
            {t("club.thank_you")}
          </Text>
        </Box>
        <Spacer />
        <Image
          src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/309943402_105621952330061_8497908223694667180_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGOZd-deVWxxQwmrXZux6Q93RjGNeOkm5LdGMY146SbkoEXjcEhcljGOvLFgUrSsevNnTJEYCWhZ-CkN3pXZKmI&_nc_ohc=hkHjodGHxqMAb4jZFWh&_nc_ht=scontent.fsgn5-11.fna&oh=00_AfDwBM7_fG1qas-C_0J_LzBV1hag2jzLH4QV6CDft1LCUA&oe=66351CF0"
          alt="chess8"
          w={"20%"}
          objectFit={"cover"}
          h={48}
        />
      </Flex>
    </Box>
  );
};

export default DonatePage;
