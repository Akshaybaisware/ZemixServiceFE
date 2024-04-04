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
          {/* Chnage Link */}
          <Link
            to={{
              pathname: "/f",
              // state: { users },
            }}
          >
            <Card
              as="flex"
              width="auto"
              textAlign="center"
              height={{ base: "100%", md: "150px" }}
              minW="150px"
              maxH="150px"
              bg="white"
              // borderLeft="4px solid #FF0000"
              borderRadius="12px"
              boxShadow="md" // Add a shadow for a card-like appearance
              p="2" // Adjust padding as needed
              display="flex"
              // flexDirection={{ base: "column", md: "column", lg: "column" }}
              direction={{ base: "column", md: "row", lg: "row" }}
              justifyContent={{ base: "center", md: "space-around" }}
              alignItems="center"
              gap="20px"
            >
              {/* <div style={{ flex: 1 }}> */}
              <img
                src={
                  // ""
                  TotalCumstmer
                }
                alt="Total Customers"
              />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Add Employees
              </Text>
              {/* <Heading size="lg" color="black" textAlign="center">
                  {EmployeeCount}
                </Heading> */}
              {/* {users && (
                  <Heading size="lg" color="black" textAlign="center">
                    {users.length}
                    {console.log("users length", users.length)}
                  </Heading> */}

              {/* </div> */}
            </Card>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

export default Dashboard;
