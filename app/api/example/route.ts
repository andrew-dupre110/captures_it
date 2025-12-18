import { NextResponse } from "next/server";

export async function GET() {
  // Example data
  const data = { message: "Hello from the API!" };
  return NextResponse.json(data);
}
