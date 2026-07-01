import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";

export default function Crystal() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.4;

    meshRef.current.position.y =
      Math.sin(t * 1.5) * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 1]} />

      <MeshTransmissionMaterial
        thickness={0.5}
        roughness={0.05}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.08}
        backside
      />
    </mesh>
  );
}