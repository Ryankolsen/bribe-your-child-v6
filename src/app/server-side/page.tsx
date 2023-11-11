import { sql } from "@vercel/postgres";
import { Environment } from "@/constants/constants";

export default async function getTotalPointsServer() {
  const queryRecord: Record<string, any> = {
    dev: sql`SELECT points
                 FROM totalPoints_dev`,
    prod: sql`SELECT points
                  FROM totalPoints`,
  };
  const query = queryRecord[process.env.ENVIRONMENT as Environment];

  const { rows } = await query;

  console.log("getTotalPointsFromDB", await rows);

  return await rows;
}
