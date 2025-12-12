// inputNode.js

import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      fields={[
        {
          name: 'inputName',
          label: 'Name',
          type: 'text',
          defaultValue: id.replace('customInput-', 'input_')
        },
        {
          name: 'inputType',
          label: 'Type',
          type: 'select',
          defaultValue: 'Text',
          options: [
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' }
          ]
        }
      ]}
      handles={[
        { type: 'source', id: 'value' }
      ]}
    />
  );
}
