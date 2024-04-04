import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Box, Center, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";

function Registeraion() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy data
  const data = [
    {
      id: 1,
      name: "John Doe",
      mobileNo: "123-456-7890",
      email: "john.doe@example.com",
      registrationDate: "2024-04-01",
      startDate: "2024-04-10",
      caller: "Jane Smith",
      loginStatus: "Logged In",
      status: "Active",
      controllers: "Controller 1, Controller 2",
    },
    {
      id: 2,
      name: "Alice Johnson",
      mobileNo: "987-654-3210",
      email: "alice.johnson@example.com",
      registrationDate: "2024-04-02",
      startDate: "2024-04-11",
      caller: "Bob Brown",
      loginStatus: "Logged Out",
      status: "Inactive",
      controllers: "Controller 3",
    },
    // Add more dummy data objects as needed
  ];

  useEffect(() => {
    setLoading(true);
    // Simulating asynchronous data fetching
    setTimeout(() => {
      // Filtering data based on search input
      const filteredData = data.filter((row) =>
        Object.values(row).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
      setFilter(filteredData);
      setLoading(false);
    }, 1000); // Adjust the timeout as needed
  }, [search]);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobileNo,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Registration Date",
      selector: (row) => row.registrationDate,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: "Caller",
      selector: (row) => row.caller,
      sortable: true,
    },
    {
      name: "Login Status",
      selector: (row) => row.loginStatus,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Controllers",
      selector: (row) => row.controllers,
      sortable: true,
    },
  ];

  return (
    <>
      <Flex alignItems="center" justify="space-between">
        <Text fontSize="md">
          All Users 2024-04-04 10:14:54pm || Today Total 22 | Today Done 22
        </Text>
        <Button>
          <Link to="/registeration">Registration</Link>
        </Button>
      </Flex>
      <Center>
        <Box width={{ base: "90vw", md: "70vw" }} overflowX="auto" p={4}>
          <Center mb={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Registrations
            </Text>
          </Center>
          {loading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <DataTable
              columns={columns}
              data={filter}
              selectableRows
              pagination
              highlightOnHover
              responsive
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    border: "1px solid gray",
                    borderRadius: "15px",
                    padding: "10px",
                    paddingLeft: "15px",
                    width: "100%",
                  }}
                />
              }
            />
          )}
        </Box>
      </Center>
    </>
  );
}

export default Registeraion;
