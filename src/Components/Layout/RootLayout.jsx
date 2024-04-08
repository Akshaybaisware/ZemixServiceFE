import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import DashboardOutlet from "../../DashboardOutlet";
import Dashboard from "../Dashboard/Dashboard";

function RootLayout() {
  return (
    <Flex direction="column" height="100vh">
      <Box position={"fixed"} width={"100%"} zIndex={"1"}>
        <Navbar />
      </Box>

      <Flex flexGrow={1}>
        <Box

        // ml={["0rem" , "2rem"]}
        mt={["13%" , "10rem"]}
        bg={"white"} flexBasis={{ base: "100%", md: "100%" }}>
          <Dashboard />
        </Box>
      </Flex>
    </Flex>
  );
}

export default RootLayout;
