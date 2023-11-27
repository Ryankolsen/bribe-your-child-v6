"use client";
import { getPrizesFromDB, getTotalPointsRev } from "@/app/lib/data";
import ManagePointsForm from "@/app/dashboard/ManagePointsForm";
import AddPrizeForm from "@/app/dashboard/ManagePrizeForm";
import DisplayPrizesForm from "@/app/dashboard/DisplayPrizesForm";
import { useSession } from "next-auth/react";

export default async function Page() {
  const totalPoints = await getTotalPointsRev();
  const totalPrizes = await getPrizesFromDB();
  const { data } = useSession();

  return (
    <>
      <div className="text-2xl font-bold text-black">
        Total Points: {totalPoints.data}
      </div>
      <div className="flex flex-col max-w-lg m-auto content-center">
        <ManagePointsForm />
        <AddPrizeForm />
        <DisplayPrizesForm totalPrizesDb={totalPrizes} />
      </div>
    </>
  );
}
