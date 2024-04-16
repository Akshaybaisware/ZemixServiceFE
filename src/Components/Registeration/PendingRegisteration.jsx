import React, { useState, useEffect } from "react";
import { Box, Center, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import DataTable from "react-data-table-component";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

import { BiSolidPhoneCall } from "react-icons/bi";
import { TbReload } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";

function PendingRegisteration() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [dependancy, setDependeancy] = useState();
  const [deletedependency, setDeletedependance] = useState();

  const iconsarray = [BiSolidPhoneCall, TbReload, IoIosClose];
  const [pendinglist, setPendinglist] = useState();
  const emailsendingpassword = async (id) => {
    try {
      console.log(id, "asdasdasd");
      const reponse = await axios.post(
        "http://localhost:5000/api/user/senduserinfo",
        {
          userID: id,
        }
      );
      console.log(reponse, "email response");
    } catch (error) {
      console.log(error.messgae);
    }
  };
  const deleteclientinfo = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/deleteclient",
        {
          id: id,
        }
      );
      console.log(response, "deleted response");
      // setFilter(filter.filter((item) => item._id !== id));
      if (response.status === 200) {
        toast({
          title: "Deleted Sucessfullty ",
          description: "Deleted  Successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        setDeletedependance(response);
        return response;
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

  const handleAction = async (row, index) => {
    if (index === 0) {
      console.log(row);
      const id = row._id;
      try {
        const res = await deleteclientinfo(id);
        console.log(res, "response after deletion");
        setDependeancy(res);
        if (res.status === 200) {
          await emailsendingpassword(id);
          console.log("email sucess");
        }
      } catch (error) {
        console.error("Failed to delete the user or send email:", error);
      }
    } else if (index === 1) {
      console.log("Reload");
    } else if (index === 2) {
      deleteclientinfo(row._id);
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
      name: "Registration Date",
      selector: (row) => row?.createdAt.slice(0, 10),
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
      name: "Status",
      selector: (row) => row.submittedAssignmentCount,
      sortable: true,
    },

    {
      name: "Registration Status",
      selector: (row) => row.submitdAssingment,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Flex>
          {iconsarray.map((Icon, index) => (
            <Button
              key={index}
              colorScheme="green"
              size="sm"
              variant="outline"
              onClick={() => handleAction(row, index)}
              leftIcon={<Icon />}
              mr={2}
              mb={2}
            />
          ))}
        </Flex>
      ),
    },
  ];

  const pendingdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/getallpending"
      );
      console.log(response.data.users, "pending list ");
      setPendinglist(response.data.users);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  useEffect(() => {
    pendingdata();
  }, [dependancy, deletedependency]);
  return (
    <>
      <Flex alignItems="center" justify="space-between">
        <Text fontSize="md">Registation Panding</Text>
      </Flex>
      <Center>
        <Box width={{ base: "90vw", md: "70vw" }} overflowX="auto" p={4}>
          <Center mb={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Pending Registrations
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
              data={pendinglist}
              pagination
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

export default PendingRegisteration;
