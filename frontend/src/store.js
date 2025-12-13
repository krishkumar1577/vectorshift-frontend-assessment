// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      // Determine if this is a config/optional connection (dotted) or main data flow (solid)
      const targetHandle = connection.targetHandle || '';
      const sourceHandle = connection.sourceHandle || '';
      
      // Use dotted lines for configuration handles (like LLM model, memory, tools)
      // or for special variable connections in text nodes
      const isConfigConnection = 
        targetHandle.includes('config') || 
        targetHandle.includes('model') || 
        targetHandle.includes('memory') ||
        targetHandle.includes('tool') ||
        sourceHandle.includes('config');
      
      const edgeStyle = isConfigConnection 
        ? { strokeDasharray: '5,5' } // Dotted line
        : {}; // Solid line
      
      set({
        edges: addEdge({
          ...connection, 
          type: 'smoothstep', 
          animated: !isConfigConnection, // Don't animate config lines
          style: edgeStyle,
          markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}
        }, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    loadTemplate: () => {
      set({
        nodes: [
          {
            id: 'customInput-1',
            type: 'customInput',
            position: { x: 100, y: 100 },
            data: { id: 'customInput-1', nodeType: 'customInput', inputName: 'userName', inputType: 'Text' }
          },
          {
            id: 'customInput-2',
            type: 'customInput',
            position: { x: 100, y: 250 },
            data: { id: 'customInput-2', nodeType: 'customInput', inputName: 'userEmail', inputType: 'Email' }
          },
          {
            id: 'text-1',
            type: 'text',
            position: { x: 400, y: 150 },
            data: { id: 'text-1', nodeType: 'text', text: 'Hello {{name}}, your email is {{email}} and you work at {{company}}!' }
          },
          {
            id: 'customInput-3',
            type: 'customInput',
            position: { x: 100, y: 400 },
            data: { id: 'customInput-3', nodeType: 'customInput', inputName: 'companyName', inputType: 'Text' }
          },
          {
            id: 'llm-1',
            type: 'llm',
            position: { x: 400, y: 380 },
            data: { id: 'llm-1', nodeType: 'llm' }
          },
          {
            id: 'customOutput-1',
            type: 'customOutput',
            position: { x: 750, y: 200 },
            data: { id: 'customOutput-1', nodeType: 'customOutput', outputName: 'result', outputType: 'Text' }
          }
        ],
        edges: [
          // Solid animated lines for main data flow
          {
            id: 'e1-name',
            source: 'customInput-1',
            sourceHandle: 'customInput-1-value',
            target: 'text-1',
            targetHandle: 'name',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#94a3b8', strokeWidth: 2 },
            markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px', color: '#94a3b8' }
          },
          {
            id: 'e2-email',
            source: 'customInput-2',
            sourceHandle: 'customInput-2-value',
            target: 'text-1',
            targetHandle: 'email',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#94a3b8', strokeWidth: 2 },
            markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px', color: '#94a3b8' }
          },
          {
            id: 'e3-company',
            source: 'customInput-3',
            sourceHandle: 'customInput-3-value',
            target: 'text-1',
            targetHandle: 'company',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#94a3b8', strokeWidth: 2 },
            markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px', color: '#94a3b8' }
          },
          {
            id: 'e4-output',
            source: 'text-1',
            sourceHandle: 'output',
            target: 'customOutput-1',
            targetHandle: 'customOutput-1-value',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#94a3b8', strokeWidth: 2 },
            markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px', color: '#94a3b8' }
          },
          // Dotted lines for config/optional connections
          {
            id: 'e5-llm-config',
            source: 'llm-1',
            sourceHandle: 'llm-1-response',
            target: 'text-1',
            targetHandle: 'company',
            type: 'smoothstep',
            animated: false,
            style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5,5' },
            markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px', color: '#94a3b8' }
          }
        ]
      });
    },
    clearCanvas: () => {
      set({ nodes: [], edges: [] });
    },
  }));
