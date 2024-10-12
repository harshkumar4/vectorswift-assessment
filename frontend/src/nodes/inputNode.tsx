// src/nodes/inputNode.tsx
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
interface InputNodeProps {
  id: string
  data: {
    inputName?: string
    inputType?: string
  }
}

export const InputNode: React.FC<InputNodeProps> = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  )
  const [inputType, setInputType] = useState(data?.inputType || "text")

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value)
  }

  const handleTypeChange = (value: string) => {
    setInputType(value)
  }

  return (
    <BaseNode
      label="Input"
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
            <Select value={inputType} onValueChange={handleTypeChange}>
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
