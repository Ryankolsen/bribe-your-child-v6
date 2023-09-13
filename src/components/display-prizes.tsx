"use client";

import { Prize } from "@/app/common-types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import placeholderImage from "../../public/alicorn.png";

export function DisplayPrizes({
  data,
  refetch,
}: {
  data: Prize | undefined;
  refetch: () => void;
}) {
  const mutation = useMutation({
    mutationFn: ({ prizeUuid }: { prizeUuid: string }) =>
      axios
        .delete(`/api/delete-prize?prizeUuid=${prizeUuid}`)
        .then((res) => res),
    onSuccess: () => {
      refetch();
    },
  });

  console.log({ data });
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-6">
      {data?.data &&
        data?.data.rows.map((prize) => {
          return (
            <div
              key={prize.uuid}
              className="card card-compact w-96 bg-base-100 shadow-xl"
            >
              <figure>
                <Image
                  src={placeholderImage}
                  width={500}
                  height={500}
                  alt="Alicorn"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{prize.description}</h2>
                <p className=" text-lg text-gray-500">
                  Point Value: {prize.point_value}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Cash In Points</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => mutation.mutate({ prizeUuid: prize.uuid })}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
