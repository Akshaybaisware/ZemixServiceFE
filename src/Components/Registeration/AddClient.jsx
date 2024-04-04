import React from "react";
import { useForm } from "react-hook-form";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";

function AddClient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <h1>Add Client</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input type="text" id="name" {...register("name")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input type="text" id="address" {...register("address")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" id="email" {...register("email")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="mobile">Mobile No</FormLabel>
            <Input type="tel" id="mobile" {...register("mobile")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="plan">Plan</FormLabel>
            <Select id="plan" {...register("plan")}>
              <option value="-">Plan</option>
              <option value="540">540</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="selectPlan">Select Plan</FormLabel>
            <Select id="selectPlan" {...register("selectPlan")}>
              <option value="-">Select Plan</option>
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
    </>
  );
}

export default AddClient;
