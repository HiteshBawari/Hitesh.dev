export default function Footer() {
  return (
    <footer
      className="
      py-20
      px-6

      bg-white
      "
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="
          rounded-[40px]

          p-10

          bg-white/70
          backdrop-blur-xl

          border
          border-white

          shadow-xl
          "
        >
          <div
            className="
            flex
            flex-col
            md:flex-row

            justify-between
            gap-10
            "
          >
            <div>
              <h3
                className="
                text-3xl
                font-black
                "
              >
                Hitesh.dev
              </h3>

              <p
                className="
                mt-4
                text-slate-600
                "
              >
                Creating premium digital
                experiences with React,
                Three.js and GSAP.
              </p>
            </div>

            <div>
              <h4
                className="
                font-bold
                mb-4
                "
              >
                Navigation
              </h4>

              <ul className="space-y-2">
                <li>
                  <a href="#about">
                    About
                  </a>
                </li>

                <li>
                  <a href="#projects">
                    Projects
                  </a>
                </li>

                <li>
                  <a href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="
            mt-10
            pt-6

            border-t
            border-slate-200

            text-slate-500
            "
          >
            © 2026 Hitesh. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}