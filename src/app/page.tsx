import { getPrizesFromDB, getTotalPointsRev } from "./lib/data";
import ManagePointsForm from "./ui/components/ManagePointsForm";
import AddPrizeForm from "./ui/components/ManagePrizeForm";
import DisplayPrizesForm from "./ui/components/DisplayPrizesForm";
import { TotalPrizesDb } from "./lib/definitions";

export default async function Home() {
  const totalPointsResponse = await getTotalPointsRev();
  const totalPrizesDb: TotalPrizesDb = await getPrizesFromDB();
  return (
    <>
      <div className="text-2xl font-bold text-black text-center p-4">
        {totalPointsResponse?.success && totalPointsResponse.data && (
          <> Total Points: {totalPointsResponse.data} </>
        )}
        {!totalPointsResponse?.success && (
          <> ERROR {totalPointsResponse?.error}</>
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
