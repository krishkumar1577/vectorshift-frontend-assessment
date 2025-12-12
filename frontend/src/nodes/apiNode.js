// apiNode.js
// A node for making API calls

import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="API Call"
      fields={[
        {
          name: 'method',
          label: 'Method',
          type: 'select',
          defaultValue: 'GET',
          options: [
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'PUT', label: 'PUT' },
            { value: 'DELETE', label: 'DELETE' }
          ]
        },
        {
          name: 'url',
          label: 'URL',
          type: 'url',
          defaultValue: '',
          placeholder: 'https://api.example.com'
        },
        {
          name: 'timeout',
          label: 'Timeout (ms)',
          type: 'number',
          defaultValue: '5000'
        }
      ]}
      handles={[
        { type: 'target', id: 'trigger' },
        { type: 'target', id: 'body', style: { top: '60%' } },
        { type: 'source', id: 'response' },
        { type: 'source', id: 'error', style: { top: '70%' } }
      ]}
      style={{ backgroundColor: '#F3E5F5', borderColor: '#BA68C8' }}
    />
  );
};
