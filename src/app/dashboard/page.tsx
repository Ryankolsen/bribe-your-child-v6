import { getTotalPointsRev } from "@/app/lib/data";
import UpdatePoints from "@/app/lib/actions";

export default async function Page() {
  const totalPoints = await getTotalPointsRev();
  return (
    <>
      <p>Total Points</p>
      <p>Total Points: {totalPoints} </p>
      <form action={UpdatePoints}>
        <label>
          Points:
          <input type="number" name="points" />
        </label>
        <button>Add Points</button>
      </form>
    </>
  );
}
