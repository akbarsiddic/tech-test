"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ApproveDialog } from "./approve-dialog";

export type Ticket = {
  id: number;
  name: string;
  description: string;
  customerName: string;
  priority: string;
};

export const columns: ColumnDef<Ticket>[] = [
  {
    header: "No",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Approval",
    accessorKey: "approved",
  },
  {
    header: "Customer Name",
    accessorKey: "customer_name",
  },
  {
    header: "Priority",
    accessorKey: "priority",
    cell: (row) => {
      const prio = row.getValue("priority") as string;
      const colorMap = {
        high: "bg-red-600 text-white fill-red-800",
        medium: "bg-orange-600 text-white fill-orange-800",
        low: "bg-green-600 text-white fill-green-800",
        default: "bg-gray-600 text-white fill-gray-800",
      };
      const color = colorMap[prio] || colorMap.default;

      return (
        <span
          className={`inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ${color}`}
        >
          <svg
            className={`h-1.5 w-1.5 ${color}`}
            viewBox="0 0 6 6"
            aria-hidden="true"
          >
            <circle cx={3} cy={3} r={3} />
          </svg>
          {String(prio)}
        </span>
      );
    },
  },
  {
    // button to approve ticket
    header: "Approve",
    accessorKey: "id",
    cell: (row) => {
      return <ApproveDialog props={row.getValue("id")} />;
    },
  },
];
