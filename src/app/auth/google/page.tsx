import GoogleAuthClient from "@/app/auth/_components/google-auth-client";

export default async function GoogleAuthPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { state, code } = await searchParams;

  // You can do any server‐side work here (e.g. validate state, fetch server data, etc.)
  // ...but do NOT call hooks here.

  return (
    <div>
      {/* Render the client‐side logic */}
      <GoogleAuthClient state={state} code={code} />
    </div>
  );
}
