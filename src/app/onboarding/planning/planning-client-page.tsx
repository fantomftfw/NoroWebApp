'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, TargetAndTransition, Variants } from 'framer-motion';
import { Loader2, Layers, Check } from 'lucide-react';
import Confetti from 'react-confetti';

interface SubTask {
  task: string;
  time: string;
}

interface MascotMessage {
  title: string;
  subtitle: string;
}

export default function PlanningClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [totalTime, setTotalTime] = useState<string | null>(null);
  const [showTimes, setShowTimes] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);
  const [animateMascot, setAnimateMascot] = useState(false);
  const [mascotMessage, setMascotMessage] = useState<MascotMessage>({
    title: 'Let me think...',
    subtitle: 'This will just take a moment.',
  });
   const [buttonText, setButtonText] = useState("Let's go!");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateSubTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userTask = searchParams.get('task') || localStorage.getItem('avoidingTask');
      if (!userTask) {
        router.push('/onboarding/avoiding-task');
        return;
      }
      
      const response = await fetch('/api/generate-subtasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: userTask }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate sub-tasks');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const loadedSubTasks = data.subTasks || [];
      
      const totalMinutes = loadedSubTasks.reduce((acc: number, sub: SubTask) => {
          const timeValue = parseInt(sub.time) || 0;
          return acc + timeValue;
      }, 0);

      setTotalTime(`${totalMinutes} mins`);
      setSubTasks(loadedSubTasks);
      setCompletedTasks(new Array(loadedSubTasks.length).fill(false));
      
      const userName = searchParams.get('name') || localStorage.getItem('userName');
      setMascotMessage({
          title: `Let's make a plan for you, ${userName}`,
          subtitle: "I'll break down the task so we do one thing at a time"
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      setMascotMessage({ title: 'Oops!', subtitle: 'Something went wrong.'});
    } finally {
      setIsLoading(false);
    }
  }, [router, searchParams]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const userName = searchParams.get('name') || localStorage.getItem('userName');
    const userTask = searchParams.get('task') || localStorage.getItem('avoidingTask');

    if (userName) {
      setName(userName);
      localStorage.setItem('userName', userName);
    }
    if (userTask) {
      setTask(userTask);
      localStorage.setItem('avoidingTask', userTask);
    } else {
      router.push('/onboarding/avoiding-task');
      return;
    }

    generateSubTasks();

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [router, searchParams, generateSubTasks]);
  
  useEffect(() => {
    if (!isLoading && subTasks.length > 0) {
      const animationDuration = subTasks.length * 200; // 0.2s per item in ms
      const delay = 2000; // 2 seconds
      const timer = setTimeout(() => {
        setShowTimes(true);
        if (!completedTasks[0]) {
            setMascotMessage({
                title: "Let's start with an easy win!",
                subtitle: "Tap the circle to complete your first step."
            });
        }
      }, animationDuration + delay);
      return () => clearTimeout(timer);
    }
  }, [isLoading, subTasks, completedTasks]);

  const handleBack = () => {
    router.push(`/onboarding/avoiding-task?name=${encodeURIComponent(name)}`);
  };

  const handleContinue = () => {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      router.push('/');
  }

  const handleCompleteTask = (index: number) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[index] = !newCompletedTasks[index];
    setCompletedTasks(newCompletedTasks);

    if (newCompletedTasks[index]) {
        setAnimateMascot(true);
        setShowConfetti(true);
    }

    const isFirstCompletion = !completedTasks[0] && newCompletedTasks[0];
    if (isFirstCompletion) {
        setMascotMessage({
            title: "Nice! See how easy that felt?",
            subtitle: "Imagine turning all your overwhelming tasks into simple victories."
        });
        setButtonText("Unlock My Full Plan");
    }
  };

  const mascotAnimControls: TargetAndTransition = {
    y: [0, -8, 0],
    scale: [1, 1.05, 1],
    rotate: [0, 3, -3, 3, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    }
  };

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const progressTarget = useMemo(() => {
    if (searchParams.get('name') && searchParams.get('task')) return '100%';
    return '83.3%';
  }, [searchParams]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0D0E10] text-white flex justify-center">
       {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
          gravity={0.4}
          initialVelocityY={35}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      <div className="relative w-full max-w-[440px] h-full px-5 flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 pt-[62px]">
          <div className="flex items-center w-full gap-4">
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 rounded-full bg-[#202020]" />
              <button onClick={handleBack} className="absolute top-4 left-[15px] w-[18px] h-[17px] flex items-center justify-center">
                  <Image src="/icons/arrow-back.svg" alt="Back" width={16} height={15} />
              </button>
            </div>
            <div className="w-full h-1 rounded-lg relative bg-[#2B282A]">
              <motion.div 
                className="h-1 rounded-lg bg-[#C6A9FB]"
                initial={{ width: '66.6%' }}
                animate={{ width: progressTarget }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-5 mt-2 flex-grow overflow-y-auto pb-24 no-scrollbar">
          <div className="flex items-start gap-4">
            <motion.div 
                className="w-[78px] h-[76px] rounded-2xl bg-[#2B282A] flex-shrink-0 flex items-center justify-center"
                animate={animateMascot ? mascotAnimControls : {}}
                onAnimationComplete={() => setAnimateMascot(false)}
            >
              <Image src="/icons/mascot-happy.svg" alt="Noro Mascot" width={58} height={59} />
            </motion.div>
            <div className="relative bg-[#16171A] border border-[#2B2B2B] rounded-lg p-5 w-full">
              <div className="absolute w-0 h-0" style={{borderTop: '10px solid transparent',borderBottom: '10px solid transparent',borderRight: '10px solid #16171A',top: '28px',left: '-10px'}}/>
              <div className="flex flex-col gap-2.5">
                <p className="text-xl font-medium leading-[1.4] tracking-wide text-white/80">
                  {isLoading ? 'Let me think...' : mascotMessage.title}
                </p>
                <p className="text-sm font-normal leading-[1.57] tracking-wide text-white/60">
                  {isLoading ? 'This will just take a moment.' : mascotMessage.subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full bg-[#171717] rounded-2xl p-5 flex justify-between items-center">
            <p className="text-2xl font-bold leading-tight text-white/95">{task}</p>
            <AnimatePresence>
              {totalTime && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <Layers size={16} />
                    <span>{totalTime}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center w-full h-48">
              <Loader2 className="animate-spin text-purple-400" size={48} />
            </div>
          )}
          
          {error && (
             <div className="flex flex-col justify-center items-center w-full h-48 text-center text-red-400">
                <p>{error}</p>
                <button 
                    onClick={() => router.push('/onboarding/avoiding-task')}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
                >
                    Try again
                </button>
            </div>
          )}

          {!isLoading && !error && (
            <div className="flex flex-col gap-2 w-full">
              <motion.div 
                className="flex items-center gap-2 text-[#C6A9FB]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Layers size={20} />
                <h2 className="text-xl font-bold leading-tight">Your plan</h2>
              </motion.div>
              <motion.ul
                className="w-full space-y-3"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {subTasks.map((sub, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <div className="bg-[#2B282A] rounded-xl p-4 flex items-center justify-between gap-4">
                      {/* Task Text */}
                      <p className={`text-white/90 transition-all ${completedTasks[index] ? 'line-through text-white/50' : ''}`}>
                        {sub.task}
                      </p>
                      
                      {/* Time and Checkbox */}
                      <div className="flex items-center gap-4">
                        <AnimatePresence>
                          {showTimes && (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.5 }}
                              className="text-sm text-neutral-400 whitespace-nowrap"
                            >
                              {sub.time}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div
                          onClick={() => handleCompleteTask(index)}
                          className="w-6 h-6 rounded-full border-2 border-neutral-600 flex items-center justify-center cursor-pointer"
                        >
                          <AnimatePresence>
                            {completedTasks[index] && (
                              <motion.div
                                className="w-full h-full rounded-full bg-purple-500 border-2 border-purple-400 flex items-center justify-center"
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 90 }}
                              >
                                <Check size={16} className="text-white" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          )}

        </div>
        
        {/* Footer */}
        <div className="flex-shrink-0 w-full pb-8 pt-4">
          <button
              onClick={handleContinue}
              className="w-full p-[10px] rounded-xl flex items-center justify-center bg-white"
            >
              <span className="text-lg font-semibold leading-5 tracking-[0.05em] text-[#6023E0]">
                {buttonText}
              </span>
            </button>
        </div>
      </div>
    </div>
  );
} 