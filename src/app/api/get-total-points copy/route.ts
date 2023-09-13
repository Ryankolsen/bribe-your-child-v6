import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = searchParams.get("dynamic");
  try {
    const { rows } = await sql`SELECT points FROM totalPoints`.then((res) => {
      return res;
    });
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
