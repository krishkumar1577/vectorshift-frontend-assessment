import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { TemplateBadge } from './TemplateBadge';

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background-light text-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="flex flex-col z-50 shadow-sm border-b border-border-light bg-surface-light">
        {/* Top Black Bar */}
        <div className="h-10 bg-black text-white text-xs flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <span className="font-bold tracking-wider">VectorShift</span>
          </div>
          <div className="flex items-center gap-4">
            <span>13 days left in your trial</span>
            <div className="w-32 h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-1/3"></div>
            </div>
            <span>03/1000 executions</span>
            <button className="hover:text-green-400 transition-colors">Upgrade now →</button>
          </div>
        </div>
        
        {/* Main Header */}
        <div className="h-14 flex items-center justify-between px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-sm">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg">
              <span className="material-symbols-outlined">home</span>
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">My Projects</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">CRM Lead Generation</span>
            <span className="text-gray-400">/</span>
            <span className="font-semibold text-gray-900 flex items-center gap-2">
              AI Pipeline 2.4.67
              <span className="material-symbols-outlined text-gray-400 text-base">edit</span>
            </span>
          </div>
          
          {/* Tabs */}
          <div className="flex items-center bg-gray-100 p-1 rounded-lg">
            <button className="px-4 py-1 text-xs font-semibold bg-white shadow-sm rounded-md text-gray-900">Editor</button>
            <button className="px-4 py-1 text-xs font-medium text-gray-500 hover:text-gray-900">Executions</button>
            <button className="px-4 py-1 text-xs font-medium text-gray-500 hover:text-gray-900">Evaluations</button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-2">
              <div className="w-2 h-2 rounded-full border border-gray-400"></div>
              <span className="text-xs text-gray-500">Inactive</span>
            </div>
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
        <PipelineUI />
        <SubmitButton />
        <TemplateBadge />
      </div>
    </div>
  );
}

export default App;
