// noteNode.js
// A node for adding notes and documentation

import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Note"      description="Add comments, documentation, or reminders to your workflow. Notes don't affect data flow."      fields={[
        {
          name: 'note',
          label: 'Content',
          type: 'textarea',
          defaultValue: 'Add your notes here...',
          rows: 4
        },
        {
          name: 'color',
          label: 'Color',
          type: 'select',
          defaultValue: 'yellow',
          options: [
            { value: 'yellow', label: 'Yellow' },
            { value: 'pink', label: 'Pink' },
            { value: 'blue', label: 'Blue' },
            { value: 'green', label: 'Green' }
          ]
        }
      ]}
      handles={[]}
      style={{ 
        backgroundColor: '#FFFDE7',
        borderColor: '#FFF176',
        minHeight: 150,
        width: 220
      }}
    />
  );
};
