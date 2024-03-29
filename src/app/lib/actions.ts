"use server";

import { getTotalPointsRev } from "../lib/data";
import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { UUID } from "../../constants/constants";
import OpenAI from "openai";

export async function updateTotalPointsRev(pointValue: number) {
  if (!pointValue) return new Error("Point value required");
  try {
    if (process.env.ENVIRONMENT === "prod") {
      await sql`UPDATE totalpoints
                      SET Points=${Number(pointValue)}
                      WHERE uuid = ${UUID};`;
      revalidatePath("/dashboard");
    }
  } catch (error) {
    return { totalPoints: 0, error: error };
  }
  try {
    if (process.env.ENVIRONMENT === "dev") {
      await sql`UPDATE totalpoints_dev
                      SET Points=${Number(pointValue)}
                      WHERE uuid = ${UUID};`;
      revalidatePath("/dashboard");
    }
  } catch (error) {
    return { totalPoints: 0, error: error };
  }
}

export async function updatePointsAddOnePoint() {
  const data = await getTotalPointsRev();
  const totalPoints = data?.data;
  const newTotalPoints = Number(totalPoints) + 1;
  await updateTotalPointsRev(newTotalPoints);
}

export async function UpdatePoints(formData: FormData) {
  const pointsEarned = formData.get("pointsEarned");
  const pointsLost = formData.get("pointsLost");
  const data = await getTotalPointsRev();
  const totalPoints = data?.data;
  const newTotalPoints =
    Number(totalPoints) + Number(pointsEarned) - Number(pointsLost);
  await updateTotalPointsRev(newTotalPoints);

  revalidatePath("/dashboard");

  console.log("points to be update to: ", newTotalPoints);
}

export async function addPrize(formData: FormData) {
  const newUuid = crypto.randomUUID();
  const prizeName = formData.get("prizeName");
  const pointValue = formData.get("pointValue");
  if (prizeName) {
    try {
      if (process.env.ENVIRONMENT === "dev") {
        const imageUrl = await fetchAiImage({
          imageDescription: prizeName.toString(),
        });

        await sql`INSERT INTO prizes_dev (uuid, point_value, description, User_Uuid, Link)
                          VALUES (${newUuid}, ${Number(
          pointValue
        )}, ${prizeName.toString()}, ${UUID}, ${imageUrl})`;
      }
      revalidatePath("/dashboard");
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    try {
      if (process.env.ENVIRONMENT === "prod")
        try {
          if (process.env.ENVIRONMENT === "prod") {
            await sql`INSERT INTO prizes (uuid, point_value, description, User_Uuid)
                              VALUES (${newUuid}, ${Number(
              pointValue
            )}, ${prizeName.toString()}, ${UUID})`;
          }
          revalidatePath("/dashboard");
        } catch (error) {
          return NextResponse.json({ error }, { status: 500 });
        }

      console.log("ended post");
      revalidatePath("/dashboard");
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }
}

export async function fetchAiImage({
  imageDescription,
}: {
  imageDescription: string;
}) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const prompt = `create a cartoon image of ${imageDescription} that is appropriate for a five year old`;

  console.log("starting");
  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
  });
  console.log("ending");

  return image.data[0].url;
}

export async function cashInPointsFromDB({
  pointValue,
}: {
  pointValue: number | undefined;
}) {
  const totalPoints = await getTotalPointsRev();
  if (pointValue) {
    const newTotalPoints = Number(totalPoints) - pointValue;

    await updateTotalPointsRev(newTotalPoints);
    console.log("points updated");
  }
}

export async function deletePrizeFromDB({ uuid }: { uuid: string }) {
  try {
    if (process.env.ENVIRONMENT === "dev") {
      await sql`DELETE
                      FROM prizes_dev
                      WHERE uuid = ${uuid}`;
    }
    if (process.env.ENVIRONMENT === "prod") {
      await sql`DELETE
                      FROM prizes
                      WHERE uuid = ${uuid}`;
    }
    revalidatePath("/dashboard");
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
