import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Box, Center, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";

function Package() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: "Plan Name",
      selector: (row) => row.planName,
      sortable: true,
    },
    {
      name: "No. of Forms",
      selector: (row) => row.numberOfForms,
      sortable: true,
    },
    {
      name: "Plan Duration",
      selector: (row) => row.planDuration,
      sortable: true,
    },
  ];

  const dummyData = [
    {
      id: 1,
      planName: "Basic Plan",
      numberOfForms: 10,
      planDuration: "1 month",
    },
    {
      id: 2,
      planName: "Premium Plan",
      numberOfForms: 20,
      planDuration: "3 months",
    },
    {
      id: 3,
      planName: "Enterprise Plan",
      numberOfForms: 50,
      planDuration: "6 months",
    },
  ];

  return (
    <>
      <Flex alignItems="center" justify="space-between">
        <Text fontSize="md">Packages</Text>

        <Link to="/add-package">
          <Button colorScheme="blue">Add Package</Button>
        </Link>
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
              data={dummyData}
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

export default Package;
