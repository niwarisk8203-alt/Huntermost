import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState<(number | string)[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState('');

  const addNode = () => {
    if (inputValue.trim() === '') return;
    setNodes([...nodes, inputValue]);
    setInputValue('');
  };

  const removeNode = (index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
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
          <button onClick={addNode} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Add Node
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-start overflow-x-auto pb-8 px-4">
        <div className="flex items-center gap-0">
          <AnimatePresence mode="popLayout">
            {nodes.map((item, index) => (
              <React.Fragment key={`${index}-${item}`}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.5, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5, x: 20 }}
                  className="flex items-center group"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                      <div className="w-16 h-16 flex items-center justify-center font-mono font-bold text-slate-700 border-r-2 border-slate-100">
                        {item}
                      </div>
                      <div className="w-8 h-16 bg-slate-50 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-400" />
                      </div>
                    </div>
                    <button 
                      onClick={() => removeNode(index)}
                      className="mt-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  {index < nodes.length - 1 ? (
                    <div className="w-12 h-0.5 bg-indigo-200 relative shrink-0">
                      <ArrowRight size={16} className="absolute -right-1 -top-[7px] text-indigo-300" />
                    </div>
                  ) : (
                    <div className="ml-4 px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-400 uppercase">
                      NULL
                    </div>
                  )}
                </motion.div>
              </React.Fragment>
            ))}
          </AnimatePresence>
          {nodes.length === 0 && (
            <div className="text-slate-300 italic text-sm">
              List is empty
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Linked List Structure</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Each node contains data and a pointer (reference) to the next node in the sequence.
        </p>
      </div>
    </div>
  );
};
