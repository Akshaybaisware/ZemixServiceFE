// RootLayout.jsx
import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import UserNavbar from "../UserPage/UserNavbar";

function RootLayout() {
  const role = localStorage.getItem("role");
  return (
    <Flex direction="column" height="100vh">
      {role === "admin" ? <Navbar /> : <UserNavbar />}
      <Flex flexGrow={1}>
        <Box
          mt={["13%", "10rem"]}
          bg="white"
          flexBasis={{ base: "100%", md: "100%" }}
        >
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}

export default RootLayout;
