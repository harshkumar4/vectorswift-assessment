import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange
} from "reactflow"
import { create } from "zustand"

export type NodeIds = {
  [key: string]: number
}
export type RFState = {
  nodes: Node[]
  edges: Edge[]
  nodeIDs: NodeIds
  getNodeID: (type: string) => string
  addNode: (node: Node) => void
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  updateNodeField: (
    nodeId: string,
    fieldName: string,
    fieldValue: string
  ) => void
  // setNodes: (nodes: Node[]) => void
  // setEdges: (edges: Edge[]) => void
}

export const useStore = create<RFState>((set, get) => ({
  nodes: [] as Node[],
  edges: [] as Edge[],
  nodeIDs: {} as NodeIds,
  getNodeID: type => {
    const newIDs = { ...get().nodeIDs }
    if (newIDs[type] === undefined) {
      newIDs[type] = 0
    }
    newIDs[type] += 1
    set({ nodeIDs: newIDs })
    return `${type}-${newIDs[type]}`
  },
  addNode: node => {
    set({
      nodes: [...get().nodes, node]
    })
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes)
    })
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges)
    })
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 }
        },
        get().edges
      )
    })
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map(node => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue }
        }
        return node
      })
    })
  }
}))
