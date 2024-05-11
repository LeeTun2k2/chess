import { AspectRatio, Box, Container, Flex, Spacer } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import LeftNav from "../../components/nav/leftNav";
import UpdateVipNow from "../../components/vip/updateVipNow";
import { getUserData } from "../../lib/auth";
import appSettings from "../../settings/appSettings";

export default function UpgradeVipPage() {
  return (
    <Box bgGradient="linear(to bottom right, #08142F, #11284B)" color="white" p="50px" fontFamily="Helvetica, sans-serif" minH="100vh">
        <Container maxW="container.xl">
            <Box textAlign="center" mb="40px" fontSize="2.5rem" textTransform="uppercase">Register for UTE Club VIP Membership today</Box>
            <Flex justifyContent="space-evenly">
                {/* VIP 1 Month */}
                <Box
                  width="30%"
                  border="1px solid #334E68"
                  borderRadius="10px"
                  p="20px"
                  textAlign="center"
                  _hover={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}
                >
                    <Box fontSize="1.5rem" textTransform="uppercase" mb="15px">VIP 1 Month</Box>
                    <Box color="#9FB3C8" fontSize="1.1rem" mb="10px">For individual enthusiasts, students, and professionals who want to enjoy exclusive benefits and privileges.</Box>
                    <Box fontSize="1.2rem" mb="5px">$10 USD</Box>
                    <button style={{ backgroundColor: '#0366D6', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', fontSize: '1rem' }}>Start free trial</button>
                </Box>

                {/* VIP 6 Months */}
                <Box
                  width="30%"
                  border="1px solid #334E68"
                  borderRadius="10px"
                  p="20px"
                  bg="#0D263B"
                  textAlign="center"
                  _hover={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}
                >
                    <Box color="#58A6FF" fontSize="1.5rem" textTransform="uppercase" mb="15px">VIP 6 Months</Box>
                    <Box color="#9FB3C8" fontSize="1.1rem" mb="10px">For individual enthusiasts, students, and professionals who want to enjoy exclusive benefits and privileges.</Box>
                    <Box fontSize="1.2rem" mb="5px">$50 USD</Box>
                    <button style={{ backgroundColor: '#0366D6', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', fontSize: '1rem' }}>Buy now</button>
                </Box>

                {/* VIP 12 Months */}
                <Box
                  width="30%"
                  border="1px solid #334E68"
                  borderRadius="10px"
                  p="20px"
                  textAlign="center"
                  _hover={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}
                >
                    <Box fontSize="1.5rem" textTransform="uppercase" mb="15px">VIP 12 Months</Box>
                    <Box color="#9FB3C8" fontSize="1.1rem" mb="10px">For individual enthusiasts, students, and professionals who want to enjoy exclusive benefits and privileges.</Box>
                    <Box fontSize="1.2rem" mb="5px">$90 USD</Box>
                    <button style={{ backgroundColor: '#0366D6', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', fontSize: '1rem' }}>Contact sales</button>
                </Box>
            </Flex>
        </Container>
    </Box>
  );
}
