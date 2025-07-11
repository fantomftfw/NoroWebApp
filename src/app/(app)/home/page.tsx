//
// THIS FILE IS NO LONGER A CLIENT COMPONENT.
// The client-side redirect logic has been moved to a separate component.
//

import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlusIcon } from '@/components/icons/plus-icon';
import { UserButton } from '@clerk/nextjs';
import { TaskList } from '@/components/task-list';

// Helper for formatting date
const getFormattedDate = () => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  const today = new Date();
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(today);
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(today);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);
  return { day, weekday, month };
};


export default function HomePage() {
  const { day, weekday, month } = getFormattedDate();

  return (
    <div className="relative h-screen bg-background text-white">
      <main className="h-full overflow-y-auto pb-40">
        <header className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
            <div>
              <h1 className="text-2xl font-bold">{weekday}</h1>
              <p className="text-sm text-neutral-400">{`${month} ${day}`}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800">
              <Image src="/icons/calendar.svg" alt="Calendar" width={20} height={20} />
            </button>
          </div>
        </header>

        <section className="mt-4">
          <div className="mb-4 flex items-center justify-between px-4">
            <h2 className="text-lg font-semibold text-neutral-300">Today's goals</h2>
            <button>
              <Image src="/icons/filter.svg" alt="Filter" width={24} height={24} />
            </button>
          </div>
           <Suspense fallback={<p className="px-4 text-neutral-400">Loading tasks...</p>}>
             <TaskList />
           </Suspense>
        </section>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-4 z-50 flex items-center gap-3">
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/60 backdrop-blur-md transition-transform hover:scale-105">
          <Image
            src="/icons/mic.svg"
            alt="Use microphone"
            width={28}
            height={28}
          />
        </button>
        <Link
          href="/tasks/new"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#6023E0] shadow-lg transition-transform hover:scale-105"
        >
          <PlusIcon className="h-8 w-8 text-white" />
        </Link>
      </div>
    </div>
  );
} 