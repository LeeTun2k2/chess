import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  HStack,
  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { CHESS, XIANGQI } from "../../settings/game";
import { useNavigate } from "react-router-dom";
import { toast_error, toast_success } from "../../lib/hooks/toast";
import axios from "../../lib/axios";
import { ONLINE, FRIEND, OFFLINE } from "../../settings/game";
import { API_PROXY } from "../../settings/appSettings";

const NewOnlineGameModal = ({
  isOpen,
  onClose,
  mode = ONLINE | FRIEND | OFFLINE,
}) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [variant, setVariant] = useState(undefined);
  const [initial_time, setInitialTime] = useState();
  const [bonus_time, setBonusTime] = useState();
  const [bot_level, setBotLevel] = useState(1);

  const onVariantChange = (e) => {
    setVariant(e.target.value);
  };

  const onInitialTimeChange = (e) => {
    setInitialTime(e.target.value);
  };

  const onBonusTimeChange = (e) => {
    setBonusTime(e.target.value);
  };

  const onBotLevelChange = (value) => {
    setBotLevel(value);
  };

  const validate = () => {
    if (!variant) {
      toast(toast_error("Please select a variant!"));
      return false;
    }
    if (!initial_time) {
      toast(toast_error("Please enter initial time!"));
      return false;
    }
    if (!bonus_time) {
      toast(toast_error("Please enter bonus time!"));
      return false;
    }
    return true;
  };

  const newLobby = (data) => {
    setLoading(true);
    axios
      .post(`${API_PROXY}/lobby`, data)
      .then((res) => {
        if (res.data) {
          toast(toast_success("Lobby created!"));
          navigate(`/wait/${res.data._id}`);
        } else {
          toast(toast_error("Fail to create lobby!"));
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        toast(toast_error("Fail to create lobby!"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const newOfflineGame = () => {
    setLoading(true);
  };

  const onSubmit = () => {
    if (!validate()) {
      return false;
    }
    const data = {
      variant,
      initial_time: parseInt(initial_time),
      bonus_time: parseInt(bonus_time),
      mode,
    };
    if (mode === OFFLINE) {
      data.bot_level = bot_level;
      newOfflineGame(data);
    } else {
      newLobby(data);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Play{" "}
          {mode === ONLINE
            ? "online game"
            : mode === FRIEND
            ? "vs friend"
            : "vs computer"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Variant</FormLabel>
            <Select
              variant="outline"
              placeholder="-- Variant --"
              onChange={onVariantChange}
              value={variant}
            >
              <option value={CHESS}>Chess</option>
              <option value={XIANGQI}>Xiangqi</option>
            </Select>
          </FormControl>
          <HStack mt={4}>
            <FormControl>
              <FormLabel htmlFor="initial-time">Initial time </FormLabel>
              <Input
                id="initial-time"
                placeholder="Minutes"
                type="number"
                required
                onChange={onInitialTimeChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="bonus-time">Bonus time</FormLabel>
              <Input
                id="bonus-time"
                placeholder="Seconds"
                type="number"
                required
                onChange={onBonusTimeChange}
              />
            </FormControl>
          </HStack>
          {mode === OFFLINE && (
            <FormControl mt={4}>
              <FormLabel>Bot level</FormLabel>
              <Slider
                defaultValue={1}
                min={1}
                max={10}
                onChange={onBotLevelChange}
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <SliderMark key={i} value={i + 1} mt="1" fontSize="sm">
                    {i + 1}
                  </SliderMark>
                ))}
                <SliderTrack bgColor={"gray.100"}>
                  <SliderFilledTrack bg="black" />
                </SliderTrack>
                <SliderThumb bgColor={"black"} />
              </Slider>
            </FormControl>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" onClick={onSubmit} isLoading={loading}>
            Create
          </Button>
          <Button ml={2} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewOnlineGameModal;
