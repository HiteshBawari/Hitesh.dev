import { useEffect, useRef } from "react";

import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef(null);

  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(badgeRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
      })
        .from(
          titleRef.current.children,
          {
            y: 120,
            opacity: 0,
            stagger: 0.08,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          textRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          buttonsRef.current.children,
          {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          statsRef.current.children,
          {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
          },
          "-=0.3"
        );

      const move = (e) => {
        const x =
          (window.innerWidth / 2 - e.clientX) / 40;

        const y =
          (window.innerHeight / 2 - e.clientY) / 40;

        gsap.to(".hero-parallax", {
          x,
          y,
          duration: 1,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", move);

      return () =>
        window.removeEventListener("mousemove", move);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const title = "Creative Frontend Developer";

  return (
    <section
      id="home"
      data-section="Home"
      ref={heroRef}
      className="
      relative
      overflow-hidden
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#FAFAFA]
      pt-28
      "
    >
      {/* Gradient Blobs */}

      <div
        className="
        hero-parallax
        absolute
        top-20
        left-0
        w-80
        h-80
        rounded-full
        bg-indigo-300/30
        blur-[120px]
      "
      />

      <div
        className="
        hero-parallax
        absolute
        bottom-0
        right-0
        w-96
        h-96
        rounded-full
        bg-cyan-300/30
        blur-[140px]
      "
      />

      <div
        className="
        hero-parallax
        absolute
        top-1/2
        right-1/4
        w-72
        h-72
        rounded-full
        bg-purple-300/20
        blur-[120px]
      "
      />

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-10
        relative
        z-10
      "
      >
        <div
          className="
          grid
          lg:grid-cols-2
          gap-16
          items-center
        "
        >
          {/* LEFT */}

          <div>
            <div
              ref={badgeRef}
              className="
              inline-flex
              items-center
              gap-2

              px-4
              py-2

              rounded-full

              border
              border-indigo-200

              bg-white/70
              backdrop-blur-lg

              mb-8
            "
            >
              <span
                className="
                w-2
                h-2
                rounded-full
                bg-green-500
              "
              />

              <span
                className="
                text-sm
                font-medium
                text-slate-700
              "
              >
                Available For Freelance Projects
              </span>
            </div>

            <h1
              ref={titleRef}
              className="
              text-5xl
              sm:text-6xl
              lg:text-7xl
              xl:text-8xl

              font-black
              tracking-tight
              leading-none
              text-slate-900
            "
            >
              {title.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="
                  block
                  overflow-hidden
                "
                >
                  {word}
                </span>
              ))}
            </h1>

            <h2
              ref={subtitleRef}
              className="
              mt-6

              text-xl
              lg:text-2xl

              font-semibold

              bg-gradient-to-r
              from-indigo-500
              via-purple-500
              to-cyan-500

              bg-clip-text
              text-transparent
            "
            >
              React • Three.js • GSAP
            </h2>

            <p
              ref={textRef}
              className="
              mt-8

              text-lg
              text-slate-600

              max-w-xl

              leading-relaxed
            "
            >
              I build immersive web experiences
              combining premium UI design,
              advanced animations, and modern
              frontend technologies to create
              memorable digital products.
            </p>

            <div
              ref={buttonsRef}
              className="
              mt-10

              flex
              flex-wrap
              gap-5
            "
            >
              <a
                href="#projects"
                className="
                group

                px-8
                py-4

                rounded-full

                text-white
                font-semibold

                bg-gradient-to-r
                from-indigo-500
                to-cyan-500

                shadow-xl
                shadow-indigo-300/40

                transition-all
                duration-300

                hover:scale-105
                hover:shadow-2xl
              "
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="
                px-8
                py-4

                rounded-full

                bg-white

                border
                border-slate-200

                text-slate-800
                font-semibold

                shadow-lg

                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-xl
              "
              >
                Contact Me
              </a>
            </div>

            <div
              ref={statsRef}
              className="
              mt-14
              mb-10
              grid
              grid-cols-3

              gap-5
            "
            >
              <div
                className="
                bg-white/80
                backdrop-blur-xl

                rounded-3xl

                p-5

                border
                border-white

                shadow-lg
              "
              >
                <h3
                  className="
                  text-3xl
                  font-bold
                  text-slate-900
                "
                >
                  10+
                </h3>

                <p
                  className="
                  text-sm
                  text-slate-500
                "
                >
                  Projects
                </p>
              </div>

              <div
                className="
                bg-white/80
                backdrop-blur-xl

                rounded-3xl

                p-5
                
                border
                border-white

                shadow-lg
              "
              >
                <h3
                  className="
                  text-3xl
                  font-bold
                  text-slate-900
                "
                >
                  2+
                </h3>

                <p
                  className="
                  text-sm
                  text-slate-500
                "
                >
                  Years
                </p>
              </div>

              <div
                className="
                bg-white/80
                backdrop-blur-xl

                rounded-3xl

                p-5

                border
                border-white

                shadow-lg
              "
              >
                <h3
                  className="
                  text-3xl
                  font-bold
                  text-slate-900
                "
                >
                  100%
                </h3>

                <p
                  className="
                  text-sm
                  text-slate-500
                "
                >
                  Responsive
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
            hidden
            lg:flex

            justify-center
            items-center
          "
          >
            <div
              className="
              hero-parallax

              relative

              w-[500px]
              h-[500px]

              rounded-full

              bg-gradient-to-br
              from-indigo-500
              via-purple-500
              to-cyan-500

              shadow-[0_0_120px_rgba(99,102,241,0.25)]

              animate-pulse
            "
            >
              <div
                className="
                absolute
                inset-10

                rounded-full

                bg-white/20
                backdrop-blur-3xl
              "
              />

              <div
                className="
                absolute
                inset-24

                rounded-full

                bg-white/40
                backdrop-blur-3xl
              "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}