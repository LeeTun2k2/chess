import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Joyride, { ACTIONS, STATUS } from "react-joyride";

const Tutorial = () => {
  const { t } = useTranslation();
  const theme = localStorage.getItem("theme");
  const [run, setRun] = useState(false);

  const steps = [
    {
      target: ".menu-club",
      content: t(
        "settings.This is the Club menu where you can find various club-related options"
      ),
    },
    {
      target: ".menu-play",
      content: t(
        "settings.This is the Play menu where you can start playing games."
      ),
    },
    {
      target: ".menu-practice",
      content: t(
        "settings.This is the Practice menu where you can find practice options."
      ),
    },
    {
      target: ".menu-tv",
      content: t(
        "settings.This is the TV menu where you can watch live games."
      ),
    },
    {
      target: ".menu-vip",
      content: t(
        "settings.This is the VIP menu where you can access VIP features."
      ),
    },
    {
      target: ".menu-notifications",
      content: t("settings.This is where you will receive notifications."),
    },
    {
      target: ".menu-user",
      content: t(
        "settings.This is your user menu where you can access your profile and settings."
      ),
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status, action } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
    } else if (action === ACTIONS.CLOSE) {
      setRun(false);
    }
  };

  return (
    <Box>
      <Button colorScheme="teal" onClick={() => setRun(true)}>
        {t("settings.Start Tutorial")}
      </Button>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options:
            theme === "dark"
              ? {
                  arrowColor: "white",
                  backgroundColor: "white",
                  overlayColor: "rgba(79, 26, 0, 0.4)",
                  primaryColor: "#000",
                  textColor: "#004a14",
                  zIndex: 1000,
                }
              : {
                  arrowColor: "#e3ffeb",
                  backgroundColor: "#e3ffeb",
                  overlayColor: "rgba(79, 26, 0, 0.4)",
                  primaryColor: "#000",
                  textColor: "#004a14",
                  zIndex: 1000,
                },
        }}
      />
    </Box>
  );
};

export default Tutorial;
