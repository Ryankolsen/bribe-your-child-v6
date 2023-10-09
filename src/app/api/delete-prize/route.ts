import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { UUID } from "node:crypto";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const prizeUuid = searchParams.get("prizeUuid");
  try {
    if (!prizeUuid) throw new Error("Prize uuid required");

    // Use a parameterized query to safely pass the UUID value
    await sql`DELETE FROM prizes WHERE uuid = ${prizeUuid as UUID}`;
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
