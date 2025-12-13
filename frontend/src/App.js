import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { TemplateBadge } from './TemplateBadge';
import { ReactFlowProvider } from 'reactflow';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [pipelineName, setPipelineName] = useState('Pipeline Builder');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleNameChange = (e) => {
    setPipelineName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (!pipelineName.trim()) {
      setPipelineName('Pipeline Builder');
    }
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNameBlur();
    } else if (e.key === 'Escape') {
      setPipelineName(pipelineName);
      setIsEditing(false);
    }
  };

  return (
    <ReactFlowProvider>
    <div className={`h-screen flex flex-col overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-background-light text-gray-900'} transition-colors duration-200`}>
      <header className={`flex flex-col z-50 shadow-sm border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-border-light bg-surface-light'}`}>
        {/* Main Header */}
        <div className="h-14 flex items-center justify-between px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-sm">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg">
              <span className="material-symbols-outlined">home</span>
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">VectorShift</span>
            <span className="text-gray-400">/</span>
            <div className="font-semibold text-gray-900 flex items-center gap-2">
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={pipelineName}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                  onKeyDown={handleNameKeyDown}
                  className="px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ minWidth: '150px' }}
                />
              ) : (
                <>
                  {pipelineName}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="material-symbols-outlined text-gray-400 text-base hover:text-gray-600 cursor-pointer"
                  >
                    edit
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1.5 text-sm font-medium border border-border-light rounded-md hover:bg-gray-50 transition-colors"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 border border-border-light rounded-md hover:bg-gray-50">
              <span className="material-symbols-outlined text-base">share</span> Share
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-md">
              <span className="material-symbols-outlined text-base">check</span> Saved
            </button>
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        <PipelineToolbar />
        <PipelineUI darkMode={darkMode} />
        <SubmitButton />
        <TemplateBadge />
      </div>
    </div>
    </ReactFlowProvider>
  );
}

export default App;
