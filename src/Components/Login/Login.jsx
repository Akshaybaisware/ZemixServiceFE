
// import React, { useState, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Center,
//   Input,
//   Spinner,
//   useToast,
// } from "@chakra-ui/react";
// import { FaEye, FaEyeSlash,FaKey } from "react-icons/fa";
// import axios from "axios";

// function Login() {
//   const [loader, setLoader] = useState(false);
//   const username = useRef();
//   const [password, setPassword] = useState("");
//   const toast = useToast();
//   const [show, setShow] = useState(false);

//   const handleLogin = async () => {
//     const user = {
//       username: username.current.value.trim(),
//       password: password.trim(),
//     };
//     console.log(user);
//     setLoader(true);
//     try {
//       const response = await axios.post(
//         "https://zemixbe-production.up.railway.app/api/auth/adminsignin",
//         user
//       );

//       console.log(response);
//       if (response.status === 200) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("role", response.data.role);

//         toast({
//           title: "Login Success",
//           description: "Welcome to Neutron Service",
//           status: "success",
//           duration: 3000,
//           position: "top",
//           isClosable: true,
//         });
//         setLoader(false);
//         window.location.replace("/");
//       }
//     } catch (error) {
//       toast({
//         title: "Login Failed",
//         description: "Invalid Credentials",
//         status: "error",
//         duration: 3000,
//         position: "top",
//         isClosable: true,
//       });
//       setLoader(false);
//       console.log(error);
//     }
//   };

//   const handleshow = () => {
//     setShow(!show);
//   };

//   return loader ? (
//     <Box>
//       <Center height={"100vh"}>
//         <Spinner
//           thickness="4px"
//           speed="0.65s"
//           emptyColor="gray.200"
//           color="blue.500"
//           size="xl"
//         />
//       </Center>
//     </Box>
//   ) : (
//     <>
//       <Box
//         bg={"#102027"}
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         minHeight="100vh"
//       >
//         <Box
//           width={["350px", "500px"]}
//           padding={["2rem", "3rem"]}
//           bg={"#1c313a"}
//           boxShadow="lg"
//           borderRadius="md"
//         >
//           <Center
//             fontSize={"2rem"}
//             fontWeight={"600"}
//             mb="2rem"
//             color="#00bfa5"
//           >
//             <FaKey style={{ marginRight: "0.5rem" }} />
//             ADMIN PANEL
//           </Center>

//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             textAlign="center"
//           >
//             <Box width="100%" mb="1.5rem">
//               <Input
//                    p={"1rem"}
//                 ref={username}
//                 placeholder="USERNAME"
//                 variant="flushed"
//                 focusBorderColor="#00bfa5"
//                 _placeholder={{ color: "#00bfa5" }}
//                 color="white"
//               />
//             </Box>
//             <Box width="100%" mb="1.5rem" position="relative">
//               <Input
//               p={"1rem"}
//                 type={show ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="PASSWORD"
//                 variant="flushed"
//                 focusBorderColor="#00bfa5"
//                 _placeholder={{ color: "#00bfa5" }}
//                 color="white"
//               />
//               <button
//                 onClick={handleshow}
//                 style={{
//                   position: "absolute",
//                   right: "10px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   background: "none",
//                   border: "none",
//                   cursor: "pointer",
//                   color: "#00bfa5",
//                 }}
//               >
//                 {show ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </Box>

//             <Button
//               height="3rem"
//               width="100%"
//               borderRadius="4px"
//               color="#00bfa5"
//               background="transparent"
//               borderColor="#00bfa5"
//               borderWidth="1px"
//               fontSize="1rem"
//               fontWeight={700}
//               fontFamily='"Poppins", sans-serif'
//               mb="1.5rem"
//               _hover={{ background: "#00bfa5", color: "#1c313a" }}
//               onClick={handleLogin}
//             >
//               LOGIN
//             </Button>
//             <NavLink
//               to="/userlogin"
//               style={{ textDecoration: "none", width: "100%" }}
//             >
//               <Button
//                 height="3rem"
//                 width="100%"
//                 borderRadius="4px"
//                 fontSize="1rem"
//                 color="#00bfa5"
//                 background="transparent"
//                 borderColor="#00bfa5"
//                 borderWidth="1px"
//                 fontWeight={700}
//                 fontFamily='"Poppins", sans-serif'
//                 mb="1.5rem"
//                 _hover={{ background: "#00bfa5", color: "#1c313a" }}
//               >
//                 SYSTEM USERS LOGIN
//               </Button>
//             </NavLink>
//             <NavLink
//               to="/forgetpassword"
//               style={{ textDecoration: "none", width: "100%" }}
//             >
//               <Button
//                 height="3rem"
//                 width="100%"
//                 borderRadius="4px"
//                 fontSize="1rem"
//                 color="#00bfa5"
//                 background="transparent"
//                 borderColor="#00bfa5"
//                 borderWidth="1px"
//                 fontWeight={700}
//                 fontFamily='"Poppins", sans-serif'
//                 mb="1.5rem"
//                 _hover={{ background: "#00bfa5", color: "#1c313a" }}
//               >
//                 FORGET PASSWORD
//               </Button>
//             </NavLink>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default Login;

import React from "react";
import { Box, Center, Text, Button } from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";

function Login() {
  return (
    <Box
      bg={"#1a1a1a"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      color="red.500"
    >
      <Center>
        <FaExclamationTriangle size="4rem" color="red" />
      </Center>
      <Text fontSize="3xl" fontWeight="bold" mt="1.5rem" textAlign="center">
        SYSTEM BREACH DETECTED!
      </Text>
      <Text fontSize="lg" mt="1rem" textAlign="center" color="gray.300">
        WARNING: Suspicious activity linked to potential illegal operations has been detected. Your data and actions on this system may be compromised.
      </Text>
      <Text fontSize="lg" mt="0.5rem" textAlign="center" color="gray.300">
        This page has been locked due to a severe cyber threat. Please disconnect immediately and contact the authorities.
      </Text>
      <Text fontSize="lg" mt="1rem" fontWeight="bold" textAlign="center">
        ** Criminal prosecution may follow if unauthorized activities are confirmed. **
      </Text>
      <Button
        mt="2rem"
        colorScheme="red"
        size="lg"
        onClick={() => window.location.replace("/")}
      >
        Exit Immediately
      </Button>
    </Box>
  );
}

export default Login;
