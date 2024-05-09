import { NextResponse, NextRequest } from 'next/server';
import { tickets } from '~/server/db/schema';
import {db } from '~/server/db';

export async function GET(){
    const data = await db.query.tickets.findMany();
    return NextResponse.json(data);
}

// Define a type for the request body
interface RequestBody {
    name: string;
    description: string;
    customer_name: string;
    priority: number;
}

// Define a type for the request
interface Request {
    json(): Promise<RequestBody>;
}

export async function POST(request: Request){
    try {
        const { name, description, customer_name, priority } = await request.json();
        const data = await db.insert(tickets).values({
                name,
                description,
                customer_name,
                priority
        }).execute();
        return NextResponse.json({
            success: true,
            data: data,
            message: "Ticket Created Successfully!",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while creating the ticket",
        });
    }
}