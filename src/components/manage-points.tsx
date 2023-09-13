"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

type ManagePointsFormValues = {
  pointsAdded: string;
  pointsLost: string;
};

interface TotalPointsResponse {
  data: {
    rows: { points: string }[];
  };
}
export default function ManagePoints() {
  const { register, handleSubmit, reset } = useForm<ManagePointsFormValues>();

  const { isLoading, error, data, refetch } = useQuery<TotalPointsResponse>({
    queryKey: ["totalPoints"],
    queryFn: () =>
      axios.get("/api/get-total-points/?dynamic=true").then((res) => res),
  });
  const totalPointsDisplay: number = Number(data?.data.rows[0].points);

  const mutation = useMutation({
    mutationFn: ({ newPoints }: { newPoints: number }) =>
      axios
        .post(`api/points-changed?pointValue=${newPoints}`)
        .then((res) => res),
    onSuccess: () => {
      refetch();
    },
  });

  function onSubmit(data: ManagePointsFormValues) {
    const newTotalPointValue = data.pointsAdded
      ? totalPointsDisplay + Number(data.pointsAdded)
      : data.pointsLost
      ? totalPointsDisplay - Number(data.pointsLost)
      : null;
    if (newTotalPointValue || newTotalPointValue === 0) {
      mutation.mutate({ newPoints: Number(newTotalPointValue) });
    }
    reset();
  }

  return (
    <div>
      <div className="text-2xl font-bold text-black">
        Total Points: {""}
        {isLoading || mutation.isLoading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          totalPointsDisplay
        )}
      </div>
      <div className="flex ">
        <form
          className="flex flex-col gap-4 w-full p-4 mt-10 bg-base-100 rounded-lg shadow-lg border-2 border-gray-950 "
          action=""
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col  ">
            <label className="text-left">
              Points Earned:
              <input
                className="border-2 border-gray-300 m-4 p-2 rounded-lg w-20 "
                {...register("pointsAdded")}
              />
            </label>
            <label>
              Points Lost:
              <input
                className="border-2 border-gray-300 m-4 p-2 rounded-lg ml-8 w-20"
                {...register("pointsLost")}
              />
            </label>
          </div>

          <button type="submit" className="btn btn-outline">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
