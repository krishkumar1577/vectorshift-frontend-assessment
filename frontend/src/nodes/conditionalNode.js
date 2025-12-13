// conditionalNode.js
// A node for conditional logic branching

import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      description="Routes data based on conditions. If the condition is true, data goes to the true output; otherwise to the false output."
      fields={[
        {
          name: 'operator',
          label: 'Operator',
          type: 'select',
          defaultValue: 'equals',
          options: [
            { value: 'equals', label: '==' },
            { value: 'notEquals', label: '!=' },
            { value: 'greaterThan', label: '>' },
            { value: 'lessThan', label: '<' },
            { value: 'contains', label: 'Contains' }
          ]
        },
        {
          name: 'compareValue',
          label: 'Compare To',
          type: 'text',
          defaultValue: '',
          placeholder: 'Value to compare'
        },
        {
          name: 'caseSensitive',
          label: 'Case Sensitive',
          type: 'checkbox',
          defaultValue: false
        }
      ]}
      handles={[
        { type: 'target', id: 'input' },
        { type: 'source', id: 'true', style: { top: '40%' } },
        { type: 'source', id: 'false', style: { top: '70%' } }
      ]}
      style={{ 
        backgroundColor: '#E8F5E9',
        borderColor: '#81C784',
        minHeight: 140
      }}
    />
  );
};
