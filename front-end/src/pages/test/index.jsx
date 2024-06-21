import { AspectRatio, Box } from "@chakra-ui/react";
import OpenAI from "openai";
import React from "react";
import appSettings from "../../settings/appSettings";

export default function TestPage() {
  async function main() {
    const openai = new OpenAI({
      apiKey: appSettings.OPENAI_KEY,
      dangerouslyAllowBrowser: true,
    });
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
  }

  main();

  return (
    <Box w={"48%"}>
      <AspectRatio w={"100%"} ratio={1}>
        <iframe title="iframe" src="" allowFullScreen />
      </AspectRatio>
    </Box>
  );
}
