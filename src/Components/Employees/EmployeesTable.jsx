import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Input, Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function EmployeesTable() {
  const [data, setdata] = useState([]);
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
      selector: (row) => row.mobile,
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
  const getemployees = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/employee/getallemployee",
        {
          method: "GET",
          headers: {
            "Content-Type": "application",
          },
        }
      );
      const res = await response.json();
      console.log(res);
      setdata(res.employee);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getemployees();
  }, []);
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
