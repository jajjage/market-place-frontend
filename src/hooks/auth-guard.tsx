import { LoadingSpinner } from "@/components/loading-spinner";
import { useAuth } from "@/providers/auth-context";

interface AuthGuardProps {
  children: React.ReactNode;
}
export function AuthGuard({ children }: AuthGuardProps) {
  const { isLoading, isAuthenticated, userError } = useAuth();

  // While we haven't checked storage, or the query is loading, show spinner
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // If not authenticated or query errored, show the error screen
  if (!isAuthenticated || userError) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Authentication Error</h1>
          <p className="text-gray-500">Please log in to access the dashboard</p>
        </div>
      </div>
    );
  }

  // If authenticated, render children
  return children;
}
