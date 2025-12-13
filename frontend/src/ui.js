// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap, MarkerType } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { TransformNode } from './nodes/transformNode';
import { FilterNode } from './nodes/filterNode';
import { ApiNode } from './nodes/apiNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { NoteNode } from './nodes/noteNode';
import { CodeNode } from './nodes/codeNode';
import { CloudNode } from './nodes/cloudNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  transform: TransformNode,
  filter: FilterNode,
  api: ApiNode,
  conditional: ConditionalNode,
  note: NoteNode,
  code: CodeNode,
  cloud: CloudNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = ({ darkMode }) => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // Handle delete key press to remove selected nodes and edges
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Delete' || event.key === 'Backspace') {
                const selectedNodes = nodes.filter(node => node.selected);
                const selectedEdges = edges.filter(edge => edge.selected);
                
                if (selectedNodes.length > 0 || selectedEdges.length > 0) {
                    event.preventDefault();
                    
                    // Remove selected nodes
                    if (selectedNodes.length > 0) {
                        const nodeIdsToDelete = selectedNodes.map(node => node.id);
                        onNodesChange(
                            nodeIdsToDelete.map(id => ({ type: 'remove', id }))
                        );
                    }
                    
                    // Remove selected edges
                    if (selectedEdges.length > 0) {
                        const edgeIdsToDelete = selectedEdges.map(edge => edge.id);
                        onEdgesChange(
                            edgeIdsToDelete.map(id => ({ type: 'remove', id }))
                        );
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [nodes, edges, onNodesChange, onEdgesChange]);

    return (
        <>
        <div ref={reactFlowWrapper} className={`flex-1 relative overflow-auto ${darkMode ? 'bg-gray-800' : 'bg-background-light bg-grid-pattern'}`}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                    style: { stroke: '#94a3b8', strokeWidth: 2 },
                    markerEnd: { type: MarkerType.Arrow, color: '#94a3b8' }
                }}
            >
                <Background 
                    color={darkMode ? '#4B5563' : '#cbd5e1'} 
                    gap={gridSize} 
                    size={1} 
                />
                <Controls className={`shadow-floating rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`} />
                <MiniMap 
                    nodeColor={darkMode ? '#374151' : '#111827'}
                    maskColor={darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(249, 250, 251, 0.8)'}
                    style={{ 
                        backgroundColor: darkMode ? '#1F2937' : 'white',
                        border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                    zoomable
                    pannable
                />
            </ReactFlow>
        </div>
        </>
    )
}
