import { Container } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaBlog, FaBook, FaPlay, FaPuzzlePiece, FaVideo } from "react-icons/fa";
import NavList from "./nav_list";

export default function DocNav() {
  const { t } = useTranslation();
  const quick_play = useMemo(
    () => [
      { _id: "play-online", text: t("header.play"), href: "/new-game" },
      { _id: "lobby", text: t("header.lobby"), href: "/lobby" },
      {
        _id: "tournaments",
        text: t("header.tournaments"),
        href: "/tournaments",
      },
    ],
    [t]
  );

  const quick_pratice = useMemo(
    () => [
      { _id: "puzzles", text: t("header.puzzles"), href: "/puzzles" },
      { _id: "books", text: t("header.books"), href: "/books" },
      { _id: "videos", text: t("header.videos"), href: "videos" },
    ],
    [t]
  );

  const getData = () => {
    return {
      quick_blogs: [
        { _id: "puzzles", text: "Knight or Bishop", href: "/puzzles" },
        { _id: "books", text: "Chess for live", href: "/books" },
        {
          _id: "videos",
          text: "Is Chess popular than Xiangqi",
          href: "videos",
        },
      ],
      quick_books: [
        {
          _id: "puzzles",
          text: "Can you solve a puzzle that has over 2000 elo in one minute",
          href: "/puzzles",
        },
        { _id: "books", text: "Books", href: "/books" },
        { _id: "videos", text: "Videos", href: "videos" },
      ],
      quick_videos: [
        { _id: "puzzles", text: "Puzzles", href: "/puzzles" },
        { _id: "books", text: "Books", href: "/books" },
        { _id: "videos", text: "Videos", href: "videos" },
      ],
    };
  };

  const { quick_blogs, quick_books, quick_videos } = getData();

  return (
    <Container mt={4}>
      <NavList
        list={quick_blogs ?? []}
        heading={t("header.blogs")}
        icon={<FaBlog style={{ marginRight: "8px" }} />}
        my={4}
      />

      <NavList
        list={quick_books ?? []}
        heading={t("header.books")}
        icon={<FaBook style={{ marginRight: "8px" }} />}
        my={4}
      />

      <NavList
        list={quick_videos ?? []}
        heading={t("header.videos")}
        icon={<FaVideo style={{ marginRight: "8px" }} />}
        my={4}
      />

      <NavList
        list={quick_play ?? []}
        heading={t("header.play")}
        icon={<FaPlay style={{ marginRight: "8px" }} />}
        my={4}
      />

      <NavList
        list={quick_pratice ?? []}
        heading={t("header.practice")}
        icon={<FaPuzzlePiece style={{ marginRight: "8px" }} />}
      />
    </Container>
  );
}
