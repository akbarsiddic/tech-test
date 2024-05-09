import { NextResponse, NextRequest } from 'next/server';
import { tickets } from '~/server/db/schema';
import {db } from '~/server/db';
import { sql } from "drizzle-orm";

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    const id = params.id; 

    try {
        const data = await db
            .select()
            .from(tickets)
            .where(sql`${tickets.id} = ${id}`);
        
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while fetching the ticket",
        });
    }
}

// function to edit approve ticket
export async function POST(
    request: Request,
    { params }: { params: { id: string } },
) {
    const id = params.id;

    try {
        const { approved } = await request.json();
        let appr
        if(approved !== '1'){
             appr = false
        } else{
             appr = true
        }
        const data = await db
            .update(tickets)
            .set({ approved: appr })
            .where(sql`${tickets.id} = ${id}`)
            .execute();

        return NextResponse.json({
            success: true,
            data: data,
            message: "Ticket Approved Successfully!",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while approving the ticket",
        });
    }
}