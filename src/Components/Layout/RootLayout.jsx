import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <Flex direction="column" height="100vh">
      <Box>
        <Navbar />
      </Box>

      <Flex flexGrow={1}>
        <Box bg={"#f5f5f5"} flexBasis={{ base: "4770%", md: "80%" }}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}

export default RootLayout;
