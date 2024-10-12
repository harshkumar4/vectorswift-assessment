// src/nodes/llmNode.tsx
import { CustomHandle } from "@/handle"
import React from "react"
import { Position } from "reactflow"
import { BaseNode } from "./baseNode"

interface LLMNodeProps {
  id: string
  data: {
    model: string
  }
}

export const LLMNode: React.FC<LLMNodeProps> = ({ id, data }) => {
  return (
    <BaseNode
      label="LLM"
      data={data}
      outputs={<span>{data?.model || "gpt-3.5-turbo"}</span>}
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
