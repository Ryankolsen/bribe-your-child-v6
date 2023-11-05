"use client";

import { Prize } from "@/app/common-types";
import { useMutation, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import placeholderImage from "../../public/alicorn.png";
import { TotalPointsResponse } from "@/components/total-points-response";

export function DisplayPrizes({
  prizeData,
  refetch,
  totalPointsQuery,
}: {
  prizeData: Prize | undefined;
  refetch: () => void;
  totalPointsQuery: UseQueryResult<TotalPointsResponse>;
}) {
  const totalPoints = totalPointsQuery.data?.data.rows[0].points;

  const deletePrize = useMutation({
    mutationFn: ({ prizeUuid }: { prizeUuid: string }) =>
      axios
        .delete(`/api/delete-prize?prizeUuid=${prizeUuid}`)
        .then((res) => res),
    onSuccess: () => {
      refetch();
      totalPointsQuery.refetch();
    },
  });

  const newPoints = useMutation({
    mutationFn: ({ newPoints }: { newPoints: number }) =>
      axios
        .post(`api/points-changed?pointValue=${newPoints}`)
        .then((res) => res),
    onSuccess: () => {
      refetch();
    },
  });

  function handleCashInPoints({
    prizeUuid,
    prizeValue,
  }: {
    prizeUuid: string;
    prizeValue: number;
  }) {
    if (prizeValue) {
      const newPointValue = Number(totalPoints) - prizeValue;

      deletePrize.mutate({ prizeUuid });
      prizeValue
        ? newPoints.mutate({
            newPoints: newPointValue,
          })
        : null;
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 pt-6">
      {prizeData?.data &&
        prizeData?.data.rows.map((prize) => {
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
                  <button
                    onClick={() =>
                      handleCashInPoints({
                        prizeUuid: prize.uuid,
                        prizeValue: prize.point_value,
                      })
                    }
                    className="btn btn-primary"
                  >
                    Cash In Points
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      deletePrize.mutate({ prizeUuid: prize.uuid })
                    }
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
