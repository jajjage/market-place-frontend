// app/auth/signup/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupClient } from "@/app/auth/_components/signup-client";

export default async function SignupPage() {
  return (
    <div className="container flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center py-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <Card className="border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] backdrop-blur-sm">
          <CardHeader className="diagonal-lines-subtle border-b border-[rgba(143,242,93,0.1)] pb-6">
            <CardTitle className="text-white">Create an account</CardTitle>
            <CardDescription className="text-gray-300">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupClient />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
