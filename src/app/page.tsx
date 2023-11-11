import ClientSide from "@/components/client-side";
import ServerSide from "@/app/server-side/page";

export default function Home() {
  return (
    <>
      <ServerSide />
      <ClientSide />
    </>
  );
}
