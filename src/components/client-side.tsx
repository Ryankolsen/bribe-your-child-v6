"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BribeChildHome from "@/components/bribe-child-home";

export default function ClientSide() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BribeChildHome />
    </QueryClientProvider>
  );
}
