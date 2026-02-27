import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Search, ArrowRightLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export const ArrayVisualizer = () => {
  const [array, setArray] = useState<(number | string)[]>([10, 20, 30, 40, 50]);
  const [inputValue, setInputValue] = useState('');
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (inputValue.trim() === '') return;
    setArray([...array, inputValue]);
    setInputValue('');
  };

  const handleRemove = (index: number) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

  const handleSearch = () => {
    const index = array.indexOf(inputValue);
    if (index !== -1) {
      setHighlightIndex(index);
      setTimeout(() => setHighlightIndex(null), 2000);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex gap-4 mb-8">
        <div className="flex-1 flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value..."
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Add
          </button>
          <button onClick={handleSearch} className="btn-secondary flex items-center gap-2">
            <Search size={18} /> Search
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center overflow-x-auto pb-8">
        <div className="flex gap-2 p-4">
          <AnimatePresence mode="popLayout">
            {array.map((item, index) => (
              <motion.div
                key={`${index}-${item}`}
                layout
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  backgroundColor: highlightIndex === index ? '#4f46e5' : '#ffffff',
                  color: highlightIndex === index ? '#ffffff' : '#0f172a'
                }}
                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                className={cn(
                  "w-16 h-16 flex flex-col items-center justify-center border-2 border-slate-200 rounded-xl shadow-sm relative group",
                  highlightIndex === index ? "border-indigo-600" : "bg-white"
                )}
              >
                <span className="text-xs font-bold text-slate-400 absolute top-1 left-2">{index}</span>
                <span className="font-mono font-bold text-lg">{item}</span>
                <button 
                  onClick={() => handleRemove(index)}
                  className="absolute -top-2 -right-2 p-1 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Properties</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Length:</span>
            <span className="font-mono font-bold">{array.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Access:</span>
            <span className="font-mono font-bold text-indigo-600">O(1)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StackVisualizer = () => {
  const [stack, setStack] = useState<(number | string)[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState('');

  const push = () => {
    if (inputValue.trim() === '') return;
    setStack([...stack, inputValue]);
    setInputValue('');
  };

  const pop = () => {
    if (stack.length === 0) return;
    const newStack = [...stack];
    newStack.pop();
    setStack(newStack);
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex gap-4 mb-8">
        <div className="flex-1 flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value..."
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button onClick={push} className="btn-primary flex items-center gap-2">
            Push
          </button>
          <button onClick={pop} className="btn-secondary flex items-center gap-2 text-rose-600 border-rose-100 hover:bg-rose-50">
            Pop
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-center pb-8">
        <div className="w-48 border-x-4 border-b-4 border-slate-200 rounded-b-2xl p-4 flex flex-col-reverse gap-2 min-h-[300px] bg-slate-50/30">
          <AnimatePresence initial={false}>
            {stack.map((item, index) => (
              <motion.div
                key={`${index}-${item}`}
                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.8 }}
                className="h-12 bg-white border-2 border-slate-200 rounded-lg shadow-sm flex items-center justify-center font-mono font-bold text-slate-700 relative"
              >
                {item}
                {index === stack.length - 1 && (
                  <div className="absolute -right-16 flex items-center gap-2 text-indigo-600">
                    <ArrowRightLeft size={16} className="rotate-90" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Top</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {stack.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-slate-300 italic text-sm">
              Stack is empty
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">LIFO Principle</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Last-In-First-Out: The last element added is the first one to be removed.
        </p>
      </div>
    </div>
  );
};

export const QueueVisualizer = () => {
  const [queue, setQueue] = useState<(number | string)[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState('');

  const enqueue = () => {
    if (inputValue.trim() === '') return;
    setQueue([...queue, inputValue]);
    setInputValue('');
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    const newQueue = [...queue];
    newQueue.shift();
    setQueue(newQueue);
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex gap-4 mb-8">
        <div className="flex-1 flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value..."
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button onClick={enqueue} className="btn-primary flex items-center gap-2">
            Enqueue
          </button>
          <button onClick={dequeue} className="btn-secondary flex items-center gap-2 text-rose-600 border-rose-100 hover:bg-rose-50">
            Dequeue
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center pb-8 overflow-x-auto">
        <div className="flex items-center gap-4 min-h-[100px] p-8">
          <AnimatePresence initial={false} mode="popLayout">
            {queue.map((item, index) => (
              <React.Fragment key={`${index}-${item}`}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.5, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5, x: -50 }}
                  className="w-16 h-16 bg-white border-2 border-slate-200 rounded-xl shadow-sm flex items-center justify-center font-mono font-bold text-slate-700 relative shrink-0"
                >
                  {item}
                  {index === 0 && (
                    <div className="absolute -top-8 text-indigo-600 flex flex-col items-center">
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Front</span>
                      <ArrowRightLeft size={12} className="rotate-90" />
                    </div>
                  )}
                  {index === queue.length - 1 && (
                    <div className="absolute -bottom-8 text-emerald-600 flex flex-col items-center">
                      <ArrowRightLeft size={12} className="-rotate-90" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Rear</span>
                    </div>
                  )}
                </motion.div>
                {index < queue.length - 1 && (
                  <motion.div layout className="text-slate-200 shrink-0">
                    <ArrowRightLeft size={20} />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </AnimatePresence>
          {queue.length === 0 && (
            <div className="text-slate-300 italic text-sm">
              Queue is empty
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">FIFO Principle</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          First-In-First-Out: The first element added is the first one to be removed.
        </p>
      </div>
    </div>
  );
};
