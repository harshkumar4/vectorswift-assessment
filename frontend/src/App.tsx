import { Toaster } from "./components/ui/toaster"
import SubmitButton from "./Submit"

import { PipelineToolbar } from "./toolbar"
import { PipelineUI } from "./ui"

function App() {
  return (
    <>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <Toaster />
    </>
  )
}

export default App
