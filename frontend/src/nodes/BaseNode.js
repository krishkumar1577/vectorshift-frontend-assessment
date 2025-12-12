// BaseNode.js
// A flexible abstraction for creating custom nodes with minimal code

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A reusable node abstraction
 * 
 * @param {Object} props
 * @param {string} props.id - Node ID
 * @param {Object} props.data - Node data
 * @param {string} props.title - Node title
 * @param {Array} props.fields - Field configurations
 * @param {Array} props.handles - Handle configurations
 * @param {Object} props.style - Custom styles
 * @param {React.ReactNode} props.children - Custom content
 */
export const BaseNode = ({ 
  id, 
  data, 
  title, 
  fields = [], 
  handles = [],
  style = {},
  children 
}) => {
  // Initialize state for all fields
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    return initialValues;
  });

  // Handle field changes
  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Render field based on type
  const renderField = (field) => {
    const value = fieldValues[field.name];
    
    switch (field.type) {
      case 'text':
      case 'number':
      case 'email':
      case 'url':
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded resize-y focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
          >
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleFieldChange(field.name, e.target.checked)}
            className="rounded border-gray-300 text-accent focus:ring-accent"
          />
        );
      
      default:
        return null;
    }
  };

  // Merge custom styles with defaults
  const customStyleClasses = style.backgroundColor ? '' : 'bg-white';
  const borderColor = style.backgroundColor ? 'border-gray-200' : 'border-gray-300';
  
  return (
    <div className={`w-[200px] min-h-[80px] border ${borderColor} rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow ${customStyleClasses}`} style={style}>
      {/* Render input handles */}
      {handles
        .filter(h => h.type === 'target')
        .map((handle, idx) => (
          <Handle
            key={`target-${handle.id || idx}`}
            type="target"
            position={handle.position || Position.Left}
            id={`${id}-${handle.id}`}
            style={handle.style}
            className="w-3 h-3 bg-gray-400 hover:bg-accent transition-colors"
          />
        ))}

      {/* Title */}
      {title && (
        <div className="font-bold mb-2 text-sm text-gray-800">
          {title}
        </div>
      )}

      {/* Custom children content */}
      {children}

      {/* Render fields */}
      {fields.length > 0 && (
        <div className="mt-2 space-y-2">
          {fields.map((field) => (
            <div key={field.name}>
              {field.label && (
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {field.label}:
                </label>
              )}
              {renderField(field)}
            </div>
          ))}
        </div>
      )}

      {/* Render output handles */}
      {handles
        .filter(h => h.type === 'source')
        .map((handle, idx) => (
          <Handle
            key={`source-${handle.id || idx}`}
            type="source"
            position={handle.position || Position.Right}
            id={`${id}-${handle.id}`}
            style={handle.style}
            className="w-3 h-3 bg-gray-400 hover:bg-accent transition-colors"
          />
        ))}
    </div>
  );
};
