## ./src/nodes/textNode.tsx
// textNode.tsx
import { useState } from "react"
import { Handle, Position } from "reactflow"

interface TextNodeProps {
  id: string
  data: {
    text?: string
  }
}

export const TextNode: React.FC<TextNodeProps> = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}")

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrText(e.target.value)
  }

  return (
    <div style={{ width: 200, height: 80, border: "1px solid black" }}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Text:
          <input type="text" value={currText} onChange={handleTextChange} />
        </label>
      </div>
      <Handle type="target" position={Position.Left} id={`${id}-valueA`} />
      <Handle type="source" position={Position.Right} id={`${id}-valueB`} />
    </div>
  )
}
---
## ./src/nodes/inputNode.tsx
// inputNode.tsx
import { useState } from "react"
import { Handle, Position } from "reactflow"

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
  const [inputType, setInputType] = useState(data.inputType || "Text")

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value)
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(e.target.value)
  }

  return (
    <div style={{ width: 200, height: 80, border: "1px solid black" }}>
      <div>
        <span>Input</span>
      </div>
      <div>
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
        <label>
          Type:
          <select value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </div>
  )
}
---
## ./src/nodes/llmNode.tsx
// llmNode.tsx
import { Handle, Position } from "reactflow"

interface LLMNodeProps {
  id: string
  data: {
    model: string
  }
}

export const LLMNode: React.FC<LLMNodeProps> = ({ id, data }) => {
  return (
    <div style={{ width: 200, height: 80, border: "1px solid black" }}>
      <div>
        <span>LLM</span>
      </div>
      <div>
        <span>{data?.model || "gpt-3.5-turbo"}</span>
      </div>
      <Handle type="target" position={Position.Left} id={`${id}-input`} />
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </div>
  )
}
---
## ./src/nodes/outputNode.tsx
// outputNode.tsx
import { useState } from "react"
import { Handle, Position } from "reactflow"

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
  const [outputType, setOutputType] = useState(data.outputType || "Text")

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value)
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOutputType(e.target.value)
  }

  return (
    <div style={{ width: 200, height: 80, border: "1px solid black" }}>
      <Handle type="target" position={Position.Left} id={`${id}-value`} />
      <div>
        <span>Output</span>
      </div>
      <div>
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
        <label>
          Type:
          <select value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </div>
  )
}
---
