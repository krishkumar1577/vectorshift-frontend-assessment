// submit.js

export const SubmitButton = () => {

    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1 bg-surface-light border border-border-light rounded-xl shadow-floating z-50">
            <div className="flex items-center border-r border-border-light pr-2 mr-1 gap-1">
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Zoom In">
                    <span className="material-symbols-outlined text-lg">add</span>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Zoom Out">
                    <span className="material-symbols-outlined text-lg">remove</span>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Fit View">
                    <span className="material-symbols-outlined text-lg">fit_screen</span>
                </button>
            </div>
            
            <div className="flex items-center border-r border-border-light pr-2 mr-1 gap-1">
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Undo">
                    <span className="material-symbols-outlined text-lg">undo</span>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Redo">
                    <span className="material-symbols-outlined text-lg">redo</span>
                </button>
            </div>
            
            <button 
                type="submit" 
                className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-black/90 transition-colors flex items-center gap-2"
            >
                Execute Workflow
            </button>
            
            <button className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors ml-1">
                <span className="material-symbols-outlined text-lg">bolt</span>
            </button>
        </div>
    );
}
