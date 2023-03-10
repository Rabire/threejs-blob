import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Blob from "./components/Blob";

function App() {
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  const [text, setText] = useState("");

  useEffect(() => {
    setAnimate(true);
    const timeOutId = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timeOutId);
  }, [text]);

  return (
    <div>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <Blob loading={loading} animate={animate} />
      </Canvas>

      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={() => setLoading((prev) => !prev)}>
        {loading ? "Stop loading" : "Start loading"}
      </button>
    </div>
  );
}

export default App;
