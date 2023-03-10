import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils } from "three";
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";

const Blob = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const hover = useRef(false);

  console.log(hover.current);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_intensity: { value: 0.3 },
    }),
    []
  );

  useFrame((state) => {
    if (!mesh.current) return;

    const materials = mesh.current.material as THREE.ShaderMaterial;

    materials.uniforms.u_time.value = 0.3 * state.clock.getElapsedTime();

    materials.uniforms.u_intensity.value = MathUtils.lerp(
      materials.uniforms.u_intensity.value,
      hover.current ? 1 : 0.15,
      0.02
    );
  });

  return (
    <mesh
      ref={mesh}
      scale={1.5}
      position={[0, 0, 0]}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronBufferGeometry args={[2, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Blob;
