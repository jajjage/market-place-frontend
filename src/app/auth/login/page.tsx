// app/auth/login/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginClient } from "@/app/auth/_components/login-client";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="flex min-h-screen w-screen items-center justify-center p-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <Card className="border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] backdrop-blur-sm">
          <CardHeader className="diagonal-lines-subtle border-b border-[rgba(143,242,93,0.1)] pb-6">
            <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="diagonal-lines-green space-y-4 pt-6">
            <LoginClient callbackUrl={callbackUrl} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
