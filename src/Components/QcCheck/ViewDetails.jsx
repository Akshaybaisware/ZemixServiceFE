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
import jsPDF from "jspdf";

function ViewDetails() {
  const datafromlocation = useLocation();
  console.log(datafromlocation.state.data, "dadasdfngndgnfdjgn");
  const data = datafromlocation.state.data;

  const downloadReport = () => {
    const pdf = new jsPDF();

    // Starting positions
    let startX = 20;
    let startY = 30;
    const rowHeight = 10;
    const colWidth = 80; // Width of each column

    // Add header
    pdf.setFontSize(16);
    pdf.text("User Details Report", 20, 20);

    // Helper function to add row
    const addRow = (label, value, x, y) => {
      pdf.setFontSize(12);
      pdf.text(label, x, y); // Label in column 1
      pdf.text(String(value), x + 50, y); // Value in column 2
    };

    // Add data
    addRow("Name:", data.name, startX, startY);
    addRow("Mobile:", data.mobile, startX, startY + rowHeight);
    addRow("Email:", data.email, startX, startY + 2 * rowHeight);
    addRow("Start Date:", data.startDate, startX, startY + 3 * rowHeight);
    addRow("End Date:", data.endDate, startX, startY + 4 * rowHeight);
    addRow("Total Forms:", data.totalForms, startX, startY + 5 * rowHeight);
    addRow(
      "Filled Forms:",
      data.submittedForms,
      startX,
      startY + 6 * rowHeight
    );
    addRow("Correct Forms:", data.rightForms, startX, startY + 7 * rowHeight);
    addRow(
      "Incorrect Forms:",
      data.wrongForms || "0",
      startX,
      startY + 8 * rowHeight
    );

    pdf.save(`Report_${data.name}.pdf`);
  };
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

        <Box p={5} shadow="md" borderWidth="1px">
          <VStack spacing={4} align="stretch">
            {/* Existing form controls */}
            {/* Button to trigger PDF download */}
            <Button colorScheme="blue" onClick={downloadReport}>
              Download PDF
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}

export default ViewDetails;
