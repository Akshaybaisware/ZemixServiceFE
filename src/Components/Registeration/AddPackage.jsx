import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

function YourFormComponent() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data); // You can handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="packageName">Package Name</FormLabel>
          <Input type="text" id="packageName" {...register("packageName")} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="noOfForms">No Of Forms</FormLabel>
          <Input type="number" id="noOfForms" {...register("noOfForms")} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="days">Days</FormLabel>
          <Input type="number" id="days" {...register("days")} />
        </FormControl>
        <Button type="submit">Add Package</Button>
      </VStack>
    </form>
  );
}

export default YourFormComponent;
