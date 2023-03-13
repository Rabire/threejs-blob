import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils, Vector3 } from "three";
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";

type Props = { loading: boolean; animate: boolean };

const Blob = ({ loading, animate }: Props) => {
  const mesh = useRef<THREE.Mesh>(null!);

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

    const speed = loading ? 1.2 : 0.3;

    materials.uniforms.u_time.value = speed * state.clock.getElapsedTime();

    materials.uniforms.u_intensity.value = MathUtils.lerp(
      materials.uniforms.u_intensity.value,
      animate && !loading ? 0.6 : 0.15,
      0.02
    );

    const loadingScale = new Vector3(1, 1, 1);
    const scale = new Vector3(1.5, 1.5, 1.5);

    mesh.current.scale.lerp(loading ? loadingScale : scale, 0.08);
  });

  return (
    <mesh ref={mesh} scale={1.5} position={[0, 0, 0]}>
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
