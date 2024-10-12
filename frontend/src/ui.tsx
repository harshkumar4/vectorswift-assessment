// ui.tsx
import { useCallback, useRef, useState } from "react"
import ReactFlow, {
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
  Node,
  ReactFlowInstance
} from "reactflow"
import { shallow } from "zustand/shallow"
import { InputNode } from "./nodes/inputNode"
import { LLMNode } from "./nodes/llmNode"
import { OutputNode } from "./nodes/outputNode"
import { TextNode } from "./nodes/textNode"
import { RFState, useStore } from "./store"

import "reactflow/dist/style.css"
import ButtonEdge from "./edges/ButtonEdge"
import { ImageNode } from "./nodes/imageNode"
import { IntegrationNode } from "./nodes/integrationNode"
import { NoteNode } from "./nodes/noteNode"
import { PipelineNode } from "./nodes/pipelineNode"
import { TransformNode } from "./nodes/transformNode"

const gridSize = 20
const proOptions = { hideAttribution: true }
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  integration: IntegrationNode,
  image: ImageNode,
  note: NoteNode,
  pipeline: PipelineNode,
  transform: TransformNode
}
const edgeTypes = {
  buttonEdge: ButtonEdge
}
const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect
})

export const PipelineUI: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null)
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow)

  const getInitNodeData = (nodeID: string, type: string) => {
    const nodeData = { id: nodeID, nodeType: `${type}` }
    return nodeData
  }

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      if (
        event?.dataTransfer?.getData("application/reactflow") &&
        reactFlowBounds
      ) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        )
        const type = appData?.nodeType

        if (typeof type === "undefined" || !type) return
        if (!reactFlowInstance) return

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top
        })

        const nodeID = getNodeID(type)
        const newNode: Node = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type)
        }

        addNode(newNode)
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  return (
    <>
      <div className="w-screen h-[70vh]" ref={reactFlowWrapper}>
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
          edgeTypes={edgeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType={ConnectionLineType.SmoothStep}
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <MiniMap />
          {/* <DevTools /> */}
        </ReactFlow>
      </div>
    </>
  )
}
