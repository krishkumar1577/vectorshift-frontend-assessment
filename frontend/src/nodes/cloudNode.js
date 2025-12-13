// cloudNode.js
// A node for cloud storage and integration

import { BaseNode } from './BaseNode';

export const CloudNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Cloud Storage"
      description="Connect to cloud storage providers like S3, Google Cloud Storage, or Azure Blob Storage."
      fields={[
        {
          name: 'provider',
          label: 'Provider',
          type: 'select',
          defaultValue: 's3',
          options: [
            { value: 's3', label: 'AWS S3' },
            { value: 'gcs', label: 'Google Cloud' },
            { value: 'azure', label: 'Azure Blob' },
            { value: 'dropbox', label: 'Dropbox' }
          ]
        },
        {
          name: 'bucket',
          label: 'Bucket/Container',
          type: 'text',
          defaultValue: '',
          placeholder: 'my-bucket'
        },
        {
          name: 'path',
          label: 'Path',
          type: 'text',
          defaultValue: '/',
          placeholder: '/path/to/file'
        }
      ]}
      handles={[
        { type: 'target', id: 'data' },
        { type: 'source', id: 'uploaded' },
        { type: 'source', id: 'downloaded', style: { top: '70%' } }
      ]}
      style={{ 
        backgroundColor: '#EFF6FF',
        borderColor: '#60A5FA'
      }}
    />
  );
};
