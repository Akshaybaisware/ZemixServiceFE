import React from "react";
import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  Flex,
  MenuItem,
  ModalOverlay,
} from "@chakra-ui/react";
import Dataentry from "../../assets/ZEMEX LOGO.png";
import { useState } from "react";
import axios from "axios";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = () => {
    console.log("Logout");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/user/changePassword`, {
        newPassword,
      });

      setSuccessMessage(response.data.message);
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
      console.log(response, "response");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error changing password");
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Flex
      direction={{ base: "row", md: "row" }}
      justifyContent="space-between"
      paddingX="20px"
      paddingY="4"
    >
      <Box>Dashboard</Box>
      <Box>User Registration</Box>
      <Box>Deactive User</Box>
      <Box>QC Report</Box>
      <Box>Recovery</Box>
      <Box>Employee</Box>
      <Box>System Users</Box>

      <Box
        display="flex"
        flexDirection={{ xs: "row", md: "column" }} // Use row for mobile and column for larger screens
        alignItems="center"
        textAlign="center"
        marginRight={{ xs: 0, md: "1rem" }}
        // No margin on mobile, 1rem margin on larger screens
      >
        <Menu>
          {/* MenuButton serves as the trigger for MenuList */}
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            // paddingRight={"0.5rem"}
          >
            {/* Avatar image */}
            <Avatar borderRadius="50%" src="Avatarimage.jpg" cursor="pointer" />

            <MenuButton
              as={Button}
              size="sm"
              width="0.5rem"
              height={"0rem"}
              cursor="pointer"
              paddingRight={"2rem"}
              background={"white"}
              _hover={"white"}
              rightIcon={
                <ChevronDownIcon height={8} width={8} boxShadow={"white"} />
              }
            >
              {/* Content inside MenuButton */}
            </MenuButton>
          </Box>
          {/* MenuList contains the menu items */}
          <MenuList>
            {/* MenuItem for Logout */}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            {/* Other menu items */}
            <MenuItem>My Cart</MenuItem>
            <MenuItem>WishList</MenuItem>
          </MenuList>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          ></Box>
        </Menu>
      </Box>
    </Flex>
  );
}

export default Navbar;
