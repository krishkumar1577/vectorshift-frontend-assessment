// textNode.js

import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      fields={[
        {
          name: 'text',
          label: 'Text',
          type: 'text',
          defaultValue: '{{input}}'
        }
      ]}
      handles={[
        { type: 'source', id: 'output' }
      ]}
    />
  );
}
