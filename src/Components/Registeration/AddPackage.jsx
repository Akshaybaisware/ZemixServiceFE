import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";

function AddPackage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data); // You can handle form submission logic here
  };
  const toast = useToast();
  const packagename = useRef();
  const noOfForms = useRef();
  const days = useRef();
  console.log(packagename, "adfsaf");

  const handlesubmitpackage = async () => {
    try {
      console.log(
        packagename.current.value,
        noOfForms.current.value,
        days.current.value
      );

      console.log("clicked");
      const response = await fetch(
        "http://localhost:5000/api/package/addpackage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageName: packagename.current.value,
            noOfForms: noOfForms.current.value,
            days: days.current.value,
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
      //     duration: 3000,
      //     isClosable: true,
      //     position: "top",
      //   });
      // } else {
      //   toast({
      //     title: "Error",
      //     description: "Client not added",
      //     status: "error",
      //     duration: 3000,
      //     isClosable: true,
      //     position: "top",
      //   });
      // }
    } catch (error) {
      toast({
        title: "Error",
        description: "Client not added",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="packageName">Package Name</FormLabel>
          <Input
            ref={packagename}
            type="text"
            id="packageName"
            {...register("packageName")}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="noOfForms">No Of Forms</FormLabel>
          <Input
            ref={noOfForms}
            type="number"
            id="noOfForms"
            {...register("noOfForms")}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="days">Days</FormLabel>
          <Input ref={days} type="number" id="days" {...register("days")} />
        </FormControl>
        <Button onClick={handlesubmitpackage} type="submit">
          Add Package
        </Button>
      </VStack>
    </form>
  );
}

export default AddPackage;
