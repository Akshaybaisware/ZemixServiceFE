import { Box, Flex, Center } from "@chakra-ui/layout";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Card, Icon, Text, useToast } from "@chakra-ui/react";

import TotalCumstmer from "../../../public/totalCust.svg";
import TodaysFollowup from "../../../public/todays.svg";
import AssignedLeads from "../../../public/assigned.svg";
import Missed from "../../../public/missed.svg";
import Transfer from "../../../public/transfer.svg";
import nextDay from "../../../public/nextDay.svg";
import filter from "../../../public/filter.svg";
import upcomingImage from "../../../public/upcoming.svg";
import lostLeadsIcon from "../../../public/lostLeads.svg";
import { useNavigate } from "react-router-dom";
import { AiOutlineNumber, AiOutlineCalendar } from 'react-icons/ai';
import { BsBookmarkCheck } from 'react-icons/bs';
import { FaPaperPlane } from 'react-icons/fa';

import ChatBot from "react-simple-chatbot";
import { Segment } from "semantic-ui-react";
import styled, { keyframes } from "styled-components";
import "semantic-ui-css/semantic.min.css";

import chatbotimage from "../../assets/chatbot.jpeg"





//chatbot
const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

// Create a styled component for the blinking logo
const BlinkingImage = styled.img`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  cursor: pointer;
  animation: ${blink} 2s step-end infinite;
  border-radius: 30%; /* Adjust the value as needed */
 box-shadow: 0 8px 16px rgba(167, 9, 9, 0.3); /* Increased blur radius and spread */
`;


const BlinkingLogo = ({ onClick }) => {
  return (
    <BlinkingImage
  
      src={chatbotimage} // Example logo
      alt="Chatbot"
      onClick={onClick}
    />
  );
};

const ChatBotComponent = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const chatBotRef = useRef(null);

  const handleClickOutside = (event) => {
    if (chatBotRef.current && !chatBotRef.current.contains(event.target)) {
      setShowChatBot(false);
    }
  };

  useEffect(() => {
    if (showChatBot) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showChatBot]);


  const steps = [
    {
      id: "Greet",
      message: "Hello, Welcome to Neutron Services",
      trigger: "Ask Name",
    },
    {
      id: "Ask Name",
      message: "Please enter your Name",
      trigger: "waiting1",
    },
    {
      id: "waiting1",
      user: true,
      trigger: "Name",
    },
    {
      id: "Name",
      message: "Hi {previousValue}, select your issue",
      trigger: "issues",
    },
    {
      id: "issues",
      options: [
        { value: "qc", label: "QC-Report", trigger: "qc" },
        { value: "assignment", label: "Assignment", trigger: "assignment" },
        { value: "login", label: "Login", trigger: "login" },
        { value: "salary", label: "Salary", trigger: "salary" },
        { value: "cancel_work", label: "Cancel Work", trigger: "cancel_work" },
      ],
    },
    {
      id: "qc",
      options: [
        { value: "400_completed", label: "530 Form Completed", trigger: "400_completed" },
        { value: "400_not_completed", label: "530 Form pending", trigger: "400_not_completed" },
      ],
    },
    {
      id: "400_completed",
      message: "Your QC report will be generated after your end-date. Till then, please wait for the result. For more queries, mail to helplineservicewww38@gmail.com.",
      trigger: "user_input",
    },
    {
      id: "400_not_completed",
      message: "Please complete the 530 Assignment. For more queries, mail to helplineservicewww38@gmail.com.",
      trigger: "user_input",
    },
    {
      id: "assignment",
      options: [
        { value: "assignment_completed", label: "Assignment Completed", trigger: "assignment_completed" },
        { value: "question_in_assignment", label: "Form in showing After Completion of Assignment", trigger: "question_in_assignment" },
      ],
    },
    {
      id: "assignment_completed",
      message: "Wait for the QC report which will be displayed after your end-date in Your dashboard. For more queries, mail to helplineservicewww38@gmail.com.",
      trigger: "user_input",
    },
    {
      id: "question_in_assignment",
      message: "Ignore Form due to server problem it shows The assignment is over. You have to wait for the QC report after 5 days. For more queries, mail to helplineservicewww38@gmail.com.",
      trigger: "user_input",
    },
    {
      id: "login",
      options: [
        { value: "login_problem", label: "Login Problem", trigger: "login_problem" },
        { value: "qc_not_showing", label: "After Login QC is Not Showing", trigger: "qc_not_showing" },
      ],
    },
    {
      id: "login_problem",
      message: "Make sure to copy-paste your user ID and password properly. Don't copy any extra spaces before or after the credentials, as this can cause login issues. For more queries, mail to helplineservicewww38@gmail.com.",
      trigger: "user_input",
    },
    {
      id: "qc_not_showing",
      message: "Make sure your 5 days are completed. After 5 days, log out and log in again; your QC will be there. For more queries, mail to helplineservicewww38@gmail.com.",
      trigger: "user_input",
    },
    {
      id: "salary",
      message: "You will receive your salary via NEFT/GPay/PhonePe after 5 days if your correct percentage is more than 90%. For more queries, mail to helplineservicewww38@gmail.com.",
      trigger: "user_input",
    },
    {
      id: "cancel_work",
      message: "To cancel your work, please mail to helplineservicewww38@gmail.com. You cannot cancel from here.",
      trigger: "user_input",
    },
    {
      id: "user_input",
      user: true,
      trigger: "thank_you",
    },
    {
      id: "thank_you",
      message: "Thank you for connecting with us. We will look into your queries. For more information, contact helplineservicewww38@gmail.com.",
      end: true,
    }
  ];

  

  return (
    <>
      {showChatBot && (
        <Segment ref={chatBotRef} style={{ position: "fixed", bottom: "80px", right: "20px", zIndex: 1000 }}>
          <ChatBot steps={steps} />
        </Segment>
      )}
      <BlinkingLogo onClick={() => setShowChatBot(!showChatBot)} />
    </>
  );
};






