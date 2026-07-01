import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";

import FloatingCrystal from "./FloatingCrystal";
import Particles from "./Particles";

function MouseGroup() {
  const group = useRef();

  useFrame((state) => {
    group.current.rotation.y =
      state.mouse.x * 0.5;

    group.current.rotation.x =
      state.mouse.y * 0.3;
  });

  return (
    <group ref={group}>
      <Float
        speed={2}
        rotationIntensity={2}
        floatIntensity={3}
      >
        <FloatingCrystal />
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 50,
      }}
    >
      {/* Background */}

      <color
        attach="background"
        args={["#fafafa"]}
      />

      {/* Lights */}

      <ambientLight intensity={1.2} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <pointLight
        position={[-4, 3, 3]}
        intensity={3}
        color="#6366f1"
      />

      <pointLight
        position={[4, -3, 3]}
        intensity={2}
        color="#06b6d4"
      />

      {/* Objects */}

      <MouseGroup />

      <Particles count={1200} />

      <Environment preset="city" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}