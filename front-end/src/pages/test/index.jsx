import { AspectRatio, Box } from "@chakra-ui/react";
import React from "react";

export default function TestPage() {
  return (
    <Box w={"48%"}>
      <AspectRatio w={"100%"} ratio={1}>
        <iframe title="iframe" src="" allowFullScreen />
      </AspectRatio>
    </Box>
  );
}
