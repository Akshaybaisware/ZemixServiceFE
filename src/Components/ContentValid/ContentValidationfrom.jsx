import React, { useEffect, useState } from "react";
import { useToast, Box, Flex, Text, Input } from "@chakra-ui/react";
import axios from "axios";

function ContentValidationfrom() {
  const toast = useToast();

  const [apidata, setapidata] = useState();

  const getdatafrom = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/assignment/getassignments"
      );
      setapidata(response.data.assignments);
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
  const submitform = async () => {
    try {
      const response = await axios.post();
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
      return;
    }
  };
  useEffect(() => {
    getdatafrom();
  }, []);

  let rendomindex = Math.floor(Math.random() * 480);

  return (
    <>
      <Box p="4" border="1px solid #ccc" borderRadius="md" maxW="600px">
        <Flex direction="column">
          <Text>Name: {apidata?.[rendomindex]?.name}</Text>
          <Text>Mobile: {apidata?.[rendomindex]?.mobile}</Text>
          <Text>Address: {apidata?.[rendomindex]?.address}</Text>
          <Text>Annual Revenue: {apidata?.[rendomindex]?.annualRevenue}</Text>
          <Text>Job Functional: {apidata?.[rendomindex]?.jobFunctional}</Text>
          <Text>Pin Code: {apidata?.[rendomindex]?.pinCode}</Text>
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

          <Button onClick={submitform}>Submit</Button>
        </Flex>
      </Box>
    </>
  );
}

export default ContentValidationfrom;
