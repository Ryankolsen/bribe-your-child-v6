"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

type AddPrizeFormValues = {
  prizeName: string;
  pointValue: string;
};

export function AddPrize({ refetch }: { refetch: () => void }) {
  const { register, handleSubmit, reset } = useForm<AddPrizeFormValues>();

  const mutation = useMutation({
    mutationFn: ({
      newPoints,
      prizeName,
    }: {
      newPoints: number;
      prizeName: string;
    }) =>
      axios
        .post(`api/add-prize?pointValue=${newPoints}&prizeName=${prizeName}`)
        .then((res) => res),
    onSuccess: () => {
      refetch();
    },
  });

  function onSubmit(data: AddPrizeFormValues) {
    console.log({ data });
    mutation.mutate({
      newPoints: Number(data.pointValue),
      prizeName: data.prizeName,
    });
    reset();
  }
  return (
    <div className="pt-20">
      <form
        className="flex flex-col gap-4 w-full p-4 mt-5 bg-base-100 rounded-lg shadow-lg border-2 border-gray-950 "
        action=""
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col  ">
          <label className="text-left">
            Prize Name
            <input
              className="border-2 border-gray-300 m-4 p-2 rounded-lg"
              {...register("prizeName")}
            />
          </label>
          <label className="text-left">
            Pont Value
            <input
              {...register("pointValue")}
              className="border-2 border-gray-300 m-4 p-2 rounded-lg w-32"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-outline">
          Submit
        </button>
      </form>
    </div>
  );
}
