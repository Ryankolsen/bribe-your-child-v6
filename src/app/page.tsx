"use client";

import BribeChildHome from "@/components/bribe-child-home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BribeChildHome />
      </QueryClientProvider>
    </>
  );
}
