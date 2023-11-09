import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { UUID } from "node:crypto";
import { Environment } from "@/constants/constants";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const prizeUuid = searchParams.get("prizeUuid");

  const queryRecord: Record<string, any> = {
    dev: sql`DELETE
                 FROM prizes_dev
                 WHERE uuid = ${prizeUuid as UUID}`,
    prod: sql`DELETE
                  FROM prizes
                  WHERE uuid = ${prizeUuid as UUID}`,
  };
  const query = queryRecord[process.env.ENVIRONMENT as Environment];
  try {
    if (!prizeUuid) return new Error("Prize uuid required");
    await query;
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(
    {
      message: `Successfully deleted ${prizeUuid}`,
    },
    { status: 200 }
  );
}
