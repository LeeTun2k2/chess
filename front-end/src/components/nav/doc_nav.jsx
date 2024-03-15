import { Container } from "@chakra-ui/react";
import NavList from "./nav_list";
import { FaBlog, FaBook, FaPlay, FaVideo } from "react-icons/fa";
import { FaPuzzlePiece } from "react-icons/fa";

const quick_play = [
  { _id: "play-online", text: "Play vs online", href: "/play/online" },
  { _id: "play-friend", text: "Play vs friend", href: "/play/friend" },
  { _id: "play-computer", text: "Play vs computer", href: "/play/computer" },
];

const quick_pratice = [
  { _id: "puzzles", text: "Puzzles", href: "/puzzles" },
  { _id: "books", text: "Books", href: "/books" },
  { _id: "videos", text: "Videos", href: "videos" },
];

export default function DocNav(props) {
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
        heading="Blogs"
        icon={<FaBlog style={{ marginRight: "8px" }} />}
        my={4}
      />

      <NavList
        list={quick_books ?? []}
        heading="Books"
        icon={<FaBook style={{ marginRight: "8px" }} />}
        my={4}
      />

      <NavList
        list={quick_videos ?? []}
        heading="Videos"
        icon={<FaVideo style={{ marginRight: "8px" }} />}
        my={4}
      />

      <NavList
        list={quick_play ?? []}
        heading="Play"
        icon={<FaPlay style={{ marginRight: "8px" }} />}
        my={4}
      />

      <NavList
        list={quick_pratice ?? []}
        heading="Pratice"
        icon={<FaPuzzlePiece style={{ marginRight: "8px" }} />}
      />
    </Container>
  );
}
