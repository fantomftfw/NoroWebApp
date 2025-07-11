import { MainNavigation } from "@/components/main-navigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-text-primary font-nohemi">
      <MainNavigation />
      <div className="flex-1">
        <main className="pb-24 md:pb-0">{children}</main>
      </div>
    </div>
  );
} 