// toolbar.js

import { DraggableNode } from './draggableNode';
import { useState } from 'react';

export const PipelineToolbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            {/* Sidebar */}
            <aside className="w-16 bg-surface-light border-r border-border-light flex flex-col items-center py-4 gap-6 z-40">
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors group relative"
                >
                    <span className="text-2xl">+</span>
                    <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {isExpanded ? 'Hide Nodes' : 'Show Nodes'}
                    </span>
                </button>
                
                <div className="w-8 h-[1px] bg-gray-200"></div>
                
                <nav className="flex flex-col gap-4 w-full items-center">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary hover:bg-gray-50 transition-colors" title="Cloud">
                        ☁
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary hover:bg-gray-50 transition-colors" title="API">
                        🌐
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary hover:bg-gray-50 transition-colors" title="Code">
                        &lt;/&gt;
                    </button>
                </nav>
            </aside>

            {/* Expandable Node Palette */}
            {isExpanded && (
                <div className="w-64 bg-surface-light border-r border-border-light p-4 overflow-y-auto z-40">
                    <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center justify-between">
                        Node Palette
                        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full font-normal">9</span>
                    </h2>
                    <div className="space-y-2">
                        <div className="text-xs text-gray-500 font-medium mb-2">ORIGINAL NODES</div>
                        <DraggableNode type='customInput' label='Input' />
                        <DraggableNode type='llm' label='LLM' />
                        <DraggableNode type='customOutput' label='Output' />
                        <DraggableNode type='text' label='Text' />
                        
                        <div className="text-xs text-gray-500 font-medium mb-2 mt-4">CUSTOM NODES</div>
                        <DraggableNode type='transform' label='Transform' />
                        <DraggableNode type='filter' label='Filter' />
                        <DraggableNode type='api' label='API Call' />
                        <DraggableNode type='conditional' label='Conditional' />
                        <DraggableNode type='note' label='Note' />
                    </div>
                </div>
            )}
        </>
    );
};
