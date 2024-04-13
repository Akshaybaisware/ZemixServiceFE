import React, { useRef } from "react";
import { Text, Box, Input, Button, Flex } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { FaDownload } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiLinkExternal } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

function Recovery() {
  const [allusersdata, setAllusersData] = useState();
  const [tableData, setTableData] = useState(allusersdata);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const userId = localStorage.getItem("userId");
  const qcdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/getallclient"
      );
      console.log(response?.data?.data, "response");
      setAllusersData(response?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const qcreportdata = async () => {
    try {
      const reposne = await axios.post(
        "http://localhost:5000/api/assignment/getassignments",
        { userId: userId }
      );
      console.log(reposne, "jasdbasjkdbaksjb");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    qcdata();
    qcreportdata();
  }, []);

  const handleSearch = () => {
    let filteredData = allusersdata;

    if (searchText) {
      filteredData = filteredData.filter((item) =>
        Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredData = filteredData.filter((item) => {
        const itemStartDate = new Date(item.startDate);
        const itemEndDate = new Date(item.endDate);
        return itemStartDate >= start && itemEndDate <= end;
      });
    }

    setTableData(filteredData);
  };

  const dateforrecovery = useRef();
  const generatePDF = (name, address, date) => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Set the content of the PDF using template literals to insert dynamic data
    const content = `
  ${date}
  To,
  Name of the Borrower: ${name}
  Address of the Borrower: ${address}
  Ref.: Your Loan Agreement Number - 139224722

  Dear Customer,

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

    // Add text to PDF
    doc.text(content, 10, 10);

    // Save the PDF
    doc.save("LoanClosureConfirmation.pdf");
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row?.mobile,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row?.startDate?.slice(0, 10),
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row?.endDate?.slice(0, 10),
      sortable: true,
    },
    {
      name: "Total Forms",
      selector: (row) => row?.totalAssignmentLimit,
      sortable: true,
    },
    {
      name: "Saved Forms",
      selector: (row) => row?.submittedAssignmentCount,
      sortable: true,
    },
    {
      name: "Submitted Forms",
      selector: (row) => row?.submittedAssignmentCount,
      sortable: true,
    },
    {
      name: "Wrong Forms",
      selector: (row) => row?.wrongForms,
      sortable: true,
    },
    {
      name: "Right Forms",
      selector: (row) => row?.rightForms,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => <Input ref={dateforrecovery} type="date" />,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          onClick={
            () =>
              generatePDF(row.name, row?.address, dateforrecovery.current.value)
            // handleViewDetails(row)
          }
        >
          Download Pdf{" "}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Text>QC Report</Text>
      </Box>
      <Box display="flex" gap="2">
        <Input type="date" onChange={(e) => setStartDate(e.target.value)} />
        <Input type="date" onChange={(e) => setEndDate(e.target.value)} />
        <Button onClick={handleSearch}>Search Dates</Button>
      </Box>
      <Box display="flex" gap="2">
        <Input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button onClick={handleSearch}>Search Text</Button>
      </Box>
      <DataTable
        title="QC Reports"
        columns={columns}
        data={allusersdata}
        pagination
        paginationPerPage={10}
      />
    </>
  );
}

export default Recovery;
