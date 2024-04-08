import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  Input,
  Center,
  Textarea,
  FormControl,
  FormLabel,
  Box,
  Button,
} from "@chakra-ui/react";

const EditClientComponent = () => {
  const location = useLocation();
  const toast = useToast();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    otp: "",
    name: "",
    address: "",
    email: "",
    mobileNo: "",
    startDate: "",
    endDate: "",
    caller: "",
  });

  // Extracting data from location.state if available
  const rowData = location.state?.data;

  // Function to update state when rowData is available
  useEffect(() => {
    if (rowData) {
      setUserData(rowData);
    }
  }, [rowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract user ID from the URL parameter
    // console.log(rawData, "asdasds");
    console.log(userData, "asdas");
    const userId = userData._id;

    // Send PUT request to update user details
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/edituser/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        // Handle success
        toast({
          title: "User details updated successfully!",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        console.log("User details updated successfully!");
      } else {
        // Handle error
        toast({
          title: "Failed to update user details",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        console.error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Center>Edit Client</Center>
      <Box maxW="600px" mx="auto" mt="4">
        <form onSubmit={handleSubmit}>
          <FormControl mb="4">
            <FormLabel>User Name</FormLabel>
            <Input
              type="text"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              placeholder="User Name"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>OTP</FormLabel>
            <Input
              type="text"
              name="otp"
              value={userData.otp}
              onChange={handleChange}
              placeholder="OTP"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Address</FormLabel>
            <Textarea
              name="address"
              value={userData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Mobile No</FormLabel>
            <Input
              type="tel"
              name="mobileNo"
              value={userData.mobileNo}
              onChange={handleChange}
              placeholder="Mobile No"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Start Date</FormLabel>
            <Input
              type="date"
              name="startDate"
              value={userData.startDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>End Date</FormLabel>
            <Input
              type="date"
              name="endDate"
              value={userData.endDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Caller</FormLabel>
            <Input
              type="text"
              name="caller"
              value={userData.caller}
              onChange={handleChange}
              placeholder="Caller"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default EditClientComponent;
