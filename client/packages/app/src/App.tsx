import { Input, BaseUIComponentsProvider } from "fwk";
import "./App.css";

function App() {
  return (
    <BaseUIComponentsProvider>
      <div className="p-10">Hello</div>
      <video controls src="http://localhost:7001/stream/video" />
    </BaseUIComponentsProvider>
  );
}

export default App;
