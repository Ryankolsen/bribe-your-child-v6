import { Prize } from "@/app/common-types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AddPrize } from "./add-prize";
import { DisplayPrizes } from "./display-prizes";
import ManagePoints from "./manage-points";

export default function BribeChildHome() {
  const { data, refetch } = useQuery<Prize>({
    queryKey: ["prizes"],
    queryFn: () => axios.get("/api/get-all-prizes").then((res) => res),
  });
  return (
    <>
      <div className="p-4 flex flex-col items-center">
        <ManagePoints />
        <AddPrize refetch={refetch} />
      </div>
      <DisplayPrizes data={data} refetch={refetch} />
    </>
  );
}
