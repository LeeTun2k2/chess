import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_PROXY } from "../../settings/appSettings";
import { getAccessToken, getRefreshToken } from "../../lib/auth";

export default function TestPage() {
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");

  const fetchData = () =>
    axios
      .get(API_PROXY)
      .then((resp) => {
        console.log(resp.data);
        console.log(resp.status);
        setData(resp.data);
        setStatus(resp.status);
      })
      .catch((error) => {
        setStatus(500);
        setData(error.message);
      });

  const access_token = getAccessToken();
  const refresh_token = getRefreshToken();

  useEffect(() => {
    fetchData();
  }, [data, status]);

  return (
    <>
      <Heading>Status: {status}</Heading>
      <Heading>Data: {data}</Heading>
      <Heading>Access token: {access_token}</Heading>
      <Heading>Refresh token: {refresh_token}</Heading>
    </>
  );
}
