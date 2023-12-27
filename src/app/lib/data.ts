import { sql } from "@vercel/postgres";
import { Prize, TotalPoints } from "../lib/definitions";
import { UUID } from "@/constants/constants";

type TotalPointsDb = {
  success: boolean;
  data?: TotalPoints;
  error?: string;
};

type totalPoints = {
  points: number[];
};

export async function getTotalPointsRev() {
  try {
    if (process.env.ENVIRONMENT_NON_DB === "dev") {
      const result = await sql`SELECT points
                                     FROM totalPoints
                                     WHERE Uuid = ${UUID}`;

      const { rows } = result;
      return {
        success: true,
        data: rows[0].points,
      };
    }
  } catch (error) {
    console.log("NEW ERROR", error as Error);
    return {
      success: false,
      error: "An error occurred while fetching total points.",
    };
  }
  try {
    if (process.env.ENVIRONMENT_NON_DB === "prod") {
      const { rows } = await sql<totalPoints>`SELECT points
                                                  FROM totalPoints
                                                  WHERE Uuid = ${UUID}`;

      return {
        success: true,
        data: rows[0].points,
      };
    }
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
    if (process.env.ENVIRONMENT_NON_DB === "dev") {
      const { rows } = await sql<Prize>`SELECT *
                                            FROM prizes_dev
                                            WHERE User_uuid = ${UUID}`;
      console.log("ROWS", rows);
      return { success: true, data: rows };
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while fetching total prizes",
    };
  }
  try {
    if (process.env.ENVIRONMENT_NON_DB === "prod") {
      const { rows } = await sql<Prize>`SELECT *
                                            FROM prizes
                                            WHERE User_uuid = ${UUID}`;
      return { success: true, data: rows };
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while fetching total prizes",
    };
  }
}
