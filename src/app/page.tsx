import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <header className="p-4 flex justify-end">
        <UserButton afterSignOutUrl="/" />
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">ADHD Hero</h1>
        <p>Welcome to your personalized focus and task management space.</p>
      </main>
    </div>
  );
}
