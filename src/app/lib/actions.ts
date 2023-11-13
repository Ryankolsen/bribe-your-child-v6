"use server";

import { getTotalPointsRev, updateTotalPointsRev } from "@/app/lib/data";

export default async function UpdatePoints(formData: FormData) {
  const pointsDiff = formData.get("points");
  const totalPoints = await getTotalPointsRev();
  const newTotalPoints = totalPoints + Number(pointsDiff);
  updateTotalPointsRev(newTotalPoints);
  console.log("points to be update to: ", newTotalPoints);
}
