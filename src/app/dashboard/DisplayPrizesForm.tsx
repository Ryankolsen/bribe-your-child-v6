"use client";

import { TotalPrizesDb } from "@/app/lib/definitions";
import placeholderImage from "../../../public/alicorn.png";
import Image from "next/image";
import { cashInPointsFromDB, deletePrizeFromDB } from "@/app/lib/actions";

export default function DisplayPrizesForm({
  totalPrizesDb,
}: {
  totalPrizesDb: TotalPrizesDb;
}) {
  async function cashInPoints({
    pointValue,
    uuid,
  }: {
    pointValue: number | undefined;
    uuid: string | undefined;
  }) {
    if (pointValue && uuid) {
      await cashInPointsFromDB({ pointValue: pointValue });
      await deletePrizeFromDB({ uuid: uuid });
      console.log("cash in points");
    }
  }

  return (
    <div className="pt-20">
      <div className="flex flex-wrap justify-center gap-4 pt-6">
        {!totalPrizesDb?.success && <div>ERROR: {totalPrizesDb?.error}</div>}
        {totalPrizesDb?.success &&
          totalPrizesDb.data &&
          totalPrizesDb.data.map((prize) => {
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
                        cashInPoints({
                          pointValue: prize.point_value,
                          uuid: prize.uuid,
                        })
                      }
                      className="btn btn-primary"
                    >
                      Cash In Points
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => deletePrizeFromDB({ uuid: prize.uuid })}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
