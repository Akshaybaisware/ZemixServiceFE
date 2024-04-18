import React from "react";
import { Box, Text, Center, Image } from "@chakra-ui/react";
import sign from "../../assets/cropto stamp.svg";

const NOC = () => {
  return (
    <Box>
      <Box position="relative">
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
        <Text padding={"1rem"} mt={4}>
          Date: [Date]
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
    </Box>
  );
};

export default NOC;

// import React, { useState, useEffect } from "react";
// import { Box, Text, Center, Image, Input, Button } from "@chakra-ui/react";
// import jsPDF from "jspdf";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import html2canvas from "html2canvas";
// import sign from "../../assets/cropto stamp.svg";

// function NOC() {
//   const [allUsersData, setAllUsersData] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/user/getallclient"
//         );
//         const usersWithDate = response?.data?.data.map((user) => ({
//           ...user,
//           selectedDate: "",
//         }));
//         setAllUsersData(usersWithDate);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const handleSearch = () => {
//       let filteredData = allUsersData.filter((item) => {
//         return (
//           (!searchText ||
//             Object.values(item).some(
//               (value) =>
//                 typeof value === "string" &&
//                 value.toLowerCase().includes(searchText.toLowerCase())
//             )) &&
//           (!startDate || new Date(item.selectedDate) >= new Date(startDate)) &&
//           (!endDate || new Date(item.selectedDate) <= new Date(endDate))
//         );
//       });
//       setTableData(filteredData);
//     };

//     handleSearch();
//   }, [searchText, startDate, endDate, allUsersData]);

//   const handleDateChange = (date, id) => {
//     const newData = allUsersData.map((item) =>
//       item.id === id ? { ...item, selectedDate: date } : item
//     );
//     setAllUsersData(newData);
//   };

//   const generatePDF = (name, address, date) => {
//     const doc = new jsPDF();
//     const content = `
// Date: ${date}

// To Whom It May Concern,

// This document certifies that ${name}, located at ${address}, has no objections regarding the ongoing and past business transactions and interactions up to the date mentioned above. This certificate is issued upon the request of the aforementioned party for whatever purpose it may serve them.

// Details of Engagement:
// - ${name} has been actively participating and complying with all the relevant standards and regulations required by our operations.
// - There has been no record of any regulatory violations or breaches of contract.
// - All financial obligations and dealings have been conducted in a timely and transparent manner.

// Please note that this NOC does not automatically renew and only covers the activities up to the date specified above. It is issued by Cropton Services without any liability on our part regarding future operations of ${name}.

// This is a computer-generated document and does not require a signature.

// Sincerely,

// [Digital Signature Image]

// Cropton Services
// 23 Hanuman Nagar Ajmer Road S.O, Jaipur, 302006
// `;

//     // Use splitTextToSize to ensure the text fits within the PDF
//     const lines = doc.splitTextToSize(content, 180); // Adjust width according to your content needs
//     doc.text(lines, 10, 10); // Adjust the x, y coordinates as necessary
//     doc.addImage(sign, "JPEG", 10, 250, 50, 30); // Adjust signature image placement and size
//     doc.save("Cropton-NOC.pdf");
//   };

//   const columns = [
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Date",
//       cell: (row) => (
//         <Input
//           type="date"
//           value={row.selectedDate}
//           onChange={(e) => handleDateChange(e.target.value, row.id)}
//         />
//       ),
//     },
//     {
//       name: "Action",
//       cell: (row) => (
//         <Button
//           onClick={() =>
//             generatePDF(
//               row.name,
//               row.address,
//               row.selectedDate || new Date().toLocaleDateString()
//             )
//           }
//         >
//           Download NOC
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <Box>
//       <Center>
//         <Text fontSize="xl" fontWeight="bold" color="black">
//           NOC (No-Objection-Certificate)
//         </Text>
//       </Center>
//       <Center>
//         <Input
//           type="text"
//           placeholder="Search"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//         <DataTable
//           columns={columns}
//           data={tableData}
//           pagination
//           paginationPerPage={10}
//         />
//       </Center>
//     </Box>
//   );
// }

// export default NOC;
