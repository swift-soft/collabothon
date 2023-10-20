import { Stack } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Layout = () => (
  <Stack minH="100vh">
    <Outlet />
    <Navbar />
  </Stack>
);

export default Layout;
