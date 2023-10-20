import { Box } from "@chakra-ui/react";
import Hero from "./sections/hero";
import Links from "./sections/links";
import Operations from "./sections/operations";
import Navbar from "./sections/navBar";

const HomePage = () => {
  return (
    <div style={{ height: "100%" }}>
      <Navbar />
      <Hero />
      <Links />
      <Operations />
      <Box width="100%" height="40px" bg="red.800">
        Bottom Navbar !!!
      </Box>
    </div>
  );
};

export default HomePage
