import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Spacer,
  Center,
} from "@chakra-ui/react";

function AddEmployees() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // You can handle form submission here
  };

  return (
    <>
      <Center mt={4} mb={4}>
        Add Employees
      </Center>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            <Box flex="1" mr={4}>
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <Input {...field} id="name" placeholder="Enter your name" />
                  )}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box flex="1" ml={4}>
              <FormControl isInvalid={errors.mobileno}>
                <FormLabel htmlFor="email">Mobile No</FormLabel>
                <Controller
                  name="text"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Mobile is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid Mobile address",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="mobile"
                      placeholder="Enter your Mobile"
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.mobile && errors.mobile.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>

          <Flex mt={4}>
            <Box flex="1" mr={4}>
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="designation">Email</FormLabel>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: "email is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      placeholder="Enter your email"
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box flex="1" ml={4}>
              <FormControl isInvalid={errors.branch}>
                <FormLabel htmlFor="branch">branch</FormLabel>
                <Controller
                  name="branch"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="branch"
                      placeholder="Enter branch name"
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.branch && errors.branch.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>

          <Flex mt={4}>
            <Box flex="1" ml={4}>
              <FormControl isInvalid={errors.desiganation}>
                <FormLabel htmlFor="branch">Desiganation</FormLabel>
                <Controller
                  name="desiganation"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="desiganation"
                      placeholder="Enter desiganation name"
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.desiganation && errors.desiganation.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box flex="1" ml={4}>
              <FormControl isInvalid={errors.address}>
                <FormLabel htmlFor="branch">Address</FormLabel>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="address"
                      placeholder="Enter address name"
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.address && errors.address.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>

          {/* Other fields similarly */}

          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}

export default AddEmployees;
