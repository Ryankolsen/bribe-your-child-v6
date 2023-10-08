import { UUID } from "@/components/temp-constants";
import { sql } from "@vercel/postgres";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const pointValue = searchParams.get("pointValue");
  const prizeName = searchParams.get("prizeName");

  if (!pointValue || !prizeName) {
    return NextResponse.json(
      { error: "Point value and prize name are required" },
      { status: 400 }
    );
  }

  const newUuid = crypto.randomUUID();

  const query = sql`INSERT INTO prizes (uuid, point_value, description, User_Uuid)
                   VALUES (${newUuid}, ${Number(
    pointValue
  )}, ${prizeName}, ${UUID})`;

  try {
    await query;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(
    {
      message: `Successfully added ${prizeName}`,
    },
    { status: 200 }
  );
}
