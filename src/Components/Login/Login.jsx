import React from "react";

import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { Box, Button, Center, Image, Input } from "@chakra-ui/react";

function Login() {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh" // Center content vertically on the page
      >
        <Center>ADMIN</Center>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxWidth="400px" // Set a maximum width for responsiveness
          width="100%" // Take up full width on smaller screens
        >
          <Box height={"3rem"} width="80%" borderRadius="6px">
            <Input placeholder="UserName" />
          </Box>
          <Box height={"3rem"} width="80%" borderRadius="6px">
            <Input placeholder="Password" />
          </Box>
          <NavLink
            to="/admin"
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Button
              height={"3rem"}
              width="80%"
              borderRadius="6px"
              // border="2px solid black"
              color="#fff"
              background="teal"
              fontWeight={700}
              fontFamily='"Poppins", sans-serif'
              mt="20px"
              _hover={{ background: "FloralWhite", color: "black" }}
            >
              Log In
            </Button>
          </NavLink>
          <NavLink
            to="/userlogin"
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Button
              height={"3rem"}
              width="80%"
              borderRadius="6px"
              border="2px solid black"
              color="#fff"
              background="teal"
              fontWeight={700}
              fontFamily='"Poppins", sans-serif'
              mt="20px"
              _hover={{ background: "FloralWhite", color: "black" }}
            >
              System Users Login From Hear
            </Button>
          </NavLink>
        </Box>

        <Box
          width={"400px"}
          display={"flex"}
          justifyContent={"flex-end"}
          fontWeight={"700"}
          color={"#901810"}
          marginTop={"1rem"}
          textAlign={"right"}
        >
          <NavLink
            to="/signup"
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Button
              borderRadius={"1rem"}
              _hover={{ background: "FloralWhite", color: "black" }}
              w={"200px"}
            ></Button>
          </NavLink>
        </Box>
      </Box>
    </>
  );
}

export default Login;
