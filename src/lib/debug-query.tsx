"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/lib/hooks/use-auth";
import { queryClient } from "@/lib/query-client";

export const QueryDebugger = () => {
  // Force the current user query to execute
  const { data: currentUser, isLoading, isError, error } = useCurrentUser({ enabled: true });

  useEffect(() => {
    // Log the current query cache to console
    console.log("Current Query Cache:", queryClient.getQueryCache().getAll());

    // Log if the currentUser query is in the cache
    const currentUserQuery = queryClient.getQueryCache().find({ queryKey: ["currentUser"] });
    console.log("CurrentUser Query in cache:", currentUserQuery ? "YES" : "NO");

    if (currentUserQuery) {
      console.log("CurrentUser Query state:", currentUserQuery.state);
    }
  }, []);

  return (
    <div style={{ display: "none" }}>
      {/* Hidden debug component */}
      Query Debugger Active
    </div>
  );
};
