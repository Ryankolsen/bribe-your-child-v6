import { getPrizesFromDB, getTotalPointsRev } from "@/app/lib/data";
import ManagePointsForm from "@/app/dashboard/ManagePointsForm";
import AddPrizeForm from "@/app/dashboard/ManagePrizeForm";
import DisplayPrizesForm from "@/app/dashboard/DisplayPrizesForm";

export default async function Home() {
  const [totalPointsResponse, totalPrizesDb] = await Promise.all([
    getTotalPointsRev(),
    getPrizesFromDB(),
  ]);
  return (
    <>
      <div className="text-2xl font-bold text-black text-center p-4">
        {totalPointsResponse.success && totalPointsResponse.data && (
          <> Total Points: {totalPointsResponse.data} </>
        )}
        {!totalPointsResponse.success && (
          <> ERROR {totalPointsResponse.error}</>
        )}
      </div>
      <div className="flex flex-col max-w-lg m-auto content-center">
        <ManagePointsForm />
        <AddPrizeForm />
        {totalPrizesDb && <DisplayPrizesForm totalPrizesDb={totalPrizesDb} />}
      </div>
    </>
  );
}
