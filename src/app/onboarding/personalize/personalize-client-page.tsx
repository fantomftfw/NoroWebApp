'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskBubble from '@/components/chaos-animation/task-bubble';

interface Bubble {
  id: number;
  text: string;
  top: string;
  left: string;
  rotate: number;
  tailDirection: 'left' | 'right';
}

const predefinedBubbles: Omit<Bubble, 'id'>[] = [
  { text: "Do my laundry", top: '15%', left: '10%', rotate: -5, tailDirection: 'left' },
  { text: "Homework", top: '10%', left: '55%', rotate: 5, tailDirection: 'left' },
  { text: "Clean my room", top: '28%', left: '45%', rotate: -3, tailDirection: 'left' },
  { text: "Email list for leadgen", top: '40%', left: '15%', rotate: 3, tailDirection: 'left' },
  { text: "Plan tomorrow", top: '45%', left: '50%', rotate: 5, tailDirection: 'left' },
  { text: "Pay my rent", top: '58%', left: '8%', rotate: -4, tailDirection: 'right' },
  { text: "Christy’s wedding is on 10th", top: '65%', left: '35%', rotate: 3, tailDirection: 'left' },
  { text: "Call mom", top: '75%', left: '5%', rotate: 2, tailDirection: 'right' }
];

export default function PersonalizeClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const bubbleIndex = useRef(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const userName = searchParams.get('name') || localStorage.getItem('userName');
    if (userName) {
      setName(userName);
    } else {
      router.push('/onboarding/name');
    }

    let delay = 500; 

    const createBubble = () => {
      if (bubbleIndex.current >= predefinedBubbles.length) return;

      const newBubbleData = predefinedBubbles[bubbleIndex.current];
      const newBubble: Bubble = {
        id: bubbleIndex.current,
        ...newBubbleData
      };
      
      setBubbles(prev => [...prev, newBubble]);
      bubbleIndex.current++;
      
      if (bubbleIndex.current > 2) {
        delay = Math.max(80, delay * 0.8);
      }
      
      if (bubbleIndex.current < predefinedBubbles.length) {
        setTimeout(createBubble, delay);
      } else {
        setTimeout(() => setIsAnimationComplete(true), delay);
      }
    };

    const timeoutId = setTimeout(createBubble, delay);

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      clearTimeout(timeoutId);
    };
  }, [router, searchParams]);

  const handleBack = () => {
    router.push(`/onboarding/welcome?name=${encodeURIComponent(name)}`);
  };

  const handleContinue = () => {
    router.push(`/onboarding/avoiding-task?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0D0E10] text-white flex flex-col items-center">
      {/* Background Gradients */}
      <div
        className="absolute w-[309px] h-[309px] bg-[#BC43E8] opacity-[0.15]"
        style={{
          top: '134px',
          left: '5px',
          filter: 'blur(60.7px)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute w-[157px] h-[157px] bg-[#6B47FC] opacity-[0.15]"
        style={{
          top: '410px',
          left: '270px',
          filter: 'blur(60.7px)',
          borderRadius: '50%',
        }}
      />

      <div className="relative w-full max-w-[440px] h-full px-5 flex flex-col">
        {/* Top Section */}
        <div className="flex-shrink-0 pt-[62px]">
          {/* Header: Back Button + Progress Bar */}
          <div className="flex items-center w-full gap-4">
            <div className="relative flex-shrink-0 w-12 h-12">
              <div className="w-12 h-12 rounded-full bg-[#202020]" />
              <button
                onClick={handleBack}
                className="absolute top-4 left-[15px] w-[18px] h-[17px] flex items-center justify-center"
              >
                <Image src="/icons/arrow-back.svg" alt="Back" width={16} height={15} />
              </button>
            </div>
            <div className="w-full h-1 rounded-lg relative bg-[#2B282A]">
              <div className="w-[12%] h-1 rounded-lg bg-[#C6A9FB]" />
            </div>
          </div>
        </div>

        {/* Animation Spacer */}
        <div className="relative flex-grow w-full">
            <AnimatePresence>
                {bubbles.map((bubble) => (
                    <TaskBubble
                        key={bubble.id}
                        text={bubble.text}
                        tailDirection={bubble.tailDirection}
                        style={{
                            top: bubble.top,
                            left: bubble.left,
                            transform: `rotate(${bubble.rotate}deg)`,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>

        {/* Bottom Content Group */}
        <div className="flex-shrink-0 pb-8 flex flex-col gap-[27px]">
            <h1 className="text-[28px] font-medium leading-[1.357] tracking-[0.05em] text-white/90">
                Overwhelm? Chaos?{'\n'}
                Let’s do things your way,{'\n'}
                {name} 💪
            </h1>
            <button
                onClick={handleContinue}
                disabled={!isAnimationComplete}
                className={`w-full h-[54px] rounded-xl flex items-center justify-center bg-white transition-opacity duration-300 ${isAnimationComplete ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
            >
                <span className="text-lg font-semibold leading-5 tracking-[0.05em] text-[#6023E0]">
                Continue
                </span>
            </button>
        </div>
      </div>
    </div>
  );
} 