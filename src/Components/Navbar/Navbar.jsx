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
  useToast,
  ModalOverlay,
} from "@chakra-ui/react";
import Dataentry from "../../assets/ZEMEX LOGO.png";
import { useState } from "react";
import axios from "axios";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
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

  const handleforgetpassword = () => {
    try {
      console.log("forgetpassword");
    } catch (error) {
      toast({
        title: "Error",
        description: "Error changing password",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Flex
      direction={{ base: "row", md: "row" }}
      justifyContent="space-between"
      paddingX="20px"
      paddingY="4"
    >
      <Link to="/">
        <Box>Dashboard</Box>
      </Link>

      <Menu>
        <MenuButton as={Box} cursor="pointer">
          User Actions
        </MenuButton>
        <MenuList>
          <MenuItem as={RouterLink} to="/registeration">
            Registration
          </MenuItem>
          <MenuItem as={RouterLink} to="/pendingregisteration">
            Pending Registration
          </MenuItem>
          <MenuItem as={RouterLink} to="/cancelregisteration">
            Cancel Registration
          </MenuItem>
          <MenuItem as={RouterLink} to="/path">
            Package
          </MenuItem>
        </MenuList>
      </Menu>

      <Link to="/blockusersss">
        <Box>Deactive User</Box>
      </Link>

      <Link to="/qccheck">
        <Box>QC Report</Box>
      </Link>

      <Link to="/">
        <Box>Recovery</Box>
      </Link>

      <Link to="/employees">
        <Box>Employee</Box>
      </Link>

      <Link to="/">
        <Box>System Users</Box>
      </Link>

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
            <MenuItem onClick={handleforgetpassword}>Forget Password</MenuItem>
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
