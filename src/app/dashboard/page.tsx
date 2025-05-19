import { RouteGuard } from "@/hooks/route-guard";
import UserDashboard from "./_components/user-dashboard";

export default function DashboardPage() {
  return (
    <RouteGuard allowedUserType="SELLER">
      <UserDashboard />
    </RouteGuard>
  );
}
