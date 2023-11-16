"use client";

import { cashInPointsFromDB } from "@/app/lib/data";
import { Prizes } from "@/app/lib/definitions";
import placeholderImage from "../../../public/alicorn.png";
import Image from "next/image";

export default function DisplayPrizesForm({
  totalPrizes,
}: {
  totalPrizes: Prizes;
}) {
  async function cashInPoints() {
    await cashInPointsFromDB();
    console.log("cash in points");
  }

  console.log("totalPrizes: ", totalPrizes);

  return (
    <div className="pt-20">
      <button onClick={cashInPoints}>Click me</button>
      <div className="flex flex-wrap justify-center gap-4 pt-6">
        {totalPrizes &&
          totalPrizes.map((prize) => {
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
                    <button onClick={cashInPoints} className="btn btn-primary">
                      Cash In Points
                    </button>
                    <button className="btn btn-primary">DELETE</button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}