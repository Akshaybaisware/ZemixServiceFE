import React, { useEffect, useState } from "react";
import { useToast, Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import axios from "axios";

function ContentValidationfrom() {
  const toast = useToast();

  const [apidata, setapidata] = useState();
  const [randomIndex, setRandomIndex] = useState(null); // State to store the random index

  const getdatafrom = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/assignment/getassignments"
      );
      setapidata(response.data.assignments);
      setRandomIndex(Math.floor(Math.random() * 480)); // Set random index on initial load
    } catch (error) {
      toast({
        title: "Error",
        description: "Error",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const submitForm = async () => {
    try {
      // Implement your form submission logic here
    } catch (error) {
      toast({
        title: "Error",
        description: "Error",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      console.log(error);
    }
  };

  const refreshAssignment = async () => {
    try {
      await getdatafrom(); // Fetch new assignment data
      setRandomIndex(Math.floor(Math.random() * 480)); // Set new random index
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdatafrom();
  }, []);

  return (
    <>
      <Box p="4" border="1px solid #ccc" borderRadius="md" maxW="600px">
        <Flex direction="column">
          <Text>Name: {apidata?.[randomIndex]?.name}</Text>
          <Text>Mobile: {apidata?.[randomIndex]?.mobile}</Text>
          <Text>Address: {apidata?.[randomIndex]?.address}</Text>
          <Text>Annual Revenue: {apidata?.[randomIndex]?.annualRevenue}</Text>
          <Text>Job Functional: {apidata?.[randomIndex]?.jobFunctional}</Text>
          <Text>Pin Code: {apidata?.[randomIndex]?.pinCode}</Text>
        </Flex>
      </Box>

      <Box p="4" border="1px solid #ccc" borderRadius="md" maxW="600px">
        <Flex direction="column">
          <Text>Name:</Text>
          <Input />
          <Text>Mobile:</Text>
          <Input />
          <Text>Address:</Text>
          <Input />
          <Text>Annual Revenue:</Text>
          <Input />
          <Text>Job Functional:</Text>
          <Input />
          <Text>Pin Code:</Text>
          <Input />

          <Button onClick={submitForm}>Submit</Button>
        </Flex>
      </Box>
      <Button onClick={refreshAssignment}>Refresh</Button>
    </>
  );
}

export default ContentValidationfrom;
