import React from "react";
import { Box, Text, Center, Image } from "@chakra-ui/react";
import sign from "../../assets/cropto stamp.svg";

const NOC = () => {
  return (
    <Box >
      <Box  position="relative">
      <Center>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="Black"
            // textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
          
          >

            NOC(NO-OBJECTION-CERTIFICATE)
          </Text>
        </Center>
      

        <Center>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="red.500"
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
          
          >

            Cropton Services
          </Text>
        </Center>
        <Box bg="brown">.</Box>
        <Text padding={"1rem"}  mt={4}>
          Date: [Date]
        </Text>
        <Text mt={4}>
        
        </Text>
        <Box padding={"1rem"}>
  This is to certify that <span style={{ fontWeight: "bold" }}>Cropton Services</span>, located at block number: 23 Hanuman Nagar Ajmer Road S.O, Jaipur, 302006, has been engaged 
  in data processing services with Cropton Services.   <br /><br /><span style={{ fontWeight: "bold" }}>Cropton Services</span> is responsible for inputting provided data field-wise online, 
  adhering to guidelines provided by <span style={{ fontWeight: "bold" }}>Cropton Service</span>, with data supply and preservation of the output file conducted in real-time. 
  Compensation for form-filling services rendered is INR 38 per form, contingent upon achieving a cutoff above 450, with invoices raised by 
  <br /><br />Cropton Services and QC reports provided within 72 hours. Cropton Services provides a workload of 480 forms over 5 days,
  <br />Cropton Services has 5 days, including holidays,
  to complete the workload and submit it, with Cropton Enterprise furnishing an accuracy report within 72 hours. 
  Data formats and necessary information are provided by Cropton Servicesat the time of data provision. 
  Any applicable telecommunication costs are to be borne by the respective parties.
</Box>

        <br />
        <Box bg="brown">.</Box>
        <Text p={"1rem"} mt={4}>
          Sincerely,
          <br />
        </Text>
        <Image width={["50%" , "20%"]} src={sign} />
      </Box>
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="0"
        opacity="0.5"
        boxShadow="inset 0 0 10px rgba(0, 0, 0, 0.5)" // Apply shadow effect to the entire content
      >
        <Text
          fontSize={["10rem" , "8rem"]}
          fontWeight="bold"
          color="#ccffe6"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
          transform="rotate(-70deg)" // Rotate text diagonally
          position="absolute" // Position absolutely
          top="25%" // Adjust positioning as needed
          left={["-35%" , "20%"]} // Adjust positioning as needed
          zIndex="1000" // Ensure text is below other content
        >
          Cropton
        </Text>
   
      </Box>
    </Box>
  );
};

export default NOC;
