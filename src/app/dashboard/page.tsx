import { getTotalPointsRev } from "@/app/lib/data";
import ManagePointsForm from "@/app/dashboard/ManagePointsForm";
import AddPrizeForm from "@/app/dashboard/ManagePrizeForm";

export default async function Page() {
  const totalPoints = await getTotalPointsRev();
  return (
    <>
      <div className="text-2xl font-bold text-black">
        Total Points: {totalPoints}
      </div>
      <div className="flex flex-col max-w-lg m-auto content-center">
        <ManagePointsForm />
        <AddPrizeForm />
      </div>
    </>
  );
}
