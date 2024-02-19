import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_PROXY } from "../../settings/appSettings";

export default function TestPage() {
  const [data, setData] = useState('');
  const [status, setStatus] = useState('');

const fetchData = () => axios.get(API_PROXY)
.then(resp => {
    console.log(resp.data)
    console.log(resp.status)
    setData(resp.data)
    setStatus(resp.status)
})
.catch(error => {
    setStatus(500)
    setData(error.message)
})

useEffect(() => {
    fetchData()
}, [data, status]);

  return (
    <>
      <Heading>Status: {status}</Heading>
      <Heading>Data: {data}</Heading>
    </>
  );
}
