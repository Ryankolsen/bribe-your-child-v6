"use client";
import { testAi } from "@/app/lib/actions";

export default function GetApiResponse() {
  function hitChatApi() {
    testAi();
  }

  return <button onClick={hitChatApi}> click</button>;
}
