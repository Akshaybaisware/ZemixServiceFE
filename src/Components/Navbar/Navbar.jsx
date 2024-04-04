import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Dataentry from "../../assets/ZEMEX LOGO.png";
import { useState } from "react";
import axios from "axios";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
    </Flex>
  );
}

export default Navbar;
