import { Box, Flex, Center } from "@chakra-ui/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, Text } from "@chakra-ui/react";

import TotalCumstmer from "../../../public/totalCust.svg";
import TodaysFollowup from "../../../public/todays.svg";
import AssignedLeads from "../../../public/assigned.svg";
import Missed from "../../../public/missed.svg";
import Transfer from "../../../public/transfer.svg";
import nextDay from "../../../public/nextDay.svg";
import filter from "../../../public/filter.svg";
import upcomingImage from "../../../public/upcoming.svg";
import lostLeadsIcon from "../../../public/lostLeads.svg";

function Dashboard() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [data, setData] = useState(0);
  const [activeUsers, setActive] = useState(0);
  const [registerUsers, setRegisterUsers] = useState(0);
  const [pendingUsers, setPendingUsers] = useState(0);
  const [FrezzUsers, setFrezzUsers] = useState(0);

  useEffect(() => {
    fetchDetails();
    totlalActiveUser();
    totlalRegistrationUser();
    totlalPendingUser();
    totlalFrezzUser();
  }, []);

  const fetchDetails = async () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const response = await axios.get(`${apiUrl}/user/get_all_user`);
    const totalData = response.data;
    console.log(totalData);
    setData(totalData);
  };

  const totlalActiveUser = async () => {
    const response = await axios.get(
      `${apiUrl}/user/user_pagination?status=Active`
    );
    const totalActiveUserData = response.data.totalUsers;
    setActive(totalActiveUserData);
    console.log(totalActiveUserData, "totalActive");
  };

  const totlalRegistrationUser = async () => {
    const response = await axios.get(
      `${apiUrl}/user/user_pagination?status=Registered`
    );
    const totalRigistraUserData = response.data.totalUsers;
    setRegisterUsers(totalRigistraUserData);
    console.log(totalRigistraUserData, "totalRegistration");
  };

  const totlalPendingUser = async () => {
    const response = await axios.get(
      `${apiUrl}/user/user_pagination?status=Pending`
    );
    const totalPendingUser = response.data.totalUsers;
    setPendingUsers(totalPendingUser);
    console.log(totalPendingUser, "totalPending");
  };

  const totlalFrezzUser = async () => {
    const response = await axios.get(
      `${apiUrl}/user/user_pagination?status=Freeze`
    );
    const totalFrezzUser = response.data.totalUsers;
    setFrezzUsers(totalFrezzUser);
    console.log(totalFrezzUser, "totalFrezz");
  };
  return (
    <>
      <Flex direction={{ base: "column", md: "row" }} gap="25px">
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          justifyContent="center"
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/f" }}>
            <Card
              as="flex"
              minWidth="10rem"
              maxWidth="15rem"
              minHeight="10rem"
              maxHeight="10rem"
              textAlign="center"
              bg="white"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              direction={{ base: "column", md: "row", lg: "row" }}
              justifyContent={{ base: "center", md: "space-around" }}
              alignItems="center"
              gap="20px"
            >
              <img src={TotalCumstmer} alt="Total Customers" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Total Registration
              </Text>
            </Card>
          </Link>
        </Flex>
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          justifyContent="center"
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/f" }}>
            <Card
              as="flex"
              minWidth="10rem"
              maxWidth="15rem"
              minHeight="10rem"
              maxHeight="10rem"
              textAlign="center"
              bg="#65D088"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              direction={{ base: "column", md: "row", lg: "row" }}
              justifyContent={{ base: "center", md: "space-around" }}
              alignItems="center"
              gap="20px"
            >
              <img src={TotalCumstmer} alt="Total Customers" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Pending Registration
              </Text>
            </Card>
          </Link>
        </Flex>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} gap="25px">
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          justifyContent="center"
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/f" }}>
            <Card
              as="flex"
              minWidth="10rem"
              maxWidth="15rem"
              minHeight="10rem"
              maxHeight="10rem"
              textAlign="center"
              bg="#FFBB44"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              direction={{ base: "column", md: "row", lg: "row" }}
              justifyContent={{ base: "center", md: "space-around" }}
              alignItems="center"
              gap="20px"
            >
              <img src={TotalCumstmer} alt="Total Customers" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Cancel User
              </Text>
            </Card>
          </Link>
        </Flex>
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          justifyContent="center"
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/f" }}>
            <Card
              as="flex"
              minWidth="10rem"
              maxWidth="15rem"
              minHeight="10rem"
              maxHeight="10rem"
              textAlign="center"
              bg="#F32F53"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              direction={{ base: "column", md: "row", lg: "row" }}
              justifyContent={{ base: "center", md: "space-around" }}
              alignItems="center"
              gap="20px"
            >
              <img src={TotalCumstmer} alt="Total Customers" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Active User
              </Text>
            </Card>
          </Link>
        </Flex>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} gap="25px">
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          justifyContent="center"
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/f" }}>
            <Card
              as="flex"
              minWidth="10rem"
              maxWidth="15rem"
              minHeight="10rem"
              maxHeight="10rem"
              textAlign="center"
              bg="#65D088"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              direction={{ base: "column", md: "row", lg: "row" }}
              justifyContent={{ base: "center", md: "space-around" }}
              alignItems="center"
              gap="20px"
            >
              <img src={TotalCumstmer} alt="Total Customers" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Inactive User
              </Text>
            </Card>
          </Link>
        </Flex>
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          justifyContent="center"
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/f" }}>
            <Card
              as="flex"
              minWidth="10rem"
              maxWidth="15rem"
              minHeight="10rem"
              maxHeight="10rem"
              textAlign="center"
              bg="white"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              direction={{ base: "column", md: "row", lg: "row" }}
              justifyContent={{ base: "center", md: "space-around" }}
              alignItems="center"
              gap="20px"
            >
              <img src={TotalCumstmer} alt="Total Customers" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Today's Recovery
              </Text>
            </Card>
          </Link>
        </Flex>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} gap="25px">
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          justifyContent="center"
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/f" }}>
            <Card
              as="flex"
              minWidth="10rem"
              maxWidth="15rem"
              minHeight="10rem"
              maxHeight="10rem"
              textAlign="center"
              bg="#0097A7"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              direction={{ base: "column", md: "row", lg: "row" }}
              justifyContent={{ base: "center", md: "space-around" }}
              alignItems="center"
              gap="20px"
            >
              <img src={TotalCumstmer} alt="Total Customers" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Total Recovery
              </Text>
            </Card>
          </Link>
        </Flex>
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          justifyContent="center"
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/f" }}>
            <Card
              as="flex"
              minWidth="10rem"
              maxWidth="15rem"
              minHeight="10rem"
              maxHeight="10rem"
              textAlign="center"
              bg="#0097A7"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              direction={{ base: "column", md: "row", lg: "row" }}
              justifyContent={{ base: "center", md: "space-around" }}
              alignItems="center"
              gap="20px"
            >
              <img src={TotalCumstmer} alt="Total Customers" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Add Employees
              </Text>
            </Card>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

export default Dashboard;
