// codeNode.js
// A node for writing and executing code

import { BaseNode } from './BaseNode';

export const CodeNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Code"
      description="Write and execute custom code snippets in Python, JavaScript, or other languages."
      fields={[
        {
          name: 'language',
          label: 'Language',
          type: 'select',
          defaultValue: 'python',
          options: [
            { value: 'python', label: 'Python' },
            { value: 'javascript', label: 'JavaScript' },
            { value: 'sql', label: 'SQL' }
          ]
        },
        {
          name: 'code',
          label: 'Code',
          type: 'textarea',
          defaultValue: '# Write your code here\nprint("Hello, World!")',
          rows: 6
        }
      ]}
      handles={[
        { type: 'target', id: 'input' },
        { type: 'source', id: 'output' },
        { type: 'source', id: 'error', style: { top: '80%' } }
      ]}
      style={{ 
        backgroundColor: '#F0F9FF',
        borderColor: '#38BDF8',
        minHeight: 180,
        width: 240
      }}
    />
  );
};
