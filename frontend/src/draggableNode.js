// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="cursor-grab active:cursor-grabbing w-full p-3 flex items-center gap-3 rounded-lg bg-surface-light hover:bg-gray-50 transition-all shadow-sm hover:shadow-md border border-border-light group"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
            {label.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">{label}</div>
            <div className="text-xs text-gray-500 truncate">{type}</div>
          </div>
      </div>
    );
  };
  