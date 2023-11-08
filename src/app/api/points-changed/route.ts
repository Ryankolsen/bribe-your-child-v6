import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { Environment } from "@/constants/constants";
import { UUID } from "@/components/temp-constants";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const pointValue = searchParams.get("pointValue");

  const queryRecord: Record<string, any> = {
    dev: sql`UPDATE totalpoints_dev
                 SET Points=${Number(pointValue)}
                 WHERE uuid = ${UUID};`,
    prod: sql`UPDATE totalpoints
                  SET Points=${Number(pointValue)}
                  WHERE uuid = ${UUID};`,
  };
  const query = queryRecord[process.env.ENVIRONMENT as Environment];
  try {
    if (!pointValue) return new Error("Point value required");

    await query;
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
