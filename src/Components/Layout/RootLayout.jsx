// RootLayout.jsx
import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <Flex direction="column" height="100vh">
      <Navbar />
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