function UserDashboard() {
  const [data, setData] = useState(0);
  const [activeUsers, setActive] = useState(0);
  const [registerUsers, setRegisterUsers] = useState(0);
  const [pendingUsers, setPendingUsers] = useState(0);
  const [FrezzUsers, setFrezzUsers] = useState(0);
  const [cancelUsers, setCancelUsers] = useState(0);
  const [todaysRecovery, setTodaysRecovery] = useState(0);
  const [toatalasignment, setTotalAssignment] = useState(0);
  const [submitedassignment, setsubmittedassignment] = useState();
  const [dates, setdates] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    totalragisterations();
    totlalActiveUser();
    totlalPendingUser();
    totlalFrezzUser();
    getallcancel();
    getuserdeeatilsbyid();
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
        `https://zemixbe-production.up.railway.app/api/user/getallregistered`
      );
      console.log(response, "registerations");
      setRegisterUsers(response.data.users.length);
    } catch (error) {
      console.error(error);
    }
  };

  const getuserdeeatilsbyid = async () => {
    try {
      const response = await axios.post(
        "https://zemixbe-production.up.railway.app/api/user/getuserbyid",
        {
          userId: userId,
        }
      );
      console.log(response.data.User.submittedAssignmentCount, "user details");

      if(response.data.User.submittedAssignmentCount === "530" || response.data.User.submittedAssignmentCount === 530){
        console.log("in the userdashboardd");
        navigate("/qcprogress");
        return;

      }


      setTotalAssignment(response.data.User.totalAssignmentLimit);
      setsubmittedassignment(response.data.User.submittedAssignmentCount);
      setdates(response?.data?.User?.endDate);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      console.log(error.message);
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
   

      <Box
        width="100%"
        direction={{ base: "column", md: "column" }}
        justifyContent="center"
      >
        <Box width="100%" marginY={{ base: "50px", md: "60px" }} align="center">
          <Link to={{ pathname: "/" }}>
            <Card
              as="flex"
              minWidth="100%"
              minHeight="10rem"
              textAlign="center"
            //  bgGradient="linear(to-r, #ff4e50, #f9d423, #ffcb6b, #34e89e, #00d2ff, #7f7fd5, #c33764)"
               bgGradient="linear(to-br, #c7332c,  #e78b8b, #36af6c, #0a4935)"
      
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap="20px"
            >
               <Icon as={AiOutlineNumber} w={6} h={6} color="white" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Total Number Form
              </Text>
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {toatalasignment}
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
                 bgGradient="linear(to-r, #ff7e5f, #feb47b, #86e3ce, #5d9cec, #3b8d99)"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap="20px"
            >
             <Icon as={BsBookmarkCheck} w={6} h={6} color="green.500" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Saved Form
              </Text>
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {submitedassignment}
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
              bgGradient="linear(to-br, #89c5a1,  #24d47c, #f2c739, #e2e1da)"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap="20px"
            >
              <Icon as={FaPaperPlane} w={6} h={6} color="orange.500" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                Submit Form
              </Text>
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {submitedassignment}
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
            bgGradient="linear(to-br, #d9e7de,  #8a7bc5, #4bbc6d, #e2deda)"
              borderRadius="12px"
              boxShadow="md"
              p="2"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap="20px"
            >
           <Icon as={AiOutlineCalendar} w={6} h={6} color="green" />
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                End Date
              </Text>
              <Text
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
                fontWeight="bold"
              >
                {dates?.slice(0, 10)}
              </Text>
            </Card>
          </Link>
        </Box>
      </Box>
      <ChatBotComponent/>
    </>
  );
}

export default UserDashboard;
