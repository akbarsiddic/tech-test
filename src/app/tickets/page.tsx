
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { db } from "~/server/db";
import { AddEdit } from "./add-edit-dialog";
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { ApproveDialog } from "./approve-dialog";

export default async function TicketsPage() {
    noStore();
    const data = await db.query.tickets.findMany({
      orderBy: (tickets, { desc }) => [desc(tickets.id)],
    });

     const { orgRole } = auth();
    
  return (
    <>
      <div className="flex justify-between">
        <h1>Tickets</h1>
        <AddEdit />
      </div>
      <div className="container-fluid mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
