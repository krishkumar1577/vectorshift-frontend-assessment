// transformNode.js
// A node for data transformation operations

import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      fields={[
        {
          name: 'operation',
          label: 'Operation',
          type: 'select',
          defaultValue: 'uppercase',
          options: [
            { value: 'uppercase', label: 'Uppercase' },
            { value: 'lowercase', label: 'Lowercase' },
            { value: 'trim', label: 'Trim' },
            { value: 'reverse', label: 'Reverse' }
          ]
        }
      ]}
      handles={[
        { type: 'target', id: 'input' },
        { type: 'source', id: 'output' }
      ]}
      style={{ backgroundColor: '#E3F2FD', borderColor: '#90CAF9' }}
    />
  );
};
