import { Heading } from "@chakra-ui/react";
import React, { useState } from "react";

export default function TestPage() {
  const [data, setData] = useState("Chua co gi");

  return (
    <>
      <Heading>{data}</Heading>
    </>
  );
}
