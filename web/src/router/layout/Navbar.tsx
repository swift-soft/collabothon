import { Box, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { PiArrowsLeftRightThin } from "react-icons/pi";
import { SlWallet } from "react-icons/sl";
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
  const location = useLocation();

  const isLinkActive = (page) => location.pathname === page;

  return (
    <Box position={"fixed"} bottom={0} width={"100%"} fontSize={"x-large"}>
      <Divider
        border={"2px"}
        borderColor={"red"}
        mb={"9px"}
        w={"93%"}
        mx={"auto"}
      />
      <Flex justify={"space-around"}>
        <Link to={"/"} style={{ color: isLinkActive("/") ? "red" : "inherit" }}>
          <VStack>
            <GoHome />
            <Text fontSize={"small"}>Dashboard</Text>
          </VStack>
        </Link>
        <Link
          to={"/history"}
          style={{ color: isLinkActive("/history") ? "red" : "inherit" }}
        >
          <VStack>
            <PiArrowsLeftRightThin />
            <Text fontSize={"small"}>History</Text>
          </VStack>
        </Link>
        <Link
          to={"/expenses"}
          style={{ color: isLinkActive("/expenses") ? "red" : "inherit" }}
        >
          <VStack>
            <SlWallet />
            <Text fontSize={"small"}>Expenses</Text>
          </VStack>
        </Link>
        <Link
          to={"/profile"}
          style={{ color: isLinkActive("/profile") ? "red" : "inherit" }}
        >
          <VStack>
            <VscAccount />
            <Text fontSize={"small"}>Profile</Text>
          </VStack>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
