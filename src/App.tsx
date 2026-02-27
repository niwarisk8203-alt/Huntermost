import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  List, 
  ArrowRightLeft, 
  Database, 
  Network, 
  GitBranch,
  Info,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { cn } from './lib/utils';

import { ArrayVisualizer, StackVisualizer, QueueVisualizer } from './components/LinearVisualizers';
import { LinkedListVisualizer } from './components/LinkedListVisualizer';
import { TreeVisualizer } from './components/TreeVisualizer';
import { GraphVisualizer } from './components/GraphVisualizer';

type StructureType = 'array' | 'stack' | 'queue' | 'linked-list' | 'tree' | 'graph';

interface StructureInfo {
  id: StructureType;
  name: string;
  category: 'linear' | 'non-linear';
  description: string;
  icon: React.ElementType;
  color: string;
}

const structures: StructureInfo[] = [
  {
    id: 'array',
    name: 'Array',
    category: 'linear',
    description: 'โครงสร้างข้อมูลที่สมาชิกแต่ละตัวจะเชื่อมกับสมาชิกตัวถัดไปเพียงตัวเดียวและมีลำดับที่ต่อเนื่อง เก็บข้อมูลในหน่วยความจำที่เรียงต่อกัน',
    icon: Database,
    color: 'bg-blue-500',
  },
  {
    id: 'stack',
    name: 'Stack',
    category: 'linear',
    description: 'โครงสร้างข้อมูลเชิงเส้นที่ทำงานแบบ LIFO (Last-In-First-Out) โดยสมาชิกที่เข้าทีหลังสุดจะถูกนำออกก่อน',
    icon: Layers,
    color: 'bg-purple-500',
  },
  {
    id: 'queue',
    name: 'Queue',
    category: 'linear',
    description: 'โครงสร้างข้อมูลเชิงเส้นที่ทำงานแบบ FIFO (First-In-First-Out) โดยสมาชิกที่เข้าก่อนจะถูกนำออกก่อน',
    icon: ArrowRightLeft,
    color: 'bg-emerald-500',
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    category: 'linear',
    description: 'โครงสร้างข้อมูลที่สมาชิกแต่ละตัวเชื่อมโยงกันด้วยพอยน์เตอร์ ไม่จำเป็นต้องเก็บในหน่วยความจำที่เรียงต่อกัน',
    icon: List,
    color: 'bg-orange-500',
  },
  {
    id: 'tree',
    name: 'Tree',
    category: 'non-linear',
    description: 'โครงสร้างที่ไม่มีคุณสมบัติของเชิงเส้น สามารถใช้แสดงความสัมพันธ์ของข้อมูลที่ซับซ้อนได้มากกว่า โดยข้อมูลหนึ่งตัวมีความสัมพันธ์กับข้อมูลอื่นได้หลายตัวในลักษณะลำดับชั้น',
    icon: GitBranch,
    color: 'bg-indigo-500',
  },
  {
    id: 'graph',
    name: 'Graph',
    category: 'non-linear',
    description: 'โครงสร้างข้อมูลไม่เชิงเส้นที่ประกอบด้วยเซตของโหนด (Vertices) และเส้นเชื่อม (Edges) ที่แสดงความสัมพันธ์ระหว่างโหนดเหล่านั้น',
    icon: Network,
    color: 'bg-rose-500',
  },
];

export default function App() {
  const [selected, setSelected] = useState<StructureType>('array');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentStructure = structures.find(s => s.id === selected)!;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 320 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col relative z-20"
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl tracking-tight text-slate-900"
            >
              DS Visualizer
            </motion.h1>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-8 overflow-y-auto py-4">
          <div>
            {sidebarOpen && (
              <h2 className="px-2 mb-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Linear Structures
              </h2>
            )}
            <div className="space-y-1">
              {structures.filter(s => s.category === 'linear').map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                    selected === s.id 
                      ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    selected === s.id ? s.color + " text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  )}>
                    <s.icon size={18} />
                  </div>
                  {sidebarOpen && <span className="font-medium">{s.name}</span>}
                </button>
              ))}
            </div>
          </div>

          <div>
            {sidebarOpen && (
              <h2 className="px-2 mb-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Non-Linear Structures
              </h2>
            )}
            <div className="space-y-1">
              {structures.filter(s => s.category === 'non-linear').map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                    selected === s.id 
                      ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    selected === s.id ? s.color + " text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  )}>
                    <s.icon size={18} />
                  </div>
                  {sidebarOpen && <span className="font-medium">{s.name}</span>}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-xl bg-slate-50",
            !sidebarOpen && "justify-center"
          )}>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Info size={16} />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-900 truncate">Learning Mode</p>
                <p className="text-[10px] text-slate-500 truncate">Interactive Guide</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-bottom border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className={cn("w-3 h-3 rounded-full", currentStructure.color)} />
            <h2 className="text-lg font-semibold text-slate-900">{currentStructure.name}</h2>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {currentStructure.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary text-sm py-1.5">Reset</button>
            <button className="btn-primary text-sm py-1.5">Randomize</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Info Card */}
            <motion.div 
              key={`${selected}-info`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className={cn("p-3 rounded-2xl text-white", currentStructure.color)}>
                  <currentStructure.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">What is a {currentStructure.name}?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {currentStructure.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Visualizer Area */}
            <div className="glass-card overflow-hidden min-h-[500px] flex flex-col">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Visualization</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                </div>
              </div>
              <div className="flex-1 relative bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    {selected === 'array' && <ArrayVisualizer />}
                    {selected === 'stack' && <StackVisualizer />}
                    {selected === 'queue' && <QueueVisualizer />}
                    {selected === 'linked-list' && <LinkedListVisualizer />}
                    {selected === 'tree' && <TreeVisualizer />}
                    {selected === 'graph' && <GraphVisualizer />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
