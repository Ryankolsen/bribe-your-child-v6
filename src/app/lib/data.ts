import { sql } from "@vercel/postgres";
import { Environment } from "@/constants/constants";
import { Prizes, TotalPoints } from "@/app/lib/definitions";
import { UUID } from "@/app/ui/components/temp-constants";

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

export async function getPrizesFromDB() {
  try {
    if (process.env.ENVIRONMENT === "dev") {
      const { rows } = await sql`SELECT *
                                     FROM prizes_dev
                                     WHERE user_uuid = ${UUID}`;
      return rows as Prizes | undefined;
    }
  } catch (error) {
    return [
      {
        uuid: "",
        point_value: undefined,
        description: "",
        imageData: undefined,
        error: error,
      },
    ];
  }
  try {
    if (process.env.ENVIRONMENT === "prod") {
      const { rows } = await sql`SELECT *
                                     FROM prizes_dev
                                     WHERE user_uuid = ${UUID}`;
      return rows as Prizes | undefined;
    }
  } catch (error) {
    return [
      {
        uuid: "",
        point_value: undefined,
        description: "",
        imageData: undefined,
        error: error,
      },
    ];
  }
}
