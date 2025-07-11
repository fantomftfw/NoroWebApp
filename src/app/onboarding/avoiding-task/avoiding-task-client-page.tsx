'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function AvoidingTaskClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const userName = searchParams.get('name') || localStorage.getItem('userName');
    if (userName) {
      setName(userName);
    } else {
      router.push('/onboarding/name');
    }
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [router, searchParams]);

  const handleBack = () => {
    router.push(`/onboarding/personalize?name=${encodeURIComponent(name)}`);
  };

  const handleContinue = () => {
    if (task.trim()) {
      localStorage.setItem('avoidingTask', task.trim());
      router.push(`/onboarding/planning?name=${encodeURIComponent(name)}&task=${encodeURIComponent(task.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && task.trim()) {
      handleContinue();
    }
  };

  const isButtonEnabled = task.trim().length > 0;

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#0D0E10] text-white flex justify-center">
      <div className="relative w-full max-w-[440px] h-full px-5">
        <div className="flex flex-col w-full pt-[62px]">
          
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <div className="w-12 h-12 rounded-full bg-[#202020]" />
                <button
                  onClick={handleBack}
                  className="absolute top-4 left-[15px] w-[18px] h-[17px] flex items-center justify-center"
                >
                  <Image src="/icons/arrow-back.svg" alt="Back" width={16} height={15} />
                </button>
              </div>
              <div className="w-full h-1 rounded-lg relative bg-[#2B282A]">
                <div className="w-[15.4%] h-1 rounded-lg bg-[#C6A9FB]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[26px] mt-2">
            <div className="flex flex-col items-start gap-4">
              <div className="w-[78px] h-[76px] rounded-2xl bg-[#2B282A] flex items-center justify-center self-center">
                <div className="relative w-[58px] h-[59px]">
                  <Image src="/icons/mascot-happy.svg" alt="Noro" width={58} height={59} />
                </div>
              </div>

              {/* Speech Bubble Container with Arrow */}
              <div className="relative bg-[#16171A] border border-[#2B2B2B] rounded-lg p-5 w-full">
                {/* Arrow */}
                <div 
                  className="absolute w-0 h-0"
                  style={{
                    borderLeft: '11px solid transparent',
                    borderRight: '11px solid transparent',
                    borderBottom: '11px solid #2B2B2B',
                    top: '-11px',
                    left: 'calc(50% - 11px)'
                  }}
                />
                <div 
                  className="absolute w-0 h-0"
                  style={{
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderBottom: '10px solid #16171A',
                    top: '-10px',
                    left: 'calc(50% - 10px)'
                  }}
                />
                <div className="flex flex-col gap-2.5">
                  <p className="text-xl font-medium leading-[1.4] tracking-wide text-white/80">
                    What&apos;s that one thing {name}, that you have been avoiding lately?
                  </p>
                  <p className="text-sm font-normal leading-[1.57] tracking-wide text-white/60">
                    Don&apos;t worry about how big it feels - I&apos;ll break it down
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[33px] mt-8">
              <div className="w-full flex flex-col items-start px-[10px]">
                <div className="relative flex items-center w-full">
                  <input
                    ref={inputRef}
                    type="text"
                    value={task}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Declutter my desk"
                    className="flex-1 bg-transparent text-2xl font-normal leading-[1.67] tracking-wide text-white/95 placeholder:text-[#9D9D9D]/95 border-none outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={!isButtonEnabled}
                className={`w-full h-[54px] p-[10px] rounded-xl flex items-center justify-center transition-opacity duration-200 ${
                  isButtonEnabled ? "bg-white opacity-100" : "bg-[#232222]"
                }`}
              >
                <span className={`text-lg font-semibold tracking-wide ${
                  isButtonEnabled ? 'text-[#6023E0]' : 'text-white/60'
                }`}>
                  Continue
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 