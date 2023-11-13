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
}
