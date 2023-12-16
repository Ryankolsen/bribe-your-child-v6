import { UpdatePoints } from "../../lib/actions";

export default async function ManagePointsForm() {
  return (
    <>
      <div className="flex max-w-lg m-auto content-center">
        <form
          className="flex flex-col gap-4 w-full p-4 mt-10 bg-base-100 rounded-lg shadow-lg border-2 border-gray-950 "
          action={UpdatePoints}
        >
          <label className="text-left">
            Points Earned:
            <input
              className="border-2 border-gray-300 m-4 p-2 rounded-lg w-20 "
              type="number"
              name="pointsEarned"
            />
          </label>
          <label className="text-left">
            Points Lost:
            <input
              className="border-2 border-gray-300 m-4 p-2 rounded-lg ml-8 w-20"
              type="number"
              name="pointsLost"
            />
          </label>

          <button className="btn btn-outline w-44 m-auto">Update Points</button>
        </form>
      </div>
    </>
  );
}
