import { getTotalPointsRev } from "@/app/lib/data";
import ManagePointsForm from "@/app/dashboard/ManagePointsForm";

export default async function Page() {
  const totalPoints = await getTotalPointsRev();
  return (
    <>
      <div className="text-2xl font-bold text-black">
        Total Points: {totalPoints}
      </div>

      <ManagePointsForm />
    </>
  );
}
