import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Plus, RefreshCw } from 'lucide-react';

interface Node extends d3.SimulationNodeDatum {
  id: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
}

export const GraphVisualizer = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }
  ]);
  const [links, setLinks] = useState<Link[]>([
    { source: 'A', target: 'B' },
    { source: 'B', target: 'C' },
    { source: 'C', target: 'D' },
    { source: 'D', target: 'E' },
    { source: 'E', target: 'A' },
    { source: 'A', target: 'C' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const addNode = () => {
    if (!inputValue.trim() || nodes.find(n => n.id === inputValue)) return;
    setNodes([...nodes, { id: inputValue }]);
    setInputValue('');
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .call(d3.drag<SVGGElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    node.append("circle")
      .attr("r", 20)
      .attr("fill", "#fff")
      .attr("stroke", "#f43f5e")
      .attr("stroke-width", 2);

    node.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("font-family", "JetBrains Mono")
      .attr("font-weight", "bold")
      .attr("font-size", "12px")
      .text((d: any) => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, [nodes, links]);

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex gap-4 mb-8">
        <div className="flex-1 flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Node ID (e.g., F)..."
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button onClick={addNode} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Add Node
          </button>
          <button onClick={() => {
            setNodes([{ id: 'A' }, { id: 'B' }, { id: 'C' }]);
            setLinks([{ source: 'A', target: 'B' }, { source: 'B', target: 'C' }, { source: 'C', target: 'A' }]);
          }} className="btn-secondary flex items-center gap-2">
            <RefreshCw size={18} /> Reset
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-slate-50/30 rounded-2xl border border-dashed border-slate-200 overflow-hidden">
        <svg ref={svgRef} width="600" height="400" className="max-w-full h-auto" />
      </div>

      <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Graph Structure</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          A non-linear structure consisting of nodes (vertices) and edges that connect them.
        </p>
      </div>
    </div>
  );
};
