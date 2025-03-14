import React from "react";
import DataTable from "react-data-table-component";
import "./Table.css";

const Table = ({ data }) => {
  const columns = [
    { name: "Email", selector: (row) => row.email },
    { name: "Message", selector: (row) => row.message },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span className={row.status === "Resolved" ? "status-resolved" : "status-pending"}>
          {row.status}
        </span>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default Table;
