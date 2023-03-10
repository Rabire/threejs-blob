import { Canvas } from "@react-three/fiber";
import Blob from "./components/Blob";

function App() {
  return (
    <div>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <Blob />
      </Canvas>
    </div>
  );
}

export default App;
