import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

function ViewDetails() {
  const datafromlocation = useLocation();
  console.log(datafromlocation.state.data, "dadasdfngndgnfdjgn");
  const data = datafromlocation.state.data;
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <VStack spacing={4} align="stretch">
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input value={data.name} type="text" placeholder="Enter your name" />
        </FormControl>

        <FormControl id="mobile">
          <FormLabel>Mobile</FormLabel>
          <Input
            value={data.mobile}
            type="tel"
            placeholder="Enter your mobile number"
          />
        </FormControl>

        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            value={data.email}
            type="email"
            placeholder="Enter your email"
          />
        </FormControl>

        <FormControl id="startDate">
          <FormLabel>Caller Start Date</FormLabel>
          <Input value={data.startDate} type="date" />
        </FormControl>

        <FormControl id="endDate">
          <FormLabel>End Date</FormLabel>
          <Input value={data.endDate} type="date" />
        </FormControl>

        <FormControl id="totalForms">
          <FormLabel>Total Forms</FormLabel>
          <NumberInput min={0} value={data.totalForms}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl id="filledForm">
          <FormLabel>Filled Form</FormLabel>
          <NumberInput min={0} value={data.submittedForms}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl id="rightForm">
          <FormLabel>Right Form</FormLabel>
          <NumberInput value={data.rightForms} min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl id="incorrectForm">
          <FormLabel>Incorrect Form</FormLabel>
          <NumberInput value={data.wrongForms} min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <Button colorScheme="blue" mt={4}>
          Download Report
        </Button>
      </VStack>
    </Box>
  );
}

export default ViewDetails;
