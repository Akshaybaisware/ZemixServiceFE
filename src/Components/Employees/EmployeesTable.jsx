import React from "react";
import DataTable from "react-data-table-component";
import { Button, Input, Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function EmployeesTable() {
  const coloums = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
    },
    {
      name: "MobileNo",
      selector: (row) => row.mobileNo,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row.branch,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
  ];
  const data = [
    {
      name: "John Doe",
      designation: "Manager",
      mobileNo: "123-456-7890",
      branch: "Main Branch",
      address: "123 Main Street, Cityville",
    },
    {
      name: "Jane Smith",
      designation: "Assistant Manager",
      mobileNo: "987-654-3210",
      branch: "Branch 1",
      address: "456 Elm Street, Townsville",
    },
  ];
  return (
    <>
      <Box>
        <Text>Employees</Text>
        <Link to="/addemployees">
          <Button>+ Add Employees</Button>
        </Link>
      </Box>
      <Input placeholder="Search" />
      <DataTable columns={coloums} data={data} pagination />
    </>
  );
}

export default EmployeesTable;
