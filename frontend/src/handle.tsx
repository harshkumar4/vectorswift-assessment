import * as React from "react"

import { cn } from "@/lib/utils"
import { Handle, HandleProps } from "reactflow"

export interface CustomHandleProps
  extends HandleProps,
    React.HTMLAttributes<HTMLDivElement> {}

export const CustomHandle: React.FC<CustomHandleProps> = ({
  className,
  ...props
}) => {
  return (
    <Handle
      className={cn(
        "h-3 w-3 rounded-full border-2 border-primary bg-background",
        className
      )}
      {...props}
    />
  )
}
