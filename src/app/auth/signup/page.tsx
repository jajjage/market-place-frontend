// app/auth/signup/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupClient } from "@/app/auth/_components/signup-client";

export default async function SignupPage() {
  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center py-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupClient />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
