import ManagePointsForm from "@/app/dashboard/ManagePointsForm";
import AddPrizeForm from "@/app/dashboard/ManagePrizeForm";
import DisplayPrizesForm from "@/app/dashboard/DisplayPrizesForm";
import { getPrizesFromDB, getTotalPointsRev } from "@/app/lib/data";

export default async function Home() {
  const totalPoints = await getTotalPointsRev();
  const totalPrizes = await getPrizesFromDB();
  return (
    <>
      <div className="text-2xl font-bold text-black text-center p-4">
        Total Points: {totalPoints}
      </div>
      <div className="flex flex-col max-w-lg m-auto content-center">
        <ManagePointsForm />
        <AddPrizeForm />
        <DisplayPrizesForm totalPrizes={totalPrizes} />
      </div>
    </>
  );
}
