import { Box, Text, Link, Image } from "@chakra-ui/react";

const Links = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      marginTop="10px"
      mb="20px"
    >
      <Link
        href="#"
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginX="10px"
      >
        <Image
          src="https://seeklogo.com/images/T/twitter-icon-circle-blue-logo-0902F48837-seeklogo.com.png"
          alt="logo"
          height={"40px"}
        />
        <Text fontSize="sm" textAlign="center">
          New transfer
        </Text>
      </Link>
      <Link
        href="#"
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginX="10px"
      >
        <Image
          src="https://seeklogo.com/images/T/twitter-icon-circle-blue-logo-0902F48837-seeklogo.com.png"
          alt="logo"
          height={"40px"}
        />
        <Text fontSize="sm" textAlign="center">
          Blik
        </Text>
      </Link>
      <Link
        href="#"
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginX="10px"
      >
        <Image
          src="https://seeklogo.com/images/T/twitter-icon-circle-blue-logo-0902F48837-seeklogo.com.png"
          alt="logo"
          height={"40px"}
        />
        <Text fontSize="sm" textAlign="center">
          Your assets
        </Text>
      </Link>
    </Box>
  );
};

export default Links;
