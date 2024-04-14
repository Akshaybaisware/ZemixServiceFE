import React, { useLayoutEffect } from "react";
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
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import jsPDF from "jspdf";

function QcReport() {
  const icons = [FaPencilAlt, FaEye, FaRupeeSign];
  const navigate = useNavigate();
  const [allusersdata, setAllusersData] = useState();
  const toast = useToast();
  const [incorrectAssignments, setIncorrectAssignments] = useState({});

  const handleIconClick = (rowData, iconIndex) => {
    // Perform actions based on rowData and iconIndex
    console.log("Clicked on icon:", iconIndex);
    console.log("Row data:", rowData);
    console.log(rowData, "filteredData");

    if (true) {
      switch (iconIndex) {
        case 0:
          navigate("/editclient", {
            state: { data: rowData },
          });
          break;
        case 1:
          navigate("/downloadreport", {
            state: { data: rowData },
          });

          break;
        case 2:
          //handledownload(rowData._id);
          emailsending(rowData?.email);
          break;
        case 3:
          navigate("/downloadreport", {
            state: { data: rowData },
          });
          break;
        case 4:
          deleteclientinfo(rowData?._id);
          break;
        default:
          // Handle default case
          break;
      }
    }
  };

  // const handleviewdetails = (rowdata) => {
  //   console.log(rowdata, "rowdata");
  //   navigate("/viewdetails", {});
  // };
  function handleViewDetails(rowData) {
    return () => {
      console.log(rowData, "rowData");
      navigate("/viewdetails", {
        state: { data: rowData },
      });
    };
  }

  const downloadReport = async (data) => {
    console.log(data, "data received for report");
    const pdf = new jsPDF({
      orientation: "landscape",
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/assignment/getassignments",
        { userId: data._id }
      );
      console.log(response.data, "Assignments data");

      let startX = 20;
      let startY = 30;
      const rowHeight = 20;
      const colWidth = 90;
      const pageHeight = pdf.internal.pageSize.height; // Get the page height

      pdf.setFontSize(16);
      pdf.text("User Details Report", startX, 20);

      // Function to add row with automatic new page handling
      const addRow = (label, value, x, y) => {
        if (y > pageHeight - 40) {
          // Check if y exceeds the page height minus some margin
          pdf.addPage(); // Add a new page
          y = 30; // Reset y position to the top of the new page
        }
        pdf.setFontSize(12);
        pdf.text(`${label}: ${value || "Not provided"}`, x, y);
        return y + rowHeight; // Increment y for the next row
      };

      let column1X = startX;
      let column2X = startX + colWidth + 40;

      startY = addRow("Name", data?.name, column1X, startY);
      startY = addRow("Mobile", data?.mobile, column2X, startY - rowHeight); // Adjust y for column continuity
      startY = addRow("Email", data?.email, column1X, startY);
      startY = addRow(
        "Start Date",
        data?.startDate?.slice(0, 10),
        column2X,
        startY - rowHeight
      );
      startY = addRow(
        "End Date",
        data?.endDate?.slice(0, 10),
        column1X,
        startY
      );
      startY = addRow(
        "Total Forms",
        data?.totalAssignmentLimit,
        column2X,
        startY - rowHeight
      );
      startY = addRow(
        "Filled Forms",
        data?.submittedAssignmentCount,
        column1X,
        startY
      );
      startY = addRow(
        "Correct Forms",
        data?.rightForms,
        column2X,
        startY - rowHeight
      );
      startY = addRow(
        "Incorrect Forms",
        data?.wrongForms || "0",
        column1X,
        startY
      );

      if (startY > pageHeight - 40) {
        pdf.addPage();
        startY = 30;
      }
      pdf.setFontSize(16);
      pdf.text("Assignments:", startX, startY);
      startY += rowHeight;

      response.data.assignments.forEach((assignment, index) => {
        if (startY > pageHeight - 40) {
          pdf.addPage();
          startY = 30;
        }
        startY = addRow(`Name`, assignment.name, startX, startY);
        startY = addRow(`Address`, assignment.address, startX, startY);
        startY = addRow(`Pin Code`, assignment.pinCode, startX, startY);
        startY = addRow(
          `Job Functional`,
          assignment.jobFunctional,
          startX,
          startY
        );
        startY = addRow(`Phone`, assignment.phone, startX, startY);
        startY = addRow(
          `Annual Revenue`,
          assignment.annualRevenue,
          startX,
          startY
        );
      });

      pdf.save(`Report_${data?.name}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };

  // Assuming you have startDate and endDate states as well

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

  const getincorrectassignments = async (userId) => {
    try {
      console.log(userId, "incorreet");
      const response = await axios.post(
        "http://localhost:5000/api/user/getreportbyid",
        {
          id: userId,
        }
      );
      console.log(response);
      //setIncorrectAssignments((prevState) => ({
      //  ...prevState,
      //  [userId]: response.data.incorrectAssignments,
      //}));
    } catch (error) {
      toast({
        title: "Error",
        description: "Please Submit All Forms ",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useLayoutEffect(() => {
    qcdata();
    qcreportdata();
  }, []);

  //useEffect(() => {
  //getincorrectassignments();
  //}, []);

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
      cell: (row) =>
        row?.incorrectAssignmentCount ? row?.incorrectAssignmentCount : 0,
    },
    {
      name: "Right Forms",
      selector: (row) =>
        row?.correctAssignmentCount ? row?.correctAssignmentCount : 0,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          onClick={() => {
            if (row.submittedAssignmentCount === 480) {
              downloadReport(row);
              toast({
                title: "Success",
                description: "Pdf Downloading",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            } else {
              toast({
                title: "Error",
                description: "Please Submit All Forms ",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            }
          }}
        >
          Download Pdf
        </Button>
      ),
    },
  ];

  // Function to handle text and date filtering
  const handleSearch = () => {
    let filteredData = [...allusersdata];

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

  useEffect(() => {
    handleSearch();
  }, [searchText, startDate, endDate, allusersdata]);

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

export default QcReport;
