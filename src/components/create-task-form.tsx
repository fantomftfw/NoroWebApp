// @/components/create-task-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import {
  createTask,
  TaskInput,
  TASK_DIFFICULTY,
  TASK_TYPE,
} from '@/lib/api/tasks';
import { cn } from '@/lib/utils';

// Reusable component for section headers
const SectionHeader = ({
  icon,
  title,
  tag,
  action,
}: {
  icon: string;
  title: string;
  tag?: string;
  action?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Image src={`/icons/${icon}.svg`} alt="" width={24} height={24} />
      <h3 className="text-lg font-semibold text-neutral-200">{title}</h3>
      {tag && (
        <span className="rounded-full border border-purple-500 bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-300">
          {tag}
        </span>
      )}
    </div>
    {action && <div className="text-sm font-semibold text-purple-400">{action}</div>}
  </div>
);

// Main component
export const CreateTaskForm = () => {
  const router = useRouter();
  const { getToken } = useAuth();
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<TaskInput['difficulty']>();
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [taskType, setTaskType] = useState<TaskInput['type']>(
    TASK_TYPE.PLANNED
  );

  const availableTags = ['Habit', 'Goal', 'Study', 'Work', 'Sport', 'Routine'];

  const handleToggleTag = (tag: string) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = async () => {
    if (!title || !difficulty) {
      // TODO: Add user-friendly validation feedback
      alert('Please enter a title and select a difficulty.');
      return;
    }
    setIsSaving(true);
    try {
      const token = await getToken();
      if (!token) throw new Error('Authentication token not found.');

      const taskInput: TaskInput = {
        title,
        difficulty,
        description,
        type: taskType,
        startUTCTimestamp: new Date().toISOString(),
        // The API currently doesn't support tags, but the state is ready
      };

      await createTask(token, taskInput);
      router.push('/home');
    } catch (error) {
      console.error('Failed to create task:', error);
      // TODO: Show an error message to the user
      alert('Failed to save the goal. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#110F15] pb-32 text-white">
      {/* Header */}
      <div className="bg-[#4B19B3] p-6 pt-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Add a new goal</h1>
          <div className="flex items-center gap-2">
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20">
              <Image src="/icons/mic.svg" alt="Mic" width={24} height={24} />
            </button>
            <button
              onClick={() => router.push('/home')}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30"
            >
              <Image src="/icons/close.svg" alt="Close" width={16} height={16} />
            </button>
          </div>
        </div>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Design task creation flow"
          className="mt-4 w-full bg-transparent text-xl font-semibold placeholder:text-white/70 focus:outline-none"
        />
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black/20 px-3 py-2">
          <Image src="/icons/calendar.svg" alt="Calendar" width={16} height={16} />
          <span className="text-sm font-medium text-white/80">Today</span>
        </div>
      </div>

      {/* Form Body */}
      <div className="space-y-4 p-4">
        {/* Goal Blueprint */}
        <div className="space-y-4 rounded-3xl bg-[#171717] p-6">
          <SectionHeader
            icon="goal-blueprint.svg"
            title="Goal blueprint"
            tag="AI"
          />
          <div className="flex items-center justify-between rounded-xl bg-[#232222] p-4">
            <p className="text-sm text-neutral-300">Let AI will guide you<br/>one step at a time</p>
            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6023E0] to-[#9C77FA] px-4 py-3 text-sm font-semibold">
              <Image
                src="/icons/generate-steps.svg"
                alt=""
                width={16}
                height={16}
              />
              <span>Generate steps</span>
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Tell us your goal..."
              className="w-full rounded-lg border border-[#343434] bg-[#232222] p-4 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
             <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#484254] p-2">
                <Image src="/icons/back-arrow.svg" alt="Submit" width={16} height={16} />
             </button>
          </div>
        </div>
        
        {/* Completion time */}
        <div className="flex items-center justify-between rounded-3xl bg-[#171717] p-6">
            <div className='flex items-center gap-3'>
                <Image src={`/icons/completion-time.svg`} alt="" width={24} height={24} />
                 <h3 className="text-lg font-semibold text-neutral-200">Completion time</h3>
                 <span className="rounded-full border border-purple-500 bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-300">AI</span>
            </div>
            <button className="text-base font-semibold text-purple-400">Add</button>
        </div>

        {/* Goal Difficulty */}
        <div className="space-y-4 rounded-3xl bg-[#171717] p-6">
          <SectionHeader
            icon="goal-difficulty.svg"
            title="Goal Difficulty"
            tag="AI"
          />
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { label: 'Quick', emoji: '🚀', value: TASK_DIFFICULTY.EASY },
                { label: 'Steady', emoji: '🌊', value: TASK_DIFFICULTY.MEDIUM },
                { label: 'Big', emoji: '🐘', value: TASK_DIFFICULTY.HARD },
              ] as const
            ).map(d => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                className={cn(
                  'flex flex-col items-center gap-3 rounded-lg bg-[#232222] p-4 transition-all',
                  difficulty === d.value
                    ? 'border border-purple-500 bg-purple-900/30'
                    : 'border border-transparent hover:bg-neutral-700'
                )}
              >
                <span className="text-3xl">{d.emoji}</span>
                <span className="font-medium">{d.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Tags */}
        <div className="space-y-4 rounded-3xl bg-[#171717] p-6">
            <SectionHeader icon="tags.svg" title="Tags" action={<button>Manage</button>} />
            <div className="flex flex-wrap gap-3">
                {availableTags.map(tag => (
                     <button
                     key={tag}
                     onClick={() => handleToggleTag(tag)}
                     className={cn(
                       'rounded-2xl border px-4 py-2 text-sm font-medium transition-colors',
                       tags.includes(tag)
                         ? 'border-purple-500 bg-purple-900/30 text-white'
                         : 'border-neutral-700 bg-[#232222] text-neutral-300 hover:bg-neutral-700'
                     )}
                   >
                     {tag}
                   </button>
                ))}
            </div>
        </div>

        {/* Description */}
        <div className="space-y-4 rounded-3xl bg-[#171717] p-6">
            <SectionHeader icon="description.svg" title="Description" />
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Task Description"
                className="w-full min-h-[100px] rounded-lg border border-[#343434] bg-[#232222] p-4 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>

      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#110F15] via-[#110F15] to-transparent p-6 pt-12">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full rounded-xl bg-[#6023E0] py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-neutral-600"
        >
          {isSaving ? 'Saving...' : 'Save goal'}
        </button>
      </div>
    </div>
  );
}; 