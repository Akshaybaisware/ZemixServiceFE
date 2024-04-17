import React, { useEffect, useState, useRef } from "react";
import { useToast, Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContentValidationfrom() {
  const toast = useToast();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [apidata, setapidata] = useState();
  const [randomIndex, setRandomIndex] = useState(null); // State to store the random index

  const name = useRef();
  const mobile = useRef();
  const address = useRef();
  const annualRevenue = useRef();
  const jobFunctional = useRef();
  const pinCode = useRef();
  const refreshAssignment = async () => {
    try {
      await getdatafrom(); // Fetch new assignment data
      setRandomIndex(Math.floor(Math.random() * 480)); // Set new random index
    } catch (error) {
      console.log(error);
    }
  };

  const getdatafrom = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/assignment/getassignments"
        // {
        //   userId: userId,
        // }
      );
      setapidata(response?.data?.assignments);
      setRandomIndex(Math.floor(Math.random() * 480));
    } catch (error) {
      toast({
        title: "Error ",
        description: "Error",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      console.log(error.message);
    }
  };

  const submitForm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/assignment/addassignment",
        {
          userId: userId,
        }
      );
      console.log(response, "mkninmiopn");
      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Form submitted successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        refreshAssignment();
        navigate("/");
        // Refresh the assignment data after submission
      }
    } catch (error) {
      toast({
        title: "Error ",
        description: `error: ${error.message}`,
        status: "error",
        duration: 10000,
        position: "top",
        isClosable: true,
      });
      console.log(error.message);
    }

    //navigate("/");
    //refreshAssignment(); // Refresh the assignment data after submission
  };

  useEffect(() => {
    getdatafrom();
  }, []);

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Whisper&display=swap')
      </style>
      <Box p="4" border="1px solid #ccc" borderRadius="md" maxW="600px">
        <Flex direction="column" fontFamily="'Dancing Script', cursive">
          <Text fontSize={"2rem"}>Name: {apidata?.[randomIndex]?.name}</Text>
          <Text fontSize={"2rem"}>Mobile: {apidata?.[randomIndex]?.phone}</Text>
          <Text fontSize={"2rem"}>
            Address: {apidata?.[randomIndex]?.address}
          </Text>
          <Text fontSize={"2rem"}>
            Annual Revenue: {apidata?.[randomIndex]?.annualRevenue}
          </Text>
          <Text fontSize={"2rem"}>
            Job Functional: {apidata?.[randomIndex]?.jobFunctional}
          </Text>
          <Text fontSize={"2rem"}>
            Pin Code: {apidata?.[randomIndex]?.pinCode}
          </Text>
        </Flex>
      </Box>

      <Box p="4" border="1px solid #ccc" borderRadius="md" maxW="600px">
        <Flex direction="column">
          <Text>Name:</Text>
          <Input ref={name} />
          <Text>Mobile:</Text>
          <Input ref={mobile} />
          <Text>Address:</Text>
          <Input ref={address} />
          <Text>Annual Revenue:</Text>
          <Input ref={annualRevenue} />
          <Text>Job Functional:</Text>
          <Input ref={jobFunctional} />
          <Text>Pin Code:</Text>
          <Input ref={pinCode} />

          <Button onClick={submitForm}>Submit</Button>
        </Flex>
      </Box>
      <Button onClick={refreshAssignment}>Refresh</Button>
    </>
  );
}

export default ContentValidationfrom;
