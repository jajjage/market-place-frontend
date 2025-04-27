import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription className="text-destructive">{message}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
