import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const navRef = useRef(null);
  const drawerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
          setActive(section.getAttribute("data-section"));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href, name) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });

    setActive(name);
    setIsOpen(false);
  };

  const navbar = (
    <>
      {/* NAVBAR */}
      <header
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2147483647, // MAX SAFE Z-INDEX
          transform: "translateZ(0)"
        }}
        className={`w-full transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`
              flex items-center justify-between
              rounded-full border
              backdrop-blur-xl

              ${
                scrolled
                  ? "bg-white/95 shadow-2xl border-white/40"
                  : "bg-white/85 shadow-lg border-white/30"
              }

              px-6 py-4
            `}
          >
            <a
              href="#home"
              className="text-2xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent"
            >
              Hitesh.dev
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleLinkClick(item.href, item.name)}
                  className={`text-sm font-semibold ${
                    active === item.name ? "text-indigo-600" : "text-slate-700"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <button
              onClick={() => handleLinkClick("#contact", "Contact")}
              className="hidden lg:block bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold"
            >
              Let's Talk
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full bg-white/80 border"
            >
              {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 z-[2147483647] h-screen w-[85%] sm:w-[420px] bg-white shadow-2xl"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)", transition: "0.4s ease" }}
      >
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <HiOutlineX size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-6 px-8 mt-10">
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => handleLinkClick(item.href, item.name)}
              className="text-left text-2xl font-bold"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483646,
            background: "rgba(0,0,0,0.3)"
          }}
        />
      )}
    </>
  );

  if (!mounted) return null;

  return createPortal(navbar, document.body);
}