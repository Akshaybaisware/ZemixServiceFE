// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { Button, Input, Box } from "@chakra-ui/react";
// import { Text } from "@chakra-ui/react";
// import { Link } from "react-router-dom";

// function EmployeesTable() {
//   const [data, setdata] = useState([]);
//   const coloums = [
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Designation",
//       selector: (row) => row.designation,
//       sortable: true,
//     },
//     {
//       name: "MobileNo",
//       selector: (row) => row.mobile,
//       sortable: true,
//     },
//     {
//       name: "Branch",
//       selector: (row) => row.branch,
//       sortable: true,
//     },
//     {
//       name: "Address",
//       selector: (row) => row.address,
//       sortable: true,
//     },
//   ];
//   const getemployees = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/employee/getallemployee",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application",
//           },
//         }
//       );
//       const res = await response.json();
//       console.log(res);
//       setdata(res.employee);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getemployees();
//   }, []);
//   return (
//     <>
//       <Box>
//         <center>
//          <Text fontSize={"2rem"} fontWeight={"700"}>Employees</Text>
//           </center>
//         <Link to="/addemployees">
//           <Box display={"flex"} justifyContent={"flex-end"}>
//           <Button bg={"peachpuff"} >+ Add Employees</Button>
//           </Box>
//         </Link>
//       </Box>
//       <Input placeholder="Search" />
//       <DataTable columns={coloums} data={data} pagination />
//     </>
//   );
// }

// export default EmployeesTable;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Input, Box, Flex, Text, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function EmployeesTable() {
  const [data, setData] = useState([]);
  const columns = [
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

  const getEmployees = async () => {
    try {
      const response = await fetch(
        "https://zemixbe.onrender.com/api/employee/getallemployee",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      setData(res.employee);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Center>
      <Box w="80%" p="4">
        <Flex justifyContent="space-between" alignItems="center" mb="4">
          <Text fontSize="2rem" fontWeight="700">
            Employees
          </Text>
          <Link to="/addemployees">
            <Button color={"white"} bg="blue">
              + Add Employees
            </Button>
          </Link>
        </Flex>
        <Input placeholder="Search" mb="4" />
        <DataTable columns={columns} data={data} pagination />
      </Box>
    </Center>
  );
}

export default EmployeesTable;
