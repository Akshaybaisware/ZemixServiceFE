import React from "react";
import { Text, Box, Input, Button } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";

function QcReport() {
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
  ];

  const tableData = [
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

  const handleSearch = () => {
    // Implement search logic here
  };

  return (
    <>
      <Box>
        <Text>Qc Report</Text>
      </Box>
      <Box>
        <Input type="date" />
        <Input type="date" />
        <Button onClick={handleSearch}>Search</Button>
      </Box>
      <Box>
        <Input type="text" placeholder="Search" onChange={handleSearch} />
        <Button onClick={handleSearch}>Search</Button>
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
