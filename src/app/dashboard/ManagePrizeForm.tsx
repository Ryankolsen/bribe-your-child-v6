import { addPrize } from "@/app/lib/actions";

export default function AddPrizeForm() {
  return (
    <div className="pt-20 max-w-sm m-auto">
      <form
        className="flex flex-col gap-4 w-full p-4 mt-5 bg-base-100 rounded-lg shadow-lg border-2 border-gray-950"
        action={addPrize}
      >
        <div className="flex flex-col">
          <label className="text-left">
            Prize Name
            <input
              name="prizeName"
              className="border-2 border-gray-300 m-4 p-2 rounded-lg"
            />
          </label>
          <label className="text-left">
            Pont Value
            <input
              name="pointValue"
              className="border-2 border-gray-300 m-4 ml-6 p-2 rounded-lg "
            />
          </label>
        </div>
        <button type="submit" className="btn btn-outline w-44 ml-28">
          Submit
        </button>
      </form>
    </div>
  );
}
