import React, { useState, useEffect } from "react";
import { Text, Box, Input, Button, Center } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import axios from "axios";
import jsPDF from "jspdf";
import sign from "../../assets/cropto stamp.svg";
import html2canvas from "html2canvas";


function Recovery() {
  const [allUsersData, setAllUsersData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  useEffect(() => {
    setTableData(allUsersData);
  }, [allUsersData]);

  const handleSearch = () => {
    let filteredData = allUsersData.filter((item) => {
      return (
        (!searchText ||
          Object.values(item).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(searchText.toLowerCase())
          )) &&
        (!startDate || new Date(item.selectedDate) >= new Date(startDate)) &&
        (!endDate || new Date(item.selectedDate) <= new Date(endDate))
      );
    });

    setTableData(filteredData);
  };
  useEffect(() => {
    handleSearch(); // Call this function every time searchText, startDate, or endDate changes
  }, [searchText, startDate, endDate, allUsersData]);

  const handleDateChange = (date, id) => {
    const newData = allUsersData.map((item) =>
      item.id === id ? { ...item, selectedDate: date } : item
    );
    setAllUsersData(newData);
  };

  const generatePDF = (name, address, date) => {
    const doc = new jsPDF();


    const content = `Date: ${date}
    
    To,
   
  Client Namer: ${name}
  Address : ${address}

Ref.: Your Loan Agreement Number - 139224722

  Dear Client,

  We would like to thank you for your patronage and we do hope that your experience with us has been a rewarding one. We are pleased to confirm that there are no outstanding dues towards the captioned loan, and the referred loan is fully repaid/adjusted.

  In case your loan has been closed through the process of Pre-payment, the upcoming installment is likely to be presented on the originally scheduled date. This has been also advised in our offer of Foreclosure, requesting you to mark a “Stop Payment”. In the event that installment getting realized upon presentation, the amount thereof will be refunded within 15 working days.

  We will be happy to welcome you back! IDFC FIRST Bank is now one stop solution for all banking needs, be it loans, savings or banking products. Please feel free to call us on 1800-10-888.

  Thank you once again for selecting IDFC FIRST Bank as your preferred partner in helping you accomplish your financial goals.

  Sincerely,
  IDFC FIRST Bank Ltd

  Please note:
  1. Any overwriting/alter would make this document invalid.
  2. Nothing contained herein above shall operate to prejudice the rights and remedies of IDFC FIRST Bank Ltd in respect of any other obligations you may have with IDFC FIRST Bank.

  This is a computer generated letter and does not require signature(s).

  Any unbanked/unused cheques of the Borrower(s) as issued in favour of IDFC FIRST Bank Ltd with regard to the loan and presently in custody of IDFC FIRST Bank Ltd will be cancelled and/or destroyed immediately after closure of the loan either by way of maturity or prepayment of loan and/or otherwise without any further notice.

  IDFC FIRST Bank Limited (formerly IDFC Bank Limited)
  Registered Office: KRM Towers, 7th Floor, No. 1, Harrington Road, Chetpet, Chennai 600031.Tel.: +91 44 4571 6400,
  CIN: L65110TN2014PLC097792, bank.info@idfcfirstbank.com, www.idfcfirstbank.com`;

    // Use splitTextToSize to wrap text within the desired width
    const lines = doc.splitTextToSize(content, 180); // Adjust width to fit your content as needed
    doc.text(lines, 10, 10); // Adjust x, y positions as needed
    doc.save("Cropton-NOC");
  };

 
  


  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Date",
      cell: (row) => (
        <Input
          type="date"
          value={row.selectedDate}
          onChange={(e) => handleDateChange(e.target.value, row.id)}
        />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
        color={"white"}
        bg={"green"}
          onClick={() =>
            generatePDF(
              row.name,
              row.address,
              row.selectedDate || new Date().toLocaleDateString()
            )
          }
        >
          Download NOC
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box mt={["2rem" , "0rem"]}>
        <Center color={"#336600"} fontWeight={800} fontSize="3xl">NOC-Certificate</Center>
      </Box>
      <Box 
      display="flex"
      justifyContent={"center"} 
      textAlign={"center"}
      alignItems={"center"}
      gap="2">
        <Input
        border={"1px solid gray"}
        w={["200px" , "400px"]}
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>
      <DataTable
     
        columns={columns}
        data={tableData}
        pagination
        paginationPerPage={10}
      />
    </>
  );
}

export default Recovery;


