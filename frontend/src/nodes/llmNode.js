// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={[
        { type: 'target', id: 'system', style: { top: `${100/3}%` } },
        { type: 'target', id: 'prompt', style: { top: `${200/3}%` } },
        { type: 'source', id: 'response' }
      ]}
    >
      <div style={{ fontSize: '12px', color: '#666' }}>
        This is a LLM.
      </div>
    </BaseNode>
  );
}
