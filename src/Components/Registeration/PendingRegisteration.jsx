import React from "react";

function PendingRegisteration() {
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
      name: "Registration Date",
      selector: (row) => row.registrationDate,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: "Caller",
      selector: (row) => row.caller,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Registration Status",
      selector: (row) => row.registrationStatus,
      sortable: true,
    },
  ];

  return <div>PendingRegisteration</div>;
}

export default PendingRegisteration;
