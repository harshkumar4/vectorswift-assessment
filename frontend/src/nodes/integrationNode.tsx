// src/nodes/llmNode.tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CustomHandle } from "@/handle"
import React from "react"
import { Position } from "reactflow"
import { BaseNode } from "./baseNode"

interface IntegrationNodeProps {
  id: string
}

export const IntegrationNode: React.FC<IntegrationNodeProps> = ({ id }) => {
  return (
    <BaseNode
      label="Integration"
      inputs={
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Name" />
        </div>
      }
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
