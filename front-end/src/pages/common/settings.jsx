import { useState } from "react";
import {
  HStack,
  Container,
  Heading,
  Select,
  Switch,
  Spacer,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ClientLayout from "../../components/layouts/clientLayout";

const SettingsPage = () => {
  const savedLang = localStorage.getItem("lang");
  const savedTheme = localStorage.getItem("theme");
  const savedBoardSettings = localStorage.getItem("boardSettings");
  const savedPieceSettings = localStorage.getItem("pieceSettings");
  const savedSoundEnabled = localStorage.getItem("soundEnabled") === "true";
  const savedSoundSettings = localStorage.getItem("soundSettings");

  const [language, setLanguage] = useState(savedLang ?? "en");
  const [theme, setTheme] = useState(savedTheme ?? "light");
  const [boardSettings, setBoardSettings] = useState(
    savedBoardSettings ?? "standard"
  );
  const [pieceSettings, setPieceSettings] = useState(
    savedPieceSettings ?? "classic"
  );
  const [soundEnabled, setSoundEnabled] = useState(savedSoundEnabled);
  const [soundSettings, setSoundSettings] = useState(savedSoundSettings);

  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  };

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  const handleBoardSettingsChange = (e) => {
    const selectedBoardSettings = e.target.value;
    setBoardSettings(selectedBoardSettings);
    localStorage.setItem("boardSettings", selectedBoardSettings);
  };

  const handlePieceSettingsChange = (e) => {
    const selectedPieceSettings = e.target.value;
    setPieceSettings(selectedPieceSettings);
    localStorage.setItem("pieceSettings", selectedPieceSettings);
  };

  const handleSoundToggle = () => {
    const updatedSoundEnabled = !soundEnabled;
    setSoundEnabled(updatedSoundEnabled);
    localStorage.setItem("soundEnabled", updatedSoundEnabled);
  };

  const handleSoundSettingsChange = (e) => {
    const selectedSoundSettings = e.target.value;
    setSoundSettings(selectedSoundSettings);
    localStorage.setItem("soundSettings", selectedSoundSettings);
  };

  return (
    <ClientLayout>
      <Container maxW="6xl" mt={8}>
        <Heading mb={16}>{t("settings.heading")}</Heading>
        <Flex
          w={"100%"}
          justifyContent={"space-between"}
          display={{ base: "block", md: "flex" }}
        >
          <HStack w={"100%"} py={4}>
            <Heading size="md" mb={2}>
              {t("settings.languageSettings")}
            </Heading>
            <Spacer />
            <Select
              value={language}
              onChange={handleLanguageChange}
              w={{ base: 200, md: 300 }}
            >
              <option value="en">{t("settings.english")}</option>
              <option value="vi">{t("settings.vietnamese")}</option>
            </Select>
          </HStack>
          <Box w={"20%"} />
          <HStack w={"100%"} py={4}>
            <Heading size="md" mb={2}>
              {t("settings.themeSettings")}
            </Heading>
            <Spacer />
            <Select
              value={theme}
              onChange={handleThemeChange}
              w={{ base: 200, md: 300 }}
            >
              <option value="light">{t("settings.light")}</option>
              <option value="dark">{t("settings.dark")}</option>
            </Select>
          </HStack>
        </Flex>
        <Flex
          w={"100%"}
          justifyContent={"space-between"}
          display={{ base: "block", md: "flex" }}
        >
          <HStack w={"100%"}>
            <Heading size="md" mb={2}>
              {t("settings.boardSettings")}
            </Heading>
            <Spacer />
            <Select
              value={boardSettings}
              onChange={handleBoardSettingsChange}
              w={{ base: 200, md: 300 }}
            >
              <option value="standard">{t("settings.standard")}</option>
              <option value="custom">{t("settings.custom")}</option>
            </Select>
          </HStack>
          <Box w={"20%"} />
          <HStack mt={8} w={"100%"}>
            <Heading size="md" mb={2}>
              {t("settings.pieceSettings")}
            </Heading>
            <Spacer />
            <Select
              value={pieceSettings}
              onChange={handlePieceSettingsChange}
              w={{ base: 200, md: 300 }}
            >
              <option value="classic">{t("settings.classic")}</option>
              <option value="modern">{t("settings.modern")}</option>
            </Select>
          </HStack>
        </Flex>
        <Flex
          w={"100%"}
          justifyContent={"space-between"}
          display={{ base: "block", md: "flex" }}
        >
          <HStack mt={8} w={"100%"} align={"center"}>
            <Heading size="md">{t("settings.soundSettings")}</Heading>
            <Spacer />
            <Switch
              id="sound"
              colorScheme="teal"
              size="lg"
              isChecked={soundEnabled}
              onChange={handleSoundToggle}
              mr={{ base: 0, md: 250 }}
            />
          </HStack>
          <Box w={"20%"} />
          <HStack mt={8} w={"100%"}>
            <Heading size="md" mb={2}>
              {t("settings.soundEffect")}
            </Heading>
            <Spacer />
            <Select
              placeholder={t("settings.selectSoundEffect")}
              w={{ base: 200, md: 300 }}
              value={soundSettings}
              onChange={handleSoundSettingsChange}
            >
              <option value="classic">{t("settings.classic")}</option>
              <option value="modern">{t("settings.modern")}</option>
            </Select>
          </HStack>
        </Flex>
      </Container>
    </ClientLayout>
  );
};

export default SettingsPage;
