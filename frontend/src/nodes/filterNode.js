// filterNode.js
// A node for filtering data

import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      description="Filters data based on specified conditions. Only matching items pass through to the output."
      fields={[
        {
          name: 'condition',
          label: 'Condition',
          type: 'select',
          defaultValue: 'contains',
          options: [
            { value: 'contains', label: 'Contains' },
            { value: 'equals', label: 'Equals' },
            { value: 'startsWith', label: 'Starts With' },
            { value: 'endsWith', label: 'Ends With' }
          ]
        },
        {
          name: 'value',
          label: 'Value',
          type: 'text',
          defaultValue: '',
          placeholder: 'Enter filter value'
        }
      ]}
      handles={[
        { type: 'target', id: 'input' },
        { type: 'source', id: 'match' },
        { type: 'source', id: 'nomatch', style: { top: '70%' } }
      ]}
      style={{ backgroundColor: '#FFF3E0', borderColor: '#FFB74D' }}
    />
  );
};
