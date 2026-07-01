import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Portfolio Website (Hawari)",
    category: "React",
    description:
      "A modern developer portfolio with GSAP animations, 3D UI feel, and premium UX design.",
    image: "src/components/Projects/ProtReact.png",
    demo: "https://protfolio-website-hawari-qwsy.vercel.app/",
    github: "#",
  },
  {
    id: 2,
    title: "Night Owl India Website",
    category: "Design",
    description:
      "A sleek business landing page with smooth animations and high conversion UI structure.",
    image: "src/components/Projects/NightShiftIndia.png",
    demo: "https://night-owl-india-website.vercel.app/",
    github: "#",
  },
  {
    id: 3,
    title: "Clothing Brand Store",
    category: "Ecommerce",
    description:
      "A modern fashion eCommerce UI with product showcase and clean shopping experience.",
    image: "src/components/Projects/HawariCloth.png",
    demo: "https://clothing-brand-hawari.vercel.app/",
    github: "#",
  },
  {
    id: 4,
    title: "My Portfolio (Drab)",
    category: "React",
    description:
      "Another portfolio variant with different UI direction and animation system.",
    image: "src/components/Projects/Prot1.png",
    demo: "https://my-protfolio-website-drab.vercel.app/",
    github: "#",
  },
  {
    id: 5,
    title: "Rent Car Website",
    category: "Dashboard",
    description:
      "Car rental platform UI with modern booking flow and clean UX system.",
    image: "src/components/Projects/HawariCar.png",
    demo: "https://rent-car-beige.vercel.app/",
    github: "#",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const [filter, setFilter] = useState("All");

  const categories = ["All", "React", "Dashboard", "Design", "Ecommerce"];

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [filter]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-6 bg-[#FAFAFA] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-indigo-600 font-semibold">Projects</p>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900">
            Featured Work
          </h2>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full transition ${
                filter === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <article
              key={project.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group rounded-2xl overflow-hidden bg-white shadow-md border border-white hover:-translate-y-2 transition"
            >
              {/* IMAGE */}
              <div className="h-60 overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <span className="text-indigo-600 text-sm font-medium">
                  {project.category}
                </span>

                <h3 className="text-xl font-bold mt-2 text-slate-900">
                  {project.title}
                </h3>

                <p className="text-slate-600 mt-2 text-sm">
                  {project.description}
                </p>

                <div className="flex gap-3 mt-5">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm"
                  >
                    Live Demo
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full border text-sm"
                  >
                    Visit
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}