// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
            const response = await fetch(`${backendUrl}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            const dagStatus = data.is_dag ? 'Yes' : 'No';
            const message = `Pipeline Analysis Results:\n\n` +
                          `Number of Nodes: ${data.num_nodes}\n` +
                          `Number of Edges: ${data.num_edges}\n` +
                          `Is DAG (Directed Acyclic Graph): ${dagStatus}\n\n` +
                          (data.is_dag 
                            ? '✓ This pipeline is valid and can be executed!' 
                            : '⚠️ Warning: This pipeline contains cycles and may cause infinite loops.');
            
            alert(message);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error: Failed to analyze pipeline.\n${error.message}\n\nMake sure the backend server is running on http://localhost:8000`);
        }
    };

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
                onClick={handleSubmit}
                className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-black/90 transition-colors flex items-center gap-2"
            >
                Submit
            </button>
            
            <button className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors ml-1">
                <span className="material-symbols-outlined text-lg">bolt</span>
            </button>
        </div>
    );
}
