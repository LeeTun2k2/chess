import { Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
export default function DatetimePicker({ value, onChange }) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [date, setDate] = useState("");

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    if (value) setDate(formatDate(new Date(value)));
  }, [value]);

  return (
    <Flex align={"center"}>
      <Input
        type="number"
        w={16}
        placeholder="hh"
        value={hour}
        onChange={(e) => {
          const input = e?.target?.value ?? -1;
          if (input.length > 2) return;
          if (input < 0 || input > 23) return;
          setHour(input);
          onChange(hour, minute, date);
        }}
      />
      <Text px={2}>:</Text>
      <Input
        type="number"
        w={16}
        placeholder="mm"
        value={minute}
        onChange={(e) => {
          const input = e?.target?.value ?? -1;
          if (input.length > 2) return;
          if (input < 0 || input > 59) return;
          setMinute(input);
          onChange(hour, minute, date);
        }}
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => {
          const date = e?.target?.value;
          setDate(date);
          onChange(hour, minute, date);
        }}
        w={48}
        ml={2}
      />
    </Flex>
  );
}
