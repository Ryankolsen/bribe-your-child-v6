"use server";

import { getTotalPointsRev, updateTotalPointsRev } from "@/app/lib/data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { UUID } from "@/app/ui/components/temp-constants";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function UpdatePoints(formData: FormData) {
  const pointsEarned = formData.get("pointsEarned");
  const pointsLost = formData.get("pointsLost");
  const totalPoints = await getTotalPointsRev();

  const newTotalPoints =
    totalPoints + Number(pointsEarned) - Number(pointsLost);
  await updateTotalPointsRev(newTotalPoints);

  revalidatePath("/dashboard");
  redirect("/dashboard");

  console.log("points to be update to: ", newTotalPoints);
}

export async function updatePrizes(formData: FormData) {
  const newUuid = crypto.randomUUID();
  const prizeName = formData.get("prizeName");
  const pointValue = formData.get("pointValue");
  if (prizeName) {
    try {
      if (process.env.ENVIRONMENT === "dev") {
        await sql`INSERT INTO prizes_dev (uuid, point_value, description, User_Uuid)
                          VALUES (${newUuid}, ${Number(
          pointValue
        )}, ${prizeName.toString()}, ${UUID})`;
      }
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    try {
      if (process.env.ENVIRONMENT === "prod") {
        await sql`INSERT INTO prizes (uuid, point_value, description, User_Uuid)
                          VALUES (${newUuid}, ${Number(
          pointValue
        )}, ${prizeName.toString()}, ${UUID})`;
      }
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }
}
