import { NextResponse } from "next/server";
import { fetchHomeAlbum } from "@/services/home/home.services";

export async function GET() {
  try {
    const album = await fetchHomeAlbum();
    return NextResponse.json(album ?? null);
  } catch (error) {
    console.error("Error fetching home album", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

