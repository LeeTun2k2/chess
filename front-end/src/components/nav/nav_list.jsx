import {
  Link,
  UnorderedList,
  ListItem,
  HStack,
  Heading,
  Divider,
} from "@chakra-ui/react";

export default function NavList({ list, heading, icon }) {
  return (
    <>
      <HStack>
        <Heading mb={2} display="flex" alignItems="center" size="md">
          {icon}
          {heading}
        </Heading>
        <Divider borderColor="black" />
      </HStack>
      <UnorderedList mb={8}>
        {list.map((item) => (
          <ListItem key={item._id} item={item} w="100%">
            <Link
              display="block"
              w="100%"
              href={item.href}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {item.text}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
}
