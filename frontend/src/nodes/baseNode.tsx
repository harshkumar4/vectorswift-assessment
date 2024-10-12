// src/nodes/baseNode.tsx
import { ReactNode } from "react"

interface BaseNodeProps<T = unknown> {
  label: string
  data?: T
  inputs?: ReactNode
  outputs?: ReactNode
  handles?: ReactNode
}

export const BaseNode = <T,>({
  label,
  inputs,
  outputs,
  handles
}: BaseNodeProps<T>) => {
  return (
    <div className="relative h-full ml-0 mr-0 sm:mr-10">
      <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
      <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
        <div className="mx-2 mb-2">
          <div className="text-lg font-bold mb-2">{label}</div>
          <div>{inputs}</div>
          <div>{outputs}</div>
          <div>{handles}</div>
        </div>
      </div>
    </div>
  )
}
