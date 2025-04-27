import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleSelection } from "@/components/auth/role-selection";

interface RoleSelectionWrapperProps {
  userData: {
    id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    user_type?: "BUYER" | "SELLER" | null;
    verification_status?: string;
  };
  onSelectRole: (role: "BUYER" | "SELLER") => Promise<{
    success: boolean;
    errors?: any;
    message?: string;
  }>;
}

export function RoleSelectionWrapper({ userData, onSelectRole }: RoleSelectionWrapperProps) {
  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {userData?.id ? "Complete Your Profile" : "Complete Your Registration"}
          </CardTitle>
          <CardDescription>
            Welcome{userData?.first_name ? ` ${userData.first_name}` : ""}! Please select how you'll
            be using our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RoleSelection onSelectRole={onSelectRole} />
        </CardContent>
      </Card>
    </div>
  );
}
