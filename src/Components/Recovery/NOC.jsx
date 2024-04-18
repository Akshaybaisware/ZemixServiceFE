import React, { useState, useEffect, useRef } from "react";
import { Box, Text, Center, Image, Button } from "@chakra-ui/react";
import sign from "../../assets/cropto stamp.svg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

const NOC = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const datafromrecovery = useLocation();
  console.log(datafromrecovery, "location data");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/getallclient"
        );
        // Initialize each user data with a selectedDate property
        const usersWithDate = response?.data?.data.map((user) => ({
          ...user,
          selectedDate: "",
        }));
        setAllUsersData(usersWithDate);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const generatePDF = async () => {
    const input = document.getElementById("noc-content");
    input.scrollIntoView(false);

    // Adjust styles for mobile view
    const isMobile = window.matchMedia(
      "only screen and (max-width: 430px)"
    ).matches;
    if (isMobile) {
      const style = document.createElement("style");
      style.innerHTML = `
        .noc-content {
          font-size: 10px;
        }
        .noc-content h2 {
          font-size: 10px;
        }
        .noc-content .heading {
          font-size: 11px;
        }
        .noc-content .sincerely {
          font-size: 10px;
          position: relative;
          top: -10px;
        }
        .noc-content .signature {
          position: relative;
          top: -50px;
          left: 0;
          width: 100%;
          text-align: center;
        }
      `;
      document.head.appendChild(style);
    }

    // Debounce the function to prevent multiple calls
    const debouncedGeneratePDF = _.debounce(async () => {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");

      const doc = new jsPDF();
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Adjust layout for mobile view
      if (isMobile) {
        const pageHeight = doc.internal.pageSize.getHeight();
        if (pdfHeight > pageHeight) {
          const scaleFactor = pageHeight / pdfHeight;
          const newPdfWidth = pdfWidth * scaleFactor;
          const newPdfHeight = pdfHeight * scaleFactor;
          doc.addPage();
          doc.addImage(
            imgData,
            "PNG",
            0,
            -(pdfHeight - pageHeight),
            newPdfWidth,
            newPdfHeight
          );
        }
      }

      doc.save("noc.pdf");
    }, 500);

    debouncedGeneratePDF();
  };

  return (
    <Box>
      <Box id="noc-content" position="relative">
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
        <Text padding={"2px"} mt={4}>
          Name: {datafromrecovery.state.row.name}
        </Text>
        <Text padding={"2px"} mt={4}>
          Address: {datafromrecovery.state.row.address}
        </Text>
        <Text padding={"2px"} mt={4}>
          Date:{" "}
          {datafromrecovery.state.row.selectedDate ||
            new Date().toLocaleDateString()}
        </Text>

        <Text mt={4}></Text>
        <Box padding={"1rem"}>
          This is to certify that{" "}
          <span style={{ fontWeight: "bold" }}>Cropton Services</span>, located
          at block number: 23 Hanuman Nagar Ajmer Road S.O, Jaipur, 302006, has
          been engaged in data processing services with Cropton Services. <br />
          <br />
          <span style={{ fontWeight: "bold" }}>Cropton Services</span> is
          responsible for inputting provided data field-wise online, adhering to
          guidelines provided by{" "}
          <span style={{ fontWeight: "bold" }}>Cropton Service</span>, with data
          supply and preservation of the output file conducted in real-time.
          Compensation for form-filling services rendered is INR 38 per form,
          contingent upon achieving a cutoff above 450, with invoices raised by
          <br />
          <br />
          Cropton Services and QC reports provided within 72 hours. Cropton
          Services provides a workload of 480 forms over 5 days,
          <br />
          Cropton Services has 5 days, including holidays, to complete the
          workload and submit it, with Cropton Enterprise furnishing an accuracy
          report within 72 hours. Data formats and necessary information are
          provided by Cropton Servicesat the time of data provision. Any
          applicable telecommunication costs are to be borne by the respective
          parties.
        </Box>

        <br />
        <Box bg="brown">.</Box>
        <Text p={"1rem"} mt={4}>
          Sincerely,
          <br />
        </Text>
        <Image width={["50%", "20%"]} src={sign} />
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
          id="cropton-logo"
          fontSize={["10rem", "8rem"]}
          fontWeight="bold"
          color="#ccffe6"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
          transform="rotate(-70deg)" // Rotate text diagonally
          position="absolute" // Position absolutely
          top="25%" // Adjust positioning as needed
          left={["-35%", "20%"]} // Adjust positioning as needed
          zIndex="1000" // Ensure text is below other content
        >
          Cropton
        </Text>
      </Box>
      <Button onClick={generatePDF}>Download</Button>
    </Box>
  );
};

export default NOC;
