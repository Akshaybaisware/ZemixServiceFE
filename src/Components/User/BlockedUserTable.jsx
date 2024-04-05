import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Flex, Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Spacer } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

function BlockedUserTable() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Example data
  const data = [
    {
      id: 1,
      name: "John Doe",
      mobile: "123-456-7890",
      email: "john@example.com",
      blockDate: "2023-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      mobile: "987-654-3210",
      email: "jane@example.com",
      blockDate: "2023-02-20",
      status: "Inactive",
    },
    // Add more data as needed
  ];

  // Columns configuration
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
      name: "Block Date",
      selector: (row) => row.blockDate,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  // Function to handle search button click
  const handleSearch = () => {
    // Implement search logic here
    // For simplicity, let's assume searching by name
    // You can modify this according to your requirements
    // Example:
    // const filteredData = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    // Update state or perform any action with filteredData
  };

  return (
    <Box>
      <Flex>
        <Input
          type="date"
          placeholder="From Date (dd-mm-yyyy)"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <Spacer />
        <Input
          type="date"
          placeholder="To Date (dd-mm-yyyy)"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <Spacer />
        <Button onClick={handleSearch}>Search</Button>
      </Flex>

      <Input placeholder="Search" />
      <DataTable
        columns={columns}
        data={data}
        pagination
        // paginationPerPage={5} // Adjust as needed
      />
    </Box>
  );
}

export default BlockedUserTable;
