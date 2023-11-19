"use server";

import { getTotalPointsRev } from "@/app/lib/data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { UUID } from "@/app/ui/components/temp-constants";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Environment } from "@/constants/constants";

export async function updateTotalPointsRev(pointValue: number) {
  console.log("query", process.env.ENVIRONMENT as Environment);
  if (!pointValue) return new Error("Point value required");
  try {
    if (process.env.ENVIRONMENT === "prod") {
      await sql`UPDATE totalpoints
                      SET Points=${Number(pointValue)}
                      WHERE uuid = ${UUID};`;
    }
  } catch (error) {
    return { error: error };
  }
  try {
    if (process.env.ENVIRONMENT === "dev") {
      await sql`UPDATE totalpoints_dev
                      SET Points=${Number(pointValue)}
                      WHERE uuid = ${UUID};`;
    }
  } catch (error) {
    return { error: error };
  }
}

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

export async function addPrize(formData: FormData) {
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

export async function cashInPointsFromDB({
  pointValue,
}: {
  pointValue: number | undefined;
}) {
  pointValue && (await updateTotalPointsRev(pointValue));
  console.log("points updated");
}

export async function deletePrizeFromDB() {}

console.log("Delete");
