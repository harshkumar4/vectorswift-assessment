from collections import defaultdict, deque

import networkx as nx
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    # "http://localhost.tiangolo.com",
    # "https://localhost.tiangolo.com",
    # "http://localhost",
    # "http://localhost:8000",
    # "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineData(BaseModel):
    nodes: list[dict]
    edges: list[dict]


def is_dag(nodes, edges):
    node_ids = [node["id"] for node in nodes]
    num_nodes = len(node_ids)

    node_to_index = {node_id: i for i, node_id in enumerate(node_ids)}

    adj_list = defaultdict(list)
    indegree = [0] * num_nodes

    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        source_idx = node_to_index[source]
        target_idx = node_to_index[target]

        adj_list[source_idx].append(target_idx)
        indegree[target_idx] += 1

    zero_indegree_queue = deque([i for i in range(num_nodes) if indegree[i] == 0])

    visited_count = 0

    while zero_indegree_queue:
        node_idx = zero_indegree_queue.popleft()
        visited_count += 1

        for neighbor in adj_list[node_idx]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                zero_indegree_queue.append(neighbor)

    return visited_count == num_nodes


# Alternative
# def is_dag(nodes,edges):
#    # Create a directed graph using networkx
#     G = nx.DiGraph()

#     for node in nodes:
#         G.add_node(node['id'])

#     for edge in edges:
#         G.add_edge(edge['source'], edge['target'])

#     return nx.is_directed_acyclic_graph(G)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_check = is_dag(pipeline.nodes, pipeline.edges)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": dag_check}
