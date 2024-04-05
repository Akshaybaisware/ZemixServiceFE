import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";

function AddClient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const onSubmit = (data) => {
    console.log(data);
  };

  const name = useRef();
  const address = useRef();
  const email = useRef();
  const mobile = useRef();
  const plan = useRef();
  const selectPlan = useRef();

  const handlesubmitclient = async () => {
    try {
      console.log("called");
      console.log(
        name.current.value,
        address.current.value,
        email.current.value,
        mobile.current.value,
        plan.current.value,
        selectPlan.current.value,
        "admafmiandfoin"
      );
      const response = await fetch(
        "http://localhost:5000/api/client/addclient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.current.value,
            address: address.current.value,
            email: email.current.value,
            mobile: mobile.current.value,
            plan: plan.current.value,
            selectPlan: selectPlan.current.value,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      // if (responseData.isAdded) {
      //   toast({
      //     title: "Success",
      //     description: "Client added successfully",
      //     status: "success",
      //     duration: 9000,
      //     isClosable: true,
      //   });
      // } else {
      //   toast({
      //     title: "Error",
      //     description: "Client not added",
      //     status: "error",
      //     duration: 9000,
      //     isClosable: true,
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Add Client</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input ref={name} type="text" id="name" {...register("name")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              ref={address}
              type="text"
              id="address"
              {...register("address")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input ref={email} type="email" id="email" {...register("email")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="mobile">Mobile No</FormLabel>
            <Input
              ref={mobile}
              type="tel"
              id="mobile"
              {...register("mobile")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="plan">Plan</FormLabel>
            <Select ref={plan} id="plan" {...register("plan")}>
              <option value="-">Plan</option>
              <option value="540">540</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="selectPlan">Select Plan</FormLabel>
            <Select
              ref={selectPlan}
              id="selectPlan"
              {...register("selectPlan")}
            >
              <option value="-">Select Plan</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </Select>
          </FormControl>
          <Button onClick={handlesubmitclient} type="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </>
  );
}

export default AddClient;
