import React, { useState } from 'react';
import Joyride, { ACTIONS, STATUS } from 'react-joyride';
import { Button, Box } from '@chakra-ui/react';

const Tutorial = () => {
  const [run, setRun] = useState(true);

  const steps = [
    {
      target: '.menu-club',
      content: 'This is the Club menu where you can find various club-related options.',
    },
    {
      target: '.menu-play',
      content: 'This is the Play menu where you can start playing games.',
    },
    {
      target: '.menu-practice',
      content: 'This is the Practice menu where you can find practice options.',
    },
    {
      target: '.menu-tv',
      content: 'This is the TV menu where you can watch live games.',
    },
    {
      target: '.menu-vip',
      content: 'This is the VIP menu where you can access VIP features.',
    },
    {
      target: '.menu-notifications',
      content: 'This is where you will receive notifications.',
    },
    {
      target: '.menu-user',
      content: 'This is your user menu where you can access your profile and settings.',
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
    <Box p={4}>
      <Button colorScheme="teal" onClick={() => setRun(true)}>
        Start Tutorial
      </Button>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            arrowColor: '#e3ffeb',
            backgroundColor: '#e3ffeb',
            overlayColor: 'rgba(79, 26, 0, 0.4)',
            primaryColor: '#000',
            textColor: '#004a14',
            zIndex: 1000,
          },
        }}
      />
    </Box>
  );
};

export default Tutorial;
