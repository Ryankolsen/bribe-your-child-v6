"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BribeChildHome from "@/app/ui/components/bribe-child-home";

export default function ClientSide({ totalPoints }: { totalPoints: number }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BribeChildHome totalPoints={totalPoints} />
    </QueryClientProvider>
  );
}
