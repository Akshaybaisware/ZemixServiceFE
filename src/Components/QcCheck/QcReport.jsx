import React from "react";
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

function QcReport() {
  const icons = [FaPencilAlt, FaEye, FaRupeeSign];
  const navigate = useNavigate();

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
          emailsending(rowData.email);
          break;
        case 3:
          navigate("/downloadreport", {
            state: { data: rowData },
          });
          break;
        case 4:
          deleteclientinfo(rowData._id);
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
      name: "Start Date",
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
      sortable: true,
    },
    {
      name: "Total Forms",
      selector: (row) => row.totalForms,
      sortable: true,
    },
    {
      name: "Saved Forms",
      selector: (row) => row.savedForms,
      sortable: true,
    },
    {
      name: "Submitted Forms",
      selector: (row) => row.submittedForms,
      sortable: true,
    },
    {
      name: "Wrong Forms",
      selector: (row) => row.wrongForms,
      sortable: true,
    },
    {
      name: "Right Forms",
      selector: (row) => row.rightForms,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button onClick={handleViewDetails(row)}>View Details</Button>
      ),
    },
  ];

  const initialData = [
    {
      name: "Alex Johnson",
      mobile: "9876543210",
      email: "alex.johnson@example.com",
      startDate: "2024-01-10",
      endDate: "2024-03-10",
      totalForms: 120,
      savedForms: 100,
      submittedForms: 95,
      wrongForms: 5,
      rightForms: 90,
    },
    {
      name: "Maria Garcia",
      mobile: "8765432190",
      email: "maria.garcia@example.com",
      startDate: "2024-02-01",
      endDate: "2024-04-01",
      totalForms: 150,
      savedForms: 140,
      submittedForms: 130,
      wrongForms: 10,
      rightForms: 120,
    },
    {
      name: "David Smith",
      mobile: "7654321980",
      email: "david.smith@example.com",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      totalForms: 200,
      savedForms: 180,
      submittedForms: 170,
      wrongForms: 15,
      rightForms: 155,
    },
    {
      name: "Sarah Brown",
      mobile: "6543219870",
      email: "sarah.brown@example.com",
      startDate: "2024-02-20",
      endDate: "2024-04-20",
      totalForms: 90,
      savedForms: 85,
      submittedForms: 80,
      wrongForms: 2,
      rightForms: 78,
    },
    {
      name: "Christopher Davis",
      mobile: "5432198760",
      email: "chris.davis@example.com",
      startDate: "2024-03-01",
      endDate: "2024-05-01",
      totalForms: 110,
      savedForms: 105,
      submittedForms: 100,
      wrongForms: 3,
      rightForms: 97,
    },
  ];

  const [tableData, setTableData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to handle text and date filtering
  const handleSearch = () => {
    let filteredData = initialData;

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
        data={tableData}
        pagination
        paginationPerPage={10}
      />
    </>
  );
}

export default QcReport;
