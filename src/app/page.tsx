import ClientSide from "@/components/client-side";
import getTotalPointsServer from "@/app/server-side/page";

export default async function Home() {
  const totalPoints = await getTotalPointsServer();
  console.log("totalPoints", totalPoints);
  return (
    <>
      <ClientSide />
    </>
  );
}
