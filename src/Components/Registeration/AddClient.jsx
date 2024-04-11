import React from "react";
import { useForm } from "react-hook-form";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
// import { useHistory } from "react-router";
import { useNavigate } from "react-router-dom";

function useCustomHistory() {
  // const history = useHistory();

  function redirectTo(path) {
    history.push(path);
  }

  return {
    redirectTo,
  };
}

function AddClient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();
  const { redirectTo } = useCustomHistory();
  const navigate = useNavigate();

  const emailafterregisteration = async (email, id) => {
    try {
      console.log(email, id);
      const response = await axios.post(
        "http://localhost:5000/api/user/sendconfirmmail",
        {
          email: email,
          //userID: id,
        }
      );
      console.log(response, "dassdwedaewd");
    } catch (error) {
      console.log(error.message, "error message");
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch("http://localhost:5000/api/user/addclient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData, "after egitser");
      if (responseData.isAdded) {
        toast({
          title: "Success",
          description: "Client added successfully",
          position: "top",
          status: "success",
          duration: 3000,

          isClosable: true,
        });
        emailafterregisteration(responseData.client.email);
        // Redirect to "/"
        navigate("/registeration");
        // redirectTo("/registeration");
      } else {
        toast({
          title: "Error",
          description: "Client Alredy Exists",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <h1>Add Client</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input isRequired type="text" id="name" {...register("name")} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              isRequired
              type="text"
              id="address"
              {...register("address")}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input isRequired type="email" id="email" {...register("email")} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="mobile">Mobile No</FormLabel>
            <Input isRequired type="tel" id="mobile" {...register("mobile")} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="plan">Plan</FormLabel>
            <Select id="plan" {...register("plan")}>
              <option value="-">Plan</option>
              <option value="480">480</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="selectPlan">Caller</FormLabel>
            <Select id="selectPlan" {...register("selectPlan")}>
              <option value="-">Caller</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </Select>
          </FormControl>
          <Button type="submit">Submit</Button>
        </VStack>
      </form>
    </VStack>
  );
}

export default AddClient;
