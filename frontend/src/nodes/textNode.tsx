// src/nodes/textNode.tsx
import { Textarea } from "@/components/ui/textarea"
import { CustomHandle } from "@/handle"
import React, { useEffect, useRef, useState } from "react"
import { Position, useUpdateNodeInternals } from "reactflow"
import { BaseNode } from "./baseNode"

interface TextNodeProps {
  id: string
  data: {
    text?: string
  }
}

export const TextNode: React.FC<TextNodeProps> = ({ id, data }) => {
  const updateNodeInternals = useUpdateNodeInternals()

  const [currText, setCurrText] = useState(data?.text || "{{input}}")
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const [variables, setVariables] = useState<string[]>([])

  const extractVariables = (text: string) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*\}\}/g
    let matches
    const variables = []

    while ((matches = regex.exec(text)) !== null) {
      variables.push(matches[1]) // Extract the variable name
    }

    return variables
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrText(e.target.value)
    const extractedVariables = extractVariables(e.target.value)

    setVariables([...extractedVariables])
    updateNodeInternals(id)
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [currText])

  return (
    <BaseNode
      label="Text"
      data={data}
      inputs={
        <div className="flex flex-col space-y-1.5">
          <Textarea
            value={currText}
            ref={textareaRef}
            onChange={handleTextChange}
          />
        </div>
      }
      handles={
        <>
          <CustomHandle
            type="source"
            position={Position.Right}
            id={`${id}-output`}
          />

          {variables.map((variable, index) => (
            <CustomHandle
              key={index}
              type="target"
              position={Position.Left}
              id={`${id}_${variable}-input`}
              style={{ top: `${(index + 1) * 20}px` }}
            />
          ))}
        </>
      }
    />
  )
}
