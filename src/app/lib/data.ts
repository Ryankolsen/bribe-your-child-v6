import { sql } from "@vercel/postgres";
import { Environment } from "@/constants/constants";
import { TotalPoints } from "@/app/lib/definitions";
import { UUID } from "@/app/ui/components/temp-constants";
import { NextResponse } from "next/server";

export async function getTotalPointsRev() {
  const queryRecord: Record<string, any> = {
    dev: sql<TotalPoints>`SELECT points
                              FROM totalPoints_dev`,
    prod: sql<TotalPoints>`SELECT points
                               FROM totalPoints`,
  };
  const query = queryRecord[process.env.ENVIRONMENT as Environment];

  const { rows } = await query;
  console.log("rows", rows);

  return await rows[0].points;
}

export async function updateTotalPointsRev(pointValue: number) {
  console.log("query", process.env.ENVIRONMENT as Environment);
  if (!pointValue) return new Error("Point value required");
  try {
    if (process.env.ENVIRONMENT === "prod") {
      await sql`UPDATE totalpoints
                      SET Points=${Number(pointValue)}
                      WHERE uuid = ${UUID};`;
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  try {
    if (process.env.ENVIRONMENT === "dev") {
      await sql`UPDATE totalpoints_dev
                      SET Points=${Number(pointValue)}
                      WHERE uuid = ${UUID};`;
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
