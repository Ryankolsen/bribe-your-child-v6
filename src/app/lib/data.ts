import { sql } from "@vercel/postgres";
import { Environment } from "@/constants/constants";
import { TotalPoints } from "@/app/lib/definitions";

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
