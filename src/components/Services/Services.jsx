import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  FaCode,
  FaPaintBrush,
  FaMobileAlt,
  FaRocket,
  FaShoppingCart,
  FaSearch,
  FaWhatsapp,
  FaEnvelope
} from "react-icons/fa";

const services = [
  { title: "Landing Page Website", price: 69, icon: FaRocket, desc: "High converting landing pages for businesses & startups." },
  { title: "Frontend Development", price: 149, icon: FaCode, desc: "Modern React websites with animations & scalability." },
  { title: "UI/UX Design", price: 99, icon: FaPaintBrush, desc: "Clean, conversion-focused UI designs." },
  { title: "Mobile Responsive Fix", price: 69, icon: FaMobileAlt, desc: "Fix responsiveness issues for all devices." },
  { title: "E-Commerce Website", price: 299, icon: FaShoppingCart, desc: "Full online store with payment integration." },
  { title: "SEO Optimization", price: 129, icon: FaSearch, desc: "Improve ranking, speed, and visibility." }
];

const testimonials = [
  {
    name: "Aarav Sharma",
    text: "Amazing work! My website conversions increased after redesign.",
    role: "Startup Founder"
  },
  {
    name: "Neha Verma",
    text: "Very professional and fast delivery. Highly recommended!",
    role: "Business Owner"
  },
  {
    name: "Rahul Mehta",
    text: "Clean UI and smooth animations. Exactly what I wanted.",
    role: "Freelance Client"
  }
];

export default function Services() {
  const sectionRef = useRef(null);
  const [count, setCount] = useState(69);
  const [showCTA, setShowCTA] = useState(false);

  // PRICE COUNTER ANIMATION ($69 → $999)
  useEffect(() => {
    let start = 0;
    const end = 69;

    const interval = setInterval(() => {
      start += 15;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(start);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // GSAP CARD ANIMATION
  useEffect(() => {
    gsap.fromTo(
      ".service-card",
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }
    );
  }, []);

  // SCROLL CTA TRIGGER
  useEffect(() => {
    const handleScroll = () => {
      setShowCTA(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="services"
      data-section="Services"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative"
    >
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <h2 className="text-5xl font-black">
          Premium <span className="text-indigo-600">Services</span>
        </h2>

        <p className="mt-4 text-slate-600">
          Starting from <span className="font-bold text-black">${count}</span> — scalable solutions for businesses.
        </p>
      </div>

      {/* SERVICES GRID (APPLE STYLE DEPTH CARDS) */}
      <div className="max-w-6xl mx-auto px-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 perspective-1000">
        {services.map((s, i) => {
          const Icon = s.icon;

          return (
            <div
              key={i}
              className="
                service-card group relative
                bg-white border border-slate-100
                rounded-2xl p-6
                shadow-lg
                transition-all duration-300
                hover:shadow-2xl
                hover:-translate-y-3
                hover:rotate-x-6 hover:rotate-y-6
                transform-gpu
              "
            >
              {/* ICON */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4 group-hover:scale-110 transition">
                <Icon size={22} />
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold">{s.title}</h3>

              {/* PRICE */}
              <p className="text-indigo-600 font-bold mt-1">
                Starting at ${s.price}
              </p>

              {/* DESC */}
              <p className="text-slate-600 mt-3 text-sm">
                {s.desc}
              </p>

              {/* CTA */}
              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({
                    behavior: "smooth"
                  })
                }
                className="
                  mt-6 w-full py-3 rounded-xl
                  bg-gradient-to-r from-indigo-500 to-cyan-500
                  text-white font-semibold
                  hover:scale-105 transition
                "
              >
                Hire Me
              </button>

              {/* GLOW */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 transition pointer-events-none"></div>
            </div>
          );
        })}
      </div>

      {/* TESTIMONIALS */}
      <div className="mt-24 max-w-5xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-10">
          What Clients Say
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border rounded-2xl p-6 shadow hover:shadow-xl transition"
            >
              <p className="text-slate-600">"{t.text}"</p>
              <div className="mt-4 font-bold">{t.name}</div>
              <div className="text-sm text-slate-500">{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOATING CONTACT BUTTONS */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[9999]">
        <a
          href="https://wa.me/919667803323"
          target="_blank"
          className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaWhatsapp />
        </a>

        <a
          href="mailto:hiteshbawari@gmail.com"
          className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaEnvelope />
        </a>
      </div>

    </section>
  );
}