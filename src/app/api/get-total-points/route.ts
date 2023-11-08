import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { Environment } from "@/constants/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  searchParams.get("dynamic");

  const queryRecord: Record<string, any> = {
    dev: sql`SELECT points
                 FROM totalPoints_dev`,
    prod: sql`SELECT points
                  FROM totalPoints`,
  };
  const query = queryRecord[process.env.ENVIRONMENT as Environment];

  try {
    const { rows } = await query;
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
