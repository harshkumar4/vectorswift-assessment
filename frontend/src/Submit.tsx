import axios from "axios"
import { Button } from "./components/ui/button"
import { useToast } from "./hooks/use-toast"
import { useStore } from "./store"

function SubmitButton() {
  const { nodes, edges } = useStore()
  const { toast } = useToast()

  const handleSubmit = async () => {
    axios
      .post("http://localhost:8000/pipelines/parse", {
        nodes: nodes,
        edges: edges
      })
      .then(response => {
        toast({
          title: "Success",
          description: `Nodes: ${response.data.num_nodes}, Edges: ${response.data.num_edges}, Is DAG: ${response.data.is_dag}`
        })
      })
      .catch(result =>
        toast({
          title: "Error",
          description: `${result}`
        })
      )
  }
  return (
    <div className="flex items-center justify-center">
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default SubmitButton
