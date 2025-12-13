import { useState, useEffect, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 80 });
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  // Extract variables from {{variable}} syntax
  useEffect(() => {
    const variablePattern = /\{\{(\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*)\}\}/g;
    const matches = [];
    let match;
    
    while ((match = variablePattern.exec(text)) !== null) {
      const varName = match[1].trim();
      if (!matches.includes(varName)) {
        matches.push(varName);
      }
    }
    
    setVariables(matches);
    updateNodeInternals(id);
  }, [text, id, updateNodeInternals]);

  // Auto-resize based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
      
      const textLength = text.length;
      const newWidth = Math.max(200, Math.min(600, textLength * 2 + 120));
      const newHeight = 100 + Math.max(40, scrollHeight);
      
      setDimensions({
        width: newWidth,
        height: Math.min(newHeight, 400)
      });
    }
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (data) {
      data.text = e.target.value;
    }
  };

  return (
    <div 
      className="border-2 border-blue-400 rounded-lg p-3 bg-white shadow-node hover:shadow-node-hover transition-shadow relative"
      style={{ 
        width: `${dimensions.width}px`, 
        minHeight: `${dimensions.height}px` 
      }}
    >
      {variables.map((variable, idx) => (
        <Handle
          key={`target-${variable}-${idx}`}
          type="target"
          position={Position.Left}
          id={`${variable}`}
          style={{ 
            top: `${((idx + 1) * 100) / (variables.length + 1)}%`,
            background: '#3b82f6'
          }}
          className="w-3 h-3 hover:bg-blue-600 transition-colors"
        />
      ))}
      
      {variables.length > 0 && (
        <div 
          className="absolute top-0 h-full flex flex-col justify-evenly"
          style={{ left: '-85px', width: '80px' }}
        >
          {variables.map((variable, idx) => (
            <div 
              key={`label-${variable}-${idx}`}
              className="text-[10px] text-gray-500 font-medium text-right pr-3"
            >
              {variable}
            </div>
          ))}
        </div>
      )}

      {/* Title */}
      <div className="font-bold mb-2 text-sm text-gray-800">
        Text
      </div>

      {/* Textarea field */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Text:
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text with {{variables}}"
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 overflow-hidden"
          style={{ minHeight: '40px' }}
        />
      </div>

      {/* Variable count indicator */}
      {variables.length > 0 && (
        <div className="mt-2 text-[10px] text-blue-500 font-medium">
          ✓ {variables.length} variable{variables.length !== 1 ? 's' : ''} detected
        </div>
      )}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="w-3 h-3 bg-blue-400 hover:bg-blue-600 transition-colors"
      />
    </div>
  );
}