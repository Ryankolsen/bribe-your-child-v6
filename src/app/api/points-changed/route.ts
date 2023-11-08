import { UUID } from "@/components/temp-constants";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

type Environment = "dev" | "prod";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const pointValue = searchParams.get("pointValue");

  const totalPointsDbRecord: Record<Environment, string> = {
    dev: "totalpoints_dev",
    prod: "totalpoints",
  };
  const totalPointsDb =
    totalPointsDbRecord[process.env.ENVIRONMENT as Environment];

  const queryRecord: Record<Environment, string> = {
    dev: `UPDATE totalpoints_dev
              SET Points=${Number(pointValue)}
              WHERE uuid = ${UUID};`,
    prod: `UPDATE totalpoints
               SET Points=${Number(pointValue)}
               WHERE uuid = ${UUID};`,
  };
  const query = queryRecord[process.env.ENVIRONMENT as Environment];
  console.log("query", query);
  try {
    if (!pointValue) throw new Error("Point value required");

    await sql`${query}`;
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
