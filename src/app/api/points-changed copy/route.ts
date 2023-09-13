import { UUID } from "@/components/temp-constants";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const pointValue = searchParams.get("pointValue");
  console.log("pointValue", pointValue);
  try {
    if (!pointValue) throw new Error("Point value required");
    await sql`UPDATE totalpoints SET Points=${Number(
      pointValue
    )} WHERE uuid = ${UUID};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(
    {
      message: `Successfully added ${pointValue} points`,
    },
    { status: 200 }
  );
}
