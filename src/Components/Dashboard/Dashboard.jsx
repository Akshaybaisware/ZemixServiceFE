import { Box, Flex, Center } from "@chakra-ui/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, Icon, Text } from "@chakra-ui/react";

import TotalCumstmer from "../../../public/totalCust.svg";
import TodaysFollowup from "../../../public/todays.svg";
import AssignedLeads from "../../../public/assigned.svg";
import Missed from "../../../public/missed.svg";
import Transfer from "../../../public/transfer.svg";
import nextDay from "../../../public/nextDay.svg";
import filter from "../../../public/filter.svg";
import upcomingImage from "../../../public/upcoming.svg";
import lostLeadsIcon from "../../../public/lostLeads.svg";

import { FaUsers, FaClock, FaUserCheck, FaUserTimes, FaUserSlash } from 'react-icons/fa';

function Dashboard() {
  const [data, setData] = useState(0);
  const [activeUsers, setActive] = useState(0);
  const [registerUsers, setRegisterUsers] = useState(0);
  const [pendingUsers, setPendingUsers] = useState(0);
  const [FrezzUsers, setFrezzUsers] = useState(0);
  const [cancelUsers, setCancelUsers] = useState(0);
  const [todaysRecovery, setTodaysRecovery] = useState(0);
  useEffect(() => {
    totalragisterations();
    totlalActiveUser();
    totlalPendingUser();
    totlalFrezzUser();
    getallcancel();
  }, []);

  const getallcancel = async () => {
    try {
      const response = await axios.get(
        `https://zemixbe-production.up.railway.app/api/user/getallcancel`
      );
      console.log(response, "cancel");
      setCancelUsers(response.data.users.length);
    } catch (error) {
      console.error(error);
    }
  };

  const totalragisterations = async () => {
    try {
      const response = await axios.get(
        `https://zemixbe-production.up.railway.app/api/user/getallclient`
        //getallregistered`
      );
      console.log(response, "registerations");
      setRegisterUsers(response.data.data.length);
      console.log(registerUsers, "register");
    } catch (error) {
      console.error(error);
    }
  };

  const totlalActiveUser = async () => {
    try {
      const response = await axios.get(
        `https://zemixbe-production.up.railway.app/api/user/getallactive`
      );

      console.log(response, "active");
      setActive(response.data.users.length);
    } catch (error) {
      console.error(error);
    }
  };

  const totlalPendingUser = async () => {
    try {
      const response = await axios.get(
        `https://zemixbe-production.up.railway.app/api/user/getallpending`
      );
      console.log(response, "pending");
      setPendingUsers(response.data.users.length);
    } catch (error) {
      console.error(error);
    }
  };

  const gettodaysregisterations = async () => {
    try {
      const response = await axios.get(
        `https://zemixbe-production.up.railway.app/api/user/gettodaysregisterations`
      );
      console.log(response, "todays");
    } catch (error) {
      console.error(error);
    }
  };

  const totlalFrezzUser = async () => {
    try {
      const response = await axios.get(
        `https://zemixbe-production.up.railway.app/api/user/getallfreez`
      );

      console.log(response, "frezz");
      setFrezzUsers(response.data.users.length);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <Flex
       ml={["2rem"]}
      //  justifyContent={"center"}
      width={"100%"} direction={{ base: "column", md: "row" }}>
        <Flex
        justifyContent={["flex-startr","space-around"]}
          width={["100%", "50%"]}
          direction={{ md: "column" }}

          // justifyContent="center"
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/" }}>
            <Card
              as="flex"
              minWidth={["400%","170%"]}
              maxWidth="170%"
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
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {registerUsers}
              </Text>
            </Card>
          </Link>
        </Flex>
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          justifyContent={["flex-start","center"]}
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/" }}>
            <Card
            ml={["-1rem" , ""]}

              as="flex"
              minWidth={["400%","170%"]}
              maxWidth="150%"
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
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {pendingUsers}
              </Text>
            </Card>
          </Link>
        </Flex>
      </Flex>

      <Flex
       // justifyContent={"space-around"}

       width={"100%"}
      direction={{ base: "column", md: "row" }} gap="25px">
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          width={["100%", "50%"]}
          justifyContent={["flex-start","space-around"]}
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/" }}>
            <Card
              as="flex"
              minWidth={["600%","220%"]}
              maxWidth="150%"
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
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {cancelUsers}
              </Text>
            </Card>
          </Link>
        </Flex>
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          justifyContent={["flex-start","center"]}
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/" }}>
            <Card
              as="flex"
              minWidth={["600%","235%"]}
              maxWidth="150%"
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
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {activeUsers}
              </Text>
            </Card>
          </Link>
        </Flex>
      </Flex>

      <Flex
         width={"100%"}
      direction={{ base: "column", md: "row" }} gap="25px">
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          width={["100%", "50%"]}
          justifyContent={["flex-startr","space-around"]}
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/" }}>
            <Card
              as="flex"
              minWidth={["520%","210%"]}
              maxWidth="150%"
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
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {FrezzUsers}
              </Text>
            </Card>
          </Link>
        </Flex>
        <Flex
          direction={{ md: "column" }}
          gap="25px"
          justifyContent={["flex-start","center"]}
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/" }}>
            <Card
              as="flex"
              minWidth={["400%","210%"]}
              maxWidth="150%"
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

      <Flex
         width={"100%"}
      direction={{ base: "column", md: "row" }} gap="25px">
        <Flex
            width={["100%", "50%"]}
          direction={{ md: "column" }}
          gap="25px"
          justifyContent={["flex-start","center"]}
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/" }}>
            <Card
              as="flex"
              minWidth={["450%","225%"]}
              maxWidth="150%"
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
          justifyContent={["flex-start","center"]}
          marginTop="30px"
          align="center"
        >
          <Link to={{ pathname: "/" }}>
            <Card
              as="flex"
              minWidth={["450%","230%"]}
              maxWidth="150%"
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
      </Flex> */}

      <Box
        width="100%"
        direction={{ base: "column", md: "column" }}
        justifyContent="center"
      >
        <Box width="100%" marginY={{ base: "50px", md: "80px" }} align="center">
          <Link to={{ pathname: "/" }}>
            <Card
              as="flex"
              minWidth="100%"
              minHeight="10rem"
              textAlign="center"
            bgGradient="linear(to-br, #6e8707, #a82727, #e78b8b, #4a0609)"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap="20px"
            >
              {/* <img src={TotalCumstmer} alt="Total Customers" /> */}
              <Icon as={FaUsers} w={6} h={6} color="white" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Total Registration
              </Text>
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {registerUsers}
              </Text>
            </Card>
          </Link>
        </Box>
        <Box width="100%" marginY={{ base: "30px", md: "30px" }} align="center">
          <Link to={{ pathname: "/" }}>
            <Card
              ml={["0", ""]}
              as="flex"
              minWidth="100%"
              minHeight="10rem"
              textAlign="center"
             bgGradient="linear(to-br, #dfdbeb, #483c80, #8784f5, #3e29df)"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap="20px"
            >
              <Icon as={FaClock} w={6} h={6} color="orange.500" />                                
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Pending Registration
              </Text>
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {pendingUsers}
              </Text>
            </Card>
          </Link>
        </Box>
      </Box>

      <Box
        width="100%"
        direction={{ base: "column", md: "column" }}
        justifyContent="center"
      >
        <Box width="100%" marginY={{ base: "30px", md: "30px" }} align="center">
          <Link to={{ pathname: "/" }}>
            <Card
              as="flex"
              minWidth="100%"
              minHeight="10rem"
              textAlign="center"
              bgGradient="linear(to-br, #dfdbeb, #d4e5d4, #479559, #19c463)"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap="20px"
            >
              <Icon as={FaUserCheck} w={6} h={6} color="purple" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Active User
              </Text>
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {activeUsers}
              </Text>
            </Card>
          </Link>
        </Box>
        <Box width="100%" marginY={{ base: "30px", md: "30px" }} align="center">
          <Link to={{ pathname: "/" }}>
            <Card
              ml={["0", ""]}
              as="flex"
              minWidth="100%"
              minHeight="10rem"
              textAlign="center"
              bgGradient="linear(to-br, #4d034c, #b60b91, #f135e8, #4a061c)"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap="20px"
            >
              <Icon as={FaUserTimes} w={6} h={6} color="red.500" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Cancel User
              </Text>
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {cancelUsers}
              </Text>
            </Card>
          </Link>
        </Box>
      </Box>

      <Box
        width="100%"
        direction={{ base: "column", md: "column" }}
        justifyContent="center"
      >
        <Box width="100%" marginY={{ base: "30px", md: "30px" }} align="center">
          <Link to={{ pathname: "/" }}>
            <Card
              as="flex"
              minWidth="100%"
              minHeight="10rem"
              textAlign="center"
                bgGradient="linear(to-br, #023215,  #24d47c, #4a3a06, #e2e1da)"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap="20px"
            >
              <Icon as={FaUserSlash} w={6} h={6} color="black" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Inactive User
              </Text>
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {FrezzUsers}
              </Text>
            </Card>
          </Link>
        </Box>
        <Box width="100%" marginY={{ base: "30px", md: "30px" }} align="center">
          <Link to={{ pathname: "/" }}>
            <Card
              ml={["0", ""]}
              as="flex"
              minWidth="100%"
              minHeight="10rem"
              textAlign="center"
             bgGradient="linear(to-br, #c7332c,  #e78b8b, #b45055, #e90d0d)"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap="20px"
            >
              <img
         
              src={TotalCumstmer} alt="Total Customers" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Today's Recovery
              </Text>
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {cancelUsers}
              </Text>
            </Card>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
