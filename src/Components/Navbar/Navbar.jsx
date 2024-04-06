import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const toast = useToast();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const confirmpass = useRef(null);
  const newpass = useRef(null);

  const handleForgetPassword = () => {
    setShowModal(true);
  };

  const userString = localStorage.getItem("user"); // Retrieve the user object as a string from localStorage
  const user = JSON.parse(userString);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPasswordValue = newpass.current.value;
    const confirmPasswordValue = confirmpass.current.value;

    if (newPasswordValue !== confirmPasswordValue) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/user/changePassword", {
        newPassword: newPasswordValue,
      });

      setSuccessMessage(response.data.message);
      setErrorMessage("");
      console.log(response, "response");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error changing password");
    }
  };

  const handleForgetPasswordSubmit = async (e) => {
    e.preventDefault();
    const newPasswordValue = newpass.current.value;
    const confirmPasswordValue = confirmpass.current.value;

    if (newPasswordValue !== confirmPasswordValue) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/forgetpassword",
        {
          newPassword: newPasswordValue,
          confirmPassword: confirmPasswordValue,
          userEmail: user.email,
        }
      );

      // setSuccessMessage(response.data.message);
      // setErrorMessage("");

      console.log(response, "response");

      toast({
        title: "Password changed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Error changing password");
      toast({
        title: "Error changing password",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    handleForgetPasswordSubmit();
  }, []);

  return (
    <>
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
            <MenuItem as={RouterLink} to="/package">
              Package
            </MenuItem>
          </MenuList>
        </Menu>

        <Link to="/blockusersss">
          <Box>Deactivate User</Box>
        </Link>

        <Link to="/qccheck">
          <Box>QC Report</Box>
        </Link>

        <Link to="/recovery">
          <Box>Recovery</Box>
        </Link>

        <Link to="/employees">
          <Box>Employee</Box>
        </Link>

        <Link to="/systemusers">
          <Box>System Users</Box>
        </Link>

        <Box
          display="flex"
          flexDirection={{ xs: "row", md: "column" }}
          alignItems="center"
          textAlign="center"
          marginRight={{ xs: 0, md: "1rem" }}
        >
          <Menu>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Avatar
                borderRadius="50%"
                src="Avatarimage.jpg"
                cursor="pointer"
              />
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
              />
            </Box>
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem onClick={handleForgetPassword}>
                Forget Password
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forget Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleForgetPasswordSubmit}>
              <Box mb={4}>
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  ref={newpass}
                  // onChange={(e) => setNewPassword(e.target.value)}
                />
              </Box>
              <Box mb={4}>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  ref={confirmpass}
                  // onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Box>
              <Button type="submit">Submit</Button>
              {errorMessage && <Box color="red">{errorMessage}</Box>}
              {successMessage && <Box color="green">{successMessage}</Box>}
            </form>
          </ModalBody>
          <ModalFooter>{/* Additional footer content if needed */}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Navbar;
