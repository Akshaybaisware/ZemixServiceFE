import React, { useState, useRef, useEffect } from "react";

import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { Box, Button, Center, Image, Input } from "@chakra-ui/react";
import axios from "axios";

function Login() {
  const username = useRef();
  const password = useRef();

  const handleLogin = async (e) => {
    const user = {
      email: username.current.value,
      password: password.current.value,
    };
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        user
      );
      console.log(response);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            <Input ref={username} placeholder="UserName" />
          </Box>
          <Box height={"3rem"} width="80%" borderRadius="6px">
            <Input ref={password} placeholder="Password" />
          </Box>
          <NavLink to="/" style={{ textDecoration: "none", width: "100%" }}>
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
              onClick={handleLogin}
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
