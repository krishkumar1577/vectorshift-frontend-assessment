// TemplateBadge.js

import { useState } from 'react';
import { useStore } from './store';

export const TemplateBadge = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { loadTemplate, clearCanvas } = useStore((state) => ({
    loadTemplate: state.loadTemplate,
    clearCanvas: state.clearCanvas,
  }));

  const handleLoadTemplate = () => {
    loadTemplate();
    setShowMenu(false);
  };

  const handleClearCanvas = () => {
    if (window.confirm('Clear all nodes and connections?')) {
      clearCanvas();
      setShowMenu(false);
    }
  };

  return (
    <div className="absolute top-20 right-6 z-50">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold rounded-lg shadow-floating transition-all"
      >
        <span className="material-symbols-outlined text-base">auto_awesome</span>
        Templates
      </button>

      {showMenu && (
        <div className="absolute top-12 right-0 w-56 bg-white border border-border-light rounded-lg shadow-floating overflow-hidden">
          <div className="p-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-wide px-2 py-1 font-semibold">
              Quick Start
            </div>
            
            <button
              onClick={handleLoadTemplate}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md transition-colors group"
            >
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-purple-500 text-lg mt-0.5">dynamic_form</span>
                <div>
                  <div className="text-sm font-medium text-gray-900">Text Variables Demo</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    Dynamic handles with {`{{variables}}`}
                  </div>
                </div>
              </div>
            </button>

            <div className="h-px bg-gray-200 my-2"></div>

            <button
              onClick={handleClearCanvas}
              className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-md transition-colors group"
            >
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">delete_sweep</span>
                <div>
                  <div className="text-sm font-medium text-gray-900">Clear Canvas</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    Remove all nodes and connections
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
