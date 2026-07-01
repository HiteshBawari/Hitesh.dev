import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Icosahedron } from "@react-three/drei";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

/* =====================================================
   3D BACKGROUND MODEL — distorted core + orbiting shards
   ===================================================== */
function OrbitShard({ radius, speed, size, color, offset = 0 }) {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 1.5) * 0.6;
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.015;
    }
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.6}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

function DistortCore() {
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });
  return (
    <Icosahedron ref={ref} args={[1.4, 4]}>
      <MeshDistortMaterial
        color="#4F46E5"
        distort={0.45}
        speed={1.6}
        roughness={0.15}
        metalness={0.4}
      />
    </Icosahedron>
  );
}

/* =====================================================
   MERN STACK TICKER — icon row with 3D tilt on hover
   ===================================================== */
const STACK = [
  { Icon: SiMongodb, name: "MongoDB", color: "#10B981" },
  { Icon: SiExpress, name: "Express", color: "#1E1B4B" },
  { Icon: SiReact, name: "React", color: "#06B6D4" },
  { Icon: SiNodedotjs, name: "Node.js", color: "#4F46E5" },
];

function StackBadge({ Icon, name, color }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -16;
    const rotateY = ((x / rect.width) - 0.5) * 16;
    gsap.to(ref.current, {
      rotateX,
      rotateY,
      scale: 1.08,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="stack-badge transform-gpu flex flex-col items-center justify-center gap-3 rounded-2xl px-6 py-5 bg-white/70 backdrop-blur-xl border border-white shadow-lg w-32 md:w-36 shrink-0"
    >
      <Icon size={34} color={color} />
      <span className="text-xs font-semibold tracking-wide text-slate-600">
        {name}
      </span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const canvasWrapRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".about-card");
      const badges = gsap.utils.toArray(".stack-badge");

      // =========================
      // CINEMATIC TIMELINE INTRO
      // =========================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(".about-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          canvasWrapRef.current,
          { opacity: 0, scale: 0.85, duration: 1, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          cards,
          {
            y: 80,
            opacity: 0,
            scale: 0.95,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          badges,
          {
            y: 30,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      // =========================
      // SCROLL PROGRESS EFFECT
      // =========================
      cards.forEach((card) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
          y: 0,
          opacity: 1,
        });
      });

      // Parallax drift on the 3D canvas as the section scrolls
      gsap.to(canvasWrapRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -80,
        rotateZ: 6,
        ease: "none",
      });

      // =========================
      // 3D HOVER TILT EFFECT (info cards)
      // =========================
      cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const rotateX = ((y / rect.height) - 0.5) * -10;
          const rotateY = ((x / rect.width) - 0.5) * 10;

          gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.03,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-28 px-6 bg-[#FAFAFA] overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* ambient grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#1E1B4B 1px, transparent 1px), linear-gradient(90deg, #1E1B4B 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* HEADER + 3D MODEL ROW */}
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center mb-14 md:mb-16">
          <div className="about-title">
            <p className="text-indigo-600 font-semibold mb-3 tracking-wide">
              About Me
            </p>

            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Building Digital
              <br />
              Experiences That Matter
            </h2>
          </div>

          {/* 3D CANVAS */}
          <div
            ref={canvasWrapRef}
            className="relative h-[260px] md:h-[320px] rounded-[28px] overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 border border-white shadow-xl"
          >
            <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.6} />
              <pointLight position={[5, 5, 5]} intensity={1.2} color="#06B6D4" />
              <pointLight position={[-5, -3, -5]} intensity={0.8} color="#4F46E5" />
              <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
                <DistortCore />
              </Float>
              <OrbitShard radius={2.6} speed={0.45} size={0.22} color="#06B6D4" />
              <OrbitShard radius={3.1} speed={0.32} size={0.16} color="#818CF8" offset={2} />
              <OrbitShard radius={2.2} speed={0.6} size={0.13} color="#22D3EE" offset={4} />
            </Canvas>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {/* WHO I AM */}
          <div className="about-card lg:col-span-2 transform-gpu rounded-[28px] p-7 md:p-8 bg-white/60 backdrop-blur-2xl border border-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
            <p className="text-slate-600 leading-relaxed">
              I create modern web experiences using the MERN stack, Three.js
              and GSAP, blending solid engineering with premium UI design.
              My focus is performance, interactivity and visual quality.
            </p>
          </div>

          {/* EXPERIENCE */}
          <div className="about-card transform-gpu rounded-[28px] p-7 md:p-8 bg-white/60 backdrop-blur-2xl border border-white shadow-xl">
            <h3 className="font-bold text-xl">Experience</h3>
            <div className="mt-6">
              <h4 className="text-5xl font-black text-indigo-600">2+</h4>
              <p className="text-slate-500 mt-2">Years Building</p>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="about-card transform-gpu rounded-[28px] p-7 md:p-8 bg-white/60 backdrop-blur-2xl border border-white shadow-xl">
            <h3 className="font-bold text-xl">Projects</h3>
            <div className="mt-6">
              <h4 className="text-5xl font-black text-cyan-600">10+</h4>
              <p className="text-slate-500 mt-2">Completed Projects</p>
            </div>
          </div>

          {/* MISSION */}
          <div className="about-card transform-gpu rounded-[28px] p-7 md:p-8 bg-white/60 backdrop-blur-2xl border border-white shadow-xl">
            <h3 className="font-bold text-xl">Mission</h3>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Deliver premium websites that feel modern, responsive and
              memorable.
            </p>
          </div>

          {/* MERN STACK STRIP */}
          <div className="about-card lg:col-span-3 transform-gpu rounded-[28px] p-7 md:p-8 bg-white/60 backdrop-blur-2xl border border-white shadow-xl">
            <h3 className="text-2xl font-bold mb-5">My Stack</h3>
            <div
              className="flex gap-8 overflow-x-auto pb-2 pl-20 [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ perspective: "800px" }}
            >
              {STACK.map((s, i) => (
                <StackBadge key={i} {...s} />
              ))}
            </div>
          </div>

          {/* APPROACH */}
          <div className="about-card transform-gpu rounded-[28px] p-7 md:p-8 bg-gradient-to-br from-indigo-600 to-cyan-500 shadow-xl text-white">
            <h3 className="text-xl font-bold mb-3">My Approach</h3>
            <p className="leading-relaxed text-white/90 text-sm">
              Storytelling, motion design and frontend engineering — combined
              into one memorable digital experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}