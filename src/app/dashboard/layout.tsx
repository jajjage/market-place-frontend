import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="diagonal-lines-subtle flex h-screen w-full bg-[rgb(48,48,48)]">
      <SidebarProvider>{children}</SidebarProvider>
    </div>
  );
}
