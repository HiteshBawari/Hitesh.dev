import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../../data/skills";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);
  const orbitRef = useRef(null);
  const hubRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(null);

  // Split skills into two rings — inner ring gets the first half, outer the rest
  const mid = Math.ceil(skills.length / 2);
  const innerSkills = skills.slice(0, mid);
  const outerSkills = skills.slice(mid);

  useLayoutEffect(() => {
    const id = setTimeout(() => {
      const ctx = gsap.context(() => {
        // ── Hub entrance ──────────────────────────────
        gsap.set(hubRef.current, { opacity: 1, scale: 1 });
        gsap.fromTo(
          hubRef.current,
          { opacity: 0, scale: 0, rotate: -180 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          }
        );

        // ── Orbit nodes entrance ──────────────────────
        const nodes = gsap.utils.toArray(".orbit-node");
        gsap.set(nodes, { opacity: 1, scale: 1 });
        gsap.fromTo(
          nodes,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(2)",
            stagger: { amount: 0.8, from: "random" },
            delay: 0.3,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          }
        );

        // ── Continuous orbit rotation ──────────────────
        gsap.to(".orbit-ring-inner", {
          rotate: 360,
          duration: 40,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });
        gsap.to(".orbit-ring-outer", {
          rotate: -360,
          duration: 60,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });

        // Counter-rotate node content so icons stay upright
        gsap.to(".orbit-node-inner .orbit-content", {
          rotate: -360,
          duration: 40,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".orbit-node-outer .orbit-content", {
          rotate: 360,
          duration: 60,
          repeat: -1,
          ease: "none",
        });

        // ── Hub pulse ──────────────────────────────────
        gsap.to(hubRef.current, {
          boxShadow: "0 0 60px 10px rgba(99,102,241,0.5)",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // ── Floating particles in background ───────────
        gsap.utils.toArray(".bg-particle").forEach((p) => {
          gsap.to(p, {
            y: () => gsap.utils.random(-40, 40),
            x: () => gsap.utils.random(-30, 30),
            duration: () => gsap.utils.random(4, 8),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(id);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 bg-[#F5F5F7] overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* ── Background particles ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="bg-particle absolute w-1.5 h-1.5 rounded-full"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              background:
                i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#a855f7" : "#06b6d4",
              opacity: 0.35,
            }}
          />
        ))}
      </div>

      {/* ── Ambient glows ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-300/25 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-cyan-300/25 blur-[120px]"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* ── HEADER ───────────────────────────────────── */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-indigo-500 font-semibold tracking-widest text-sm uppercase mb-3">
            Skills Universe
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
            Orbiting My
            <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]">
              Core Expertise
            </span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-md mx-auto text-sm md:text-base">
            Hover a node to explore — every orbit represents a discipline I've mastered.
          </p>
        </div>

        {/* ── ORBIT SYSTEM (desktop) ──────────────────── */}
        <div
          ref={orbitRef}
          className="hidden md:flex relative items-center justify-center mx-auto"
          style={{ width: "min(640px, 90vw)", height: "min(640px, 90vw)" }}
        >
          {/* Outer ring track */}
          <div className="absolute inset-0 rounded-full border border-dashed border-indigo-300/40" />
          {/* Inner ring track */}
          <div
            className="absolute rounded-full border border-dashed border-purple-300/40"
            style={{ inset: "16%" }}
          />

          {/* ── Center hub ── */}
          <div
            ref={hubRef}
            className="absolute z-20 w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-2xl"
          >
            <div className="w-[88%] h-[88%] rounded-full bg-white/95 backdrop-blur flex flex-col items-center justify-center text-center px-2">
              <span className="text-2xl">⚡</span>
              <span className="text-[11px] font-bold text-slate-900 mt-1 leading-tight">
                Core
                <br />
                Stack
              </span>
            </div>
          </div>

          {/* ── Outer ring (rotates) ── */}
          <div className="orbit-ring-outer absolute inset-0">
            {outerSkills.map((skill, i) => {
              const angle = (360 / outerSkills.length) * i;
              return (
                <OrbitNode
                  key={`outer-${i}`}
                  skill={skill}
                  angle={angle}
                  radius={50}
                  variant="outer"
                  onHover={setActiveSkill}
                />
              );
            })}
          </div>

          {/* ── Inner ring (rotates opposite) ── */}
          <div
            className="orbit-ring-inner absolute"
            style={{ inset: "16%" }}
          >
            {innerSkills.map((skill, i) => {
              const angle = (360 / innerSkills.length) * i + 30;
              return (
                <OrbitNode
                  key={`inner-${i}`}
                  skill={skill}
                  angle={angle}
                  radius={50}
                  variant="inner"
                  onHover={setActiveSkill}
                />
              );
            })}
          </div>
        </div>

        {/* ── Active skill detail readout (desktop) ── */}
        <div className="hidden md:flex justify-center mt-10 h-16 items-center">
          {activeSkill ? (
            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-lg animate-[fade-pop_0.3s_ease]">
              <span className="text-3xl">{activeSkill.icon}</span>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-sm">{activeSkill.title}</p>
                <p className="text-slate-500 text-xs">{activeSkill.level}</p>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-sm italic">Hover any orbiting icon above ↑</p>
          )}
        </div>

        {/* ── MOBILE: horizontal scroll-snap carousel ──── */}
        <div className="md:hidden -mx-6 px-6">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
            {skills.map((skill, i) => (
              <MobileSkillCard key={i} skill={skill} />
            ))}
          </div>
          <p className="text-center text-slate-400 text-xs mt-2">← Swipe to explore →</p>
        </div>

      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-pop {
          from { opacity: 0; transform: translateY(8px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}

/* ── Orbit node — positioned on a circle via trig, counter-rotates content ── */
function OrbitNode({ skill, angle, radius, variant, onHover }) {
  const rad = (angle * Math.PI) / 180;
  const x = 50 + radius * Math.cos(rad);
  const y = 50 + radius * Math.sin(rad);

  return (
    <div
      className={`orbit-node orbit-node-${variant} absolute opacity-100`}
      style={{
        top: `${y}%`,
        left: `${x}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="orbit-content group cursor-pointer">
        <div
          className={`
            relative flex items-center justify-center rounded-2xl
            bg-white/90 backdrop-blur-xl border border-white shadow-md
            transition-all duration-300
            group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-indigo-300/60
            group-hover:border-indigo-300
            ${variant === "outer" ? "w-16 h-16" : "w-14 h-14"}
          `}
        >
          {/* glow pulse on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-400/0 via-purple-400/0 to-cyan-400/0 group-hover:from-indigo-400/20 group-hover:via-purple-400/15 group-hover:to-cyan-400/20 transition-all duration-300" />
          <span className={`relative ${variant === "outer" ? "text-2xl" : "text-xl"} select-none`}>
            {skill.icon}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile card — flip-style with level ring ── */
function MobileSkillCard({ skill }) {
  const levelMap = { beginner: 35, intermediate: 60, advanced: 85, expert: 95 };
  const levelKey = (skill.level || "").toLowerCase();
  const matchedKey = Object.keys(levelMap).find((k) => levelKey.includes(k));
  const levelPercent = matchedKey ? levelMap[matchedKey] : 80;
  const circumference = 2 * Math.PI * 26;
  const offset = circumference - (levelPercent / 100) * circumference;

  return (
    <div className="snap-center shrink-0 w-40 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-md p-5 flex flex-col items-center text-center">
      <div className="relative w-16 h-16 mb-3">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="26" fill="none" stroke="#e2e8f0" strokeWidth="4" />
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="url(#skillGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          {skill.icon}
        </div>
      </div>
      <h3 className="font-bold text-slate-900 text-sm">{skill.title}</h3>
      <p className="text-slate-500 text-xs mt-1">{skill.level}</p>
    </div>
  );
}