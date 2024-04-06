import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Flex, Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Spacer } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

function BlockedUserTable() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const getallfreezuser = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/getallfreez",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const parseRes = await response.json();
      console.log(parseRes.users);
      setData(parseRes.users);
      setFilteredData(parseRes.users); // Initialize filteredData with all data
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getallfreezuser();
  }, []);

  const handleSearch = () => {
    const filteredResults = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filteredResults);
  };

  const handleDateSearch = () => {
    const filteredResults = data.filter((item) => {
      const blockDate = new Date(item.blockDate);
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      return blockDate >= fromDateObj && blockDate <= toDateObj;
    });
    setFilteredData(filteredResults);
  };

  useEffect(() => {
    if (!searchQuery && !fromDate && !toDate) {
      setFilteredData(data); // Reset filteredData if no search or date filter applied
    }
  }, [searchQuery, fromDate, toDate, data]);

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
        <Button onClick={handleDateSearch}>Search By Date</Button>
      </Flex>

      <Input
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <DataTable columns={columns} data={filteredData} pagination />
    </Box>
  );
}

export default BlockedUserTable;
