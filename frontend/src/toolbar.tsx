import { DraggableNode } from "./draggableNode"

export const PipelineToolbar = () => {
  return (
    <div className="p-3">
      <div className="flex flex-wrap gap-3 m-4">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="integration" label="Integration" />
        <DraggableNode type="image" label="Image" />
        <DraggableNode type="note" label="Note" />
        <DraggableNode type="pipeline" label="Pipeline" />
        <DraggableNode type="transform" label="Transform" />
      </div>
    </div>
  )
}
