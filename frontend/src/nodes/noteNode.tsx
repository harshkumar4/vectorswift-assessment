// src/nodes/llmNode.tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CustomHandle } from "@/handle"
import React from "react"
import { Position } from "reactflow"
import { BaseNode } from "./baseNode"

interface NoteNodeProps {
  id: string
}

export const NoteNode: React.FC<NoteNodeProps> = ({ id }) => {
  return (
    <BaseNode
      label="Note"
      inputs={
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="note">Note</Label>
          <Input id="note" placeholder="Note" />
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
