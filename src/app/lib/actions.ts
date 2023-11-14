"use server";

import { getTotalPointsRev, updateTotalPointsRev } from "@/app/lib/data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function UpdatePoints(formData: FormData) {
  const pointsEarned = formData.get("pointsEarned");
  const pointsLost = formData.get("pointsLost");
  const totalPoints = await getTotalPointsRev();

  const newTotalPoints =
    totalPoints + Number(pointsEarned) - Number(pointsLost);
  updateTotalPointsRev(newTotalPoints);

  revalidatePath("/dashboard");
  redirect("/dashboard");

  console.log("points to be update to: ", newTotalPoints);
}
