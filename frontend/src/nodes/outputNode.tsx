// src/nodes/outputNode.tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { CustomHandle } from "@/handle"
import React, { useState } from "react"
import { Position } from "reactflow"
import { BaseNode } from "./baseNode"

interface OutputNodeProps {
  id: string
  data: {
    outputName?: string
    outputType?: string
  }
}

export const OutputNode: React.FC<OutputNodeProps> = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  )
  const [outputType, setOutputType] = useState(data?.outputType || "Text")

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value)
  }

  const handleTypeChange = (e: string) => {
    setOutputType(e)
  }

  return (
    <BaseNode
      label="Output"
      data={data}
      inputs={
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Name of your project"
              value={currName}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Framework</Label>
            <Select value={outputType} onValueChange={handleTypeChange}>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="file">File</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      }
      handles={
        <>
          <CustomHandle
            type="target"
            position={Position.Left}
            id={`${id}-input`}
          />
        </>
      }
    />
  )
}
