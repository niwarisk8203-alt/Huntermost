import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Plus, RefreshCw } from 'lucide-react';

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

export const TreeVisualizer = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [root, setRoot] = useState<TreeNode | null>({
    value: 50,
    left: {
      value: 30,
      left: { value: 20 },
      right: { value: 40 }
    },
    right: {
      value: 70,
      left: { value: 60 },
      right: { value: 80 }
    }
  });
  const [inputValue, setInputValue] = useState('');

  const insert = (node: TreeNode | null, value: number): TreeNode => {
    if (!node) return { value };
    if (value < node.value) {
      node.left = insert(node.left || null, value);
    } else if (value > node.value) {
      node.right = insert(node.right || null, value);
    }
    return node;
  };

  const handleInsert = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    const newRoot = { ...root } as TreeNode;
    setRoot(insert(newRoot, val));
    setInputValue('');
  };

  useEffect(() => {
    if (!svgRef.current || !root) return;

    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", "translate(0, 40)");

    const treeLayout = d3.tree<TreeNode>().size([width, height - 100]);

    const hierarchy = d3.hierarchy(root, d => {
      const children = [];
      if (d.left) children.push(d.left);
      if (d.right) children.push(d.right);
      return children;
    });

    const treeData = treeLayout(hierarchy);

    // Links
    g.selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", 2)
      .attr("d", d3.linkVertical()
        .x(d => (d as any).x)
        .y(d => (d as any).y) as any
      );

    // Nodes
    const node = g.selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    node.append("circle")
      .attr("r", 20)
      .attr("fill", "#fff")
      .attr("stroke", "#4f46e5")
      .attr("stroke-width", 2);

    node.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("font-family", "JetBrains Mono")
      .attr("font-weight", "bold")
      .attr("font-size", "12px")
      .text(d => d.data.value);

  }, [root]);

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex gap-4 mb-8">
        <div className="flex-1 flex gap-2">
          <input 
            type="number" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value..."
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button onClick={handleInsert} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Insert
          </button>
          <button onClick={() => setRoot({ value: 50 })} className="btn-secondary flex items-center gap-2">
            <RefreshCw size={18} /> Reset
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-slate-50/30 rounded-2xl border border-dashed border-slate-200 overflow-hidden">
        <svg ref={svgRef} width="600" height="400" className="max-w-full h-auto" />
      </div>

      <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Binary Search Tree</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          A hierarchical structure where each node has at most two children. Left child is smaller, right child is larger.
        </p>
      </div>
    </div>
  );
};
