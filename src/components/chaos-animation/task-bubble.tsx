'use client';

import { motion } from 'framer-motion';

interface TaskBubbleProps {
  text: string;
  style: React.CSSProperties;
  tailDirection: 'left' | 'right';
}

const TaskBubble: React.FC<TaskBubbleProps> = ({ text, style, tailDirection }) => {
  const tailClasses = {
    left: 'after:left-4',
    right: 'after:right-4',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="absolute px-5 py-2 bg-[#E3E2E7] rounded-2xl border border-white
                 after:content-[''] after:absolute after:w-0 after:h-0 after:bottom-[-10px]
                 after:border-l-[10px] after:border-l-transparent
                 after:border-r-[10px] after:border-r-transparent
                 after:border-t-[10px] after:border-t-[#E3E2E7]"
      style={style}
    >
      <div className={`absolute bottom-[-11px] w-5 h-3 bg-transparent ${tailDirection === 'left' ? 'left-3' : 'right-3'}`} />
      <p className="text-sm font-medium text-[#141414] tracking-[0.05em] whitespace-nowrap">
        {text}
      </p>
    </motion.div>
  );
};

export default TaskBubble; 