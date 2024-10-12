// draggableNode.tsx

interface DraggableNodeProps {
  type: string
  label: string
}

export const DraggableNode: React.FC<DraggableNodeProps> = ({
  type,
  label
}) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    ;(event.currentTarget as HTMLElement).style.cursor = "grabbing"
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType })
    )
    event.dataTransfer.effectAllowed = "move"
  }
  const onDragEnd = (event: React.DragEvent) => {
    ;(event.currentTarget as HTMLElement).style.cursor = "grab" // Cast to HTMLElement
  }

  return (
    <div
      className="cursor-grab min-w-20 h-10 flex flex-col justify-center items-center rounded-sm bg-black"
      onDragStart={event => onDragStart(event, type)}
      onDragEnd={event => onDragEnd(event)}
      draggable
    >
      <span style={{ color: "#fff" }}>{label}</span>
    </div>
  )
}
