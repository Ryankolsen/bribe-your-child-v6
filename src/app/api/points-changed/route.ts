import { UUID } from "@/components/temp-constants";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const pointValue = searchParams.get("pointValue");
  const totalPointsDb =
    process.env.ENVIRONMENT === "dev"
      ? "totalpoints_dev"
      : process.env.ENVIRONMENT === "prod"
      ? "totalpoints"
      : "";
  console.log("totalPointsDb", totalPointsDb);
  try {
    if (!pointValue) throw new Error("Point value required");
    totalPointsDb === "totalpoints_dev"
      ? await sql`UPDATE totalpoints_dev
                        SET Points=${Number(pointValue)}
                        WHERE uuid = ${UUID};`
      : await sql`UPDATE totalpoints
                        SET Points=${Number(pointValue)}
                        WHERE uuid = ${UUID};`;
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
