from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

pipeline_history = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """Check if graph is a DAG using DFS cycle detection."""
    graph = {node['id']: [] for node in nodes}
    
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in graph:
            graph[source].append(target)
    
    visited = set()
    rec_stack = set()
    
    def has_cycle(node_id: str) -> bool:
        visited.add(node_id)
        rec_stack.add(node_id)
        
        for neighbor in graph.get(node_id, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
        
        rec_stack.remove(node_id)
        return False
    
    for node in nodes:
        node_id = node['id']
        if node_id not in visited:
            if has_cycle(node_id):
                return False
    
    return True

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag_result = is_dag(nodes, edges)
    
    pipeline_history.append({
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result,
        'node_ids': [node.get('id') for node in nodes],
        'node_types': [{'id': node.get('id'), 'type': node.get('type')} for node in nodes],
        'connections': [
            {
                'from': edge.get('source'),
                'to': edge.get('target'),
                'source_handle': edge.get('sourceHandle'),
                'target_handle': edge.get('targetHandle')
            }
            for edge in edges
        ]
    })
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }

@app.get('/pipelines/history')
def get_pipeline_history():
    """Get all stored pipeline submissions"""
    return {
        'total_submissions': len(pipeline_history),
        'history': pipeline_history
    }
