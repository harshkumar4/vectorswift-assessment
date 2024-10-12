// src/nodes/llmNode.tsx
import { CustomHandle } from "@/handle"
import React from "react"
import { Position } from "reactflow"
import { BaseNode } from "./baseNode"

interface TransformNodeProps {
  id: string
}

export const TransformNode: React.FC<TransformNodeProps> = ({ id }) => {
  return (
    <BaseNode
      label="Transform"
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
