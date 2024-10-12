// src/nodes/llmNode.tsx
import { CustomHandle } from "@/handle"
import React from "react"
import { Position } from "reactflow"
import { BaseNode } from "./baseNode"

interface PipelineNodeProps {
  id: string
}

export const PipelineNode: React.FC<PipelineNodeProps> = ({ id }) => {
  return (
    <BaseNode
      label="Pipeline"
      handles={
        <>
          <CustomHandle
            type="target"
            position={Position.Left}
            id={`${id}-input`}
          />

          <CustomHandle
            type="source"
            position={Position.Right}
            id={`${id}-output`}
          />
        </>
      }
    />
  )
}
