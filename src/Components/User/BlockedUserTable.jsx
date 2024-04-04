import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  VStack,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";

function BlockUserTable({ data }) {
  const { register, handleSubmit } = useForm();
  const [searchedData, setSearchedData] = useState(data);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobileNo,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Block Date",
      selector: (row) => row.blockDate,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const onSubmit = (formData) => {
    const filteredData = data.filter((item) => {
      // Implement your search logic here
      // Example: filter by name
      return item.name.toLowerCase().includes(formData.name.toLowerCase());
    });
    setSearchedData(filteredData);
  };

  return (
    <VStack spacing={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input type="text" id="name" {...register("name")} />
          </FormControl>
          {/* Add more search fields as needed */}
          <Button type="submit">Search</Button>
        </HStack>
      </form>
      <DataTable columns={columns} data={searchedData} />
    </VStack>
  );
}

export default BlockUserTable;
