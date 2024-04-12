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
import axios from "axios";

function QcReport() {
  const icons = [FaPencilAlt, FaEye, FaRupeeSign];
  const navigate = useNavigate();
  const [allusersdata, setAllusersData] = useState();

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
      selector: (row) => row.totalAssignmentLimit,
      sortable: true,
    },
    {
      name: "Saved Forms",
      selector: (row) => row.submittedAssignmentCount,
      sortable: true,
    },
    {
      name: "Submitted Forms",
      selector: (row) => row.submittedAssignmentCount,
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

  const [tableData, setTableData] = useState(allusersdata);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const qcdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/getallclient"
      );
      console.log(response.data.data, "response");
      setAllusersData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    qcdata();
  }, []);
  // Function to handle text and date filtering
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

export default QcReport;
