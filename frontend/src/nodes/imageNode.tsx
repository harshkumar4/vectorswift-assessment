// src/nodes/llmNode.tsx
import { CustomHandle } from "@/handle"
import React from "react"
import { Position } from "reactflow"
import { BaseNode } from "./baseNode"

interface ImageNodeProps {
  id: string
}

export const ImageNode: React.FC<ImageNodeProps> = ({ id }) => {
  return (
    <BaseNode
      label="Image"
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
