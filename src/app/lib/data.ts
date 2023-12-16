import { sql } from "@vercel/postgres";
import { Environment, UUID } from "../../constants/constants";
import { Prize, TotalPoints } from "../lib/definitions";

type TotalPointsDb = {
  success: boolean;
  data?: TotalPoints;
  error?: string;
};

export async function getTotalPointsRev() {
  const queryRecord: Record<string, any> = {
    dev: sql<TotalPointsDb>`SELECT points
                                FROM totalPoints_dev`,
    prod: sql<TotalPointsDb>`SELECT points
                                 FROM totalPoints`,
  };

  try {
    const query = queryRecord[process.env.ENVIRONMENT as Environment];

    const { rows } = await query;

    return {
      success: true,
      data: await rows[0].points,
    };
  } catch (error) {
    console.log("NEW ERROR", error as Error);
    return {
      success: false,
      error: "An error occurred while fetching total points.",
    };
  }
}

export async function getPrizesFromDB() {
  try {
    if (process.env.ENVIRONMENT === "dev") {
      const { rows } = await sql<Prize>`SELECT *
                                            FROM prizes_dev
                                            WHERE user_uuid = ${UUID}`;
      return { success: true, data: rows };
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while fetching total prizes",
    };
  }
  try {
    if (process.env.ENVIRONMENT === "prod") {
      const { rows } = await sql<Prize>`SELECT *
                                            FROM prizes_dev
                                            WHERE user_uuid = ${UUID}`;
      return { success: true, data: rows };
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while fetching total prizes",
    };
  }
}
