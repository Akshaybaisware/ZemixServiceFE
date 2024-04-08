import React, { useState, useRef, useEffect } from "react";

import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { Box, Button, Center, Image, Input } from "@chakra-ui/react";
import axios from "axios";

function UserLogin() {
  
  return (
    <>
      <Box
        bg={"lightgray"}
        
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh" // Ensure the content takes up at least the full viewport height
      >
        <Box width={["300px", "500px"]} padding={"2rem"} bg={"white"}>
          <Center
          textAlign={"center"}
          color={"purple"}
          fontSize={"1.2rem"} fontWeight={"700"}>
            Welcome back ! Log in to your account to Complete Your work
          </Center>

          <Box
            display="flex"
            justifyContent={"center"}
            flexDirection="column"
            alignItems="center"
            textAlign={"center"}
            // Set a maximum width for responsiveness
            // Take up 90% of the parent container's width
            mt="20px" // Add margin at the top
          >
            <Box width="100%" mb="20px">
              {" "}
              {/* Adjust width and add margin-bottom */}
              <Input  placeholder="UserName" />
            </Box>
            <Box width="100%" mb="20px">
              {" "}
              {/* Adjust width and add margin-bottom */}
              <Input  placeholder="Password" />
            </Box>
            <Button
              height="3rem"
              width="40%" // Take up 100% width
              borderRadius="16px"
              color="white"
              background="#FF00FF"
              fontSize={["0.9rem", "1.3rem"]}
              fontWeight={700}
              fontFamily='"Poppins", sans-serif'
              mb="20px" // Add margin-bottom
              _hover={{ background: "FloralWhite", color: "black" }}
            
            >
              Log In
            </Button>
            <NavLink
            
              style={{ textDecoration: "none", width: "100%" }}
            >
            
            </NavLink>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default UserLogin;
