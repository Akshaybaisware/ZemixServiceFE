import React, { useEffect, useState, useRef } from "react";
import { useToast, Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import axios from "axios";

function ContentValidationfrom() {
  const toast = useToast();

  const userId = localStorage.getItem("userId");

  const [apidata, setapidata] = useState();
  const [randomIndex, setRandomIndex] = useState(null); // State to store the random index

  const name = useRef();
  const mobile = useRef();
  const address = useRef();
  const annualRevenue = useRef();
  const jobFunctional = useRef();
  const pinCode = useRef();

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
      console.log(error.message);
    }
  };

  const submitForm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/assignment/addassignment",
        {
          name: name.current.value,
          phone: mobile.current.value,
          address: address.current.value,
          annualRevenue: annualRevenue.current.value,
          jobFunctional: jobFunctional.current.value,
          pinCode: pinCode.current.value,
          userId: userId,
        }
      );
      console.log(response, "mkninmiopn");
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
          <Text>Mobile: {apidata?.[randomIndex]?.phone}</Text>
          <Text>Address: {apidata?.[randomIndex]?.address}</Text>
          <Text>Annual Revenue: {apidata?.[randomIndex]?.annualRevenue}</Text>
          <Text>Job Functional: {apidata?.[randomIndex]?.jobFunctional}</Text>
          <Text>Pin Code: {apidata?.[randomIndex]?.pinCode}</Text>
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
