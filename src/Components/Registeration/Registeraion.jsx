import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Box, Center, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { FaPencilAlt } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { FaDownload } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiLinkExternal } from "react-icons/bi";

function Registeraion() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state set to true

  const icons = [FaPencilAlt, TfiReload, FaDownload, FaFile, RiDeleteBin5Fill];
  const iconspending = [
    FaPencilAlt,
    TfiReload,
    BiLinkExternal,
    RiDeleteBin5Fill,
  ];
  const navigate = useNavigate();

  const toast = useToast();
  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/getallclient"
        );
        console.log(response.data.data, "asdasd");
        setFilter(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    getdata();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filter.filter((row) =>
    Object.values(row).some(
      (value) =>
        value && value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const deleteclientinfo = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/user/deleteclient",
        {
          data: {
            id: id,
          },
        }
      );
      console.log(response, "deleted response");
      setFilter(filter.filter((item) => item._id !== id));
      if (response.status) {
        toast({
          title: "Deleted",
          description: "Client Deleted Successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Client Not Deleted",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      console.log(error);
    }
  };

  const emailsending = async (email) => {
    try {
      console.log("email function");
      const response = await axios.post(
        "http://localhost:5000/api/user/sendconfirmmail",
        {
          email: email,
        }
      );
      console.log(response, "email response");

      if (response.status === 200) {
        toast({
          title: "Email Sent",
          description: "Email Sent Successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Email Not Sent",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handledownload = async (id) => {
    try {
      // const response = await axios.get(
      //   `http://localhost:5000/api/user/downloadfile/${id}`,
      //   { responseType: "blob" }
      // );
      // console.log(response, "download response");
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", "file.pdf");
      // document.body.appendChild(link);
      // link.click();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "File Not Downloaded",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleIconClick = (rowData, iconIndex) => {
    // Perform actions based on rowData and iconIndex
    console.log("Clicked on icon:", iconIndex);
    console.log("Row data:", rowData);
    console.log(rowData, "filteredData");

    if (rowData.status === "Active" || rowData.status === "Registered") {
      switch (iconIndex) {
        case 0:
          navigate("/editclient", {
            state: { data: rowData },
          });
          break;
        case 1:
          emailsending(rowData.email);
          break;
        case 2:
          //handledownload(rowData._id);
          navigate("/downloadreport", {
            state: { data: rowData },
          });
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
    } else if (rowData.status === "Pending") {
      switch (iconIndex) {
        // Add your pending logic here
        case 0:
          navigate("/editclient", {
            state: { data: rowData },
          });
          // Perform action for the first icon
          break;
        case 1:
          emailsending(rowData.email);
          break;
        // Perform action for the second icon

        // Add cases for other icons as needed
        case 2:
          navigate("/");
          break;
        case 3:
          deleteclientinfo(rowData._id);
          break;
        default:
          // Handle default case
          break;
      }
    }
  };

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
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Registeration Date",
      selector: (row) => row.registeratonDate?.slice(0, 10),
      sortable: true,
    },
    {
      name: "Plan",
      selector: (row) => row.plan,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Flex>
          {row.status === "Active" || row.status === "Registered"
            ? icons.map((Icon, index) => (
                <Icon
                  key={index}
                  style={{
                    fontSize: "20px",
                    color: "blue",
                    cursor: "pointer",
                    margin: "0 5px",
                  }}
                  onClick={() => handleIconClick(row, index)} // Pass row data and icon index to handleIconClick function
                />
              ))
            : iconspending.map((Icon, index) => (
                <Icon
                  key={index}
                  style={{
                    fontSize: "20px",
                    color: "blue",
                    cursor: "pointer",
                    margin: "0 5px",
                  }}
                  onClick={() => handleIconClick(row, index)} // Pass row data and icon index to handleIconClick function
                />
              ))}
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Flex alignItems="center" justify="space-between">
        <Text fontSize="md">
          All Users 2024-04-04 10:14:54pm || Today Total 22 | Today Done 22
        </Text>

        <Link to="/addclient">
          <Button>Registration</Button>
        </Link>
      </Flex>
      <Center>
        <Box width={{ base: "90vw", md: "70vw" }} overflowX="auto" p={4}>
          <Center mb={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Registrations
            </Text>
          </Center>
          {loading ? ( // Display spinner if loading
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
              data={filteredData} // Use filteredData instead of filter
              pagination
              highlightOnHover
              responsive
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearch}
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
