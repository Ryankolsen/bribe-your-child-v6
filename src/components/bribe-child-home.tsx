"use client";
import { Prize } from "@/app/common-types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AddPrize } from "./add-prize";
import { DisplayPrizes } from "./display-prizes";
import ManagePoints from "./manage-points";
import { signIn, useSession } from "next-auth/react";
import { TotalPointsResponse } from "@/components/total-points-response";

export default function BribeChildHome({
  totalPoints,
}: {
  totalPoints: number;
}) {
  const { data, refetch } = useQuery<Prize>({
    queryKey: ["prizes"],
    queryFn: () => axios.get("/api/get-all-prizes").then((res) => res),
  });
  const { data: session } = useSession();
  console.log(session?.user?.email);
  const totalPointsNow = totalPoints;

  function handleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" }).then((r) =>
      console.log(r)
    );
  }

  const totalPointsQuery = useQuery<TotalPointsResponse>({
    queryKey: ["totalPoints"],
    queryFn: () =>
      axios.get("/api/get-total-points/?dynamic=true").then((res) => res),
  });
  console.log("totalPointsNow", totalPointsNow);
  return (
    <>
      {session?.user?.email === "ryankolsen@gmail.com" ||
      session?.user?.email === "kristame6@gmail.com" ? (
        <>
          <div>TOTAL POINTS:{totalPointsNow}</div>
          <div className="p-4 flex flex-col items-center">
            <ManagePoints totalPointsQuery={totalPointsQuery} />
            <AddPrize refetch={refetch} />
          </div>
          <DisplayPrizes
            prizeData={data}
            refetch={refetch}
            totalPointsQuery={totalPointsQuery}
          />
        </>
      ) : (
        <div className="p-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-black">
            Please sign in to view your prizes - will only work for Krista and
            Ryan
          </h1>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      )}
    </>
  );
}
