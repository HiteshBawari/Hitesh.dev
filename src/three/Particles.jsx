import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles({
  count = 1000,
}) {
  const points = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(
      count * 3
    );

    for (let i = 0; i < count; i++) {
      positions[i * 3] =
        (Math.random() - 0.5) * 20;

      positions[i * 3 + 1] =
        (Math.random() - 0.5) * 20;

      positions[i * 3 + 2] =
        (Math.random() - 0.5) * 20;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    points.current.rotation.y =
      state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.03}
        color="#6366f1"
        transparent
        opacity={0.8}
      />
    </points>
  );
}