// outputNode.js

import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      fields={[
        {
          name: 'outputName',
          label: 'Name',
          type: 'text',
          defaultValue: id.replace('customOutput-', 'output_')
        },
        {
          name: 'outputType',
          label: 'Type',
          type: 'select',
          defaultValue: 'Text',
          options: [
            { value: 'Text', label: 'Text' },
            { value: 'Image', label: 'Image' }
          ]
        }
      ]}
      handles={[
        { type: 'target', id: 'value' }
      ]}
    />
  );
}
