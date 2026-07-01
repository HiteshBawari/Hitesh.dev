import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID  = "service_851mljp";
const EMAILJS_TEMPLATE_ID = "template_7uocgqh";
const EMAILJS_PUBLIC_KEY  = "I1iCn4bnvY56fznGb";

export default function Contact() {
  const formRef    = useRef(null);
  const sectionRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 80, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg("");

    try {
      // Log what we're sending so you can see in browser console
      const formData = new FormData(formRef.current);
      console.log("=== EmailJS Debug ===");
      console.log("Service ID :", EMAILJS_SERVICE_ID);
      console.log("Template ID:", EMAILJS_TEMPLATE_ID);
      console.log("Public Key :", EMAILJS_PUBLIC_KEY);
      console.log("Form fields:");
      for (let [key, val] of formData.entries()) {
        console.log(`  ${key} = "${val}"`);
      }

      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      console.log("EmailJS SUCCESS:", result);
      setSuccess(true);
      formRef.current.reset();

    } catch (err) {
      // Show the EXACT error so we know what's wrong
      const status  = err?.status  ?? "unknown";
      const text    = err?.text    ?? err?.message ?? String(err);
      console.error("EmailJS FULL ERROR:", err);
      console.error("Status:", status, "| Text:", text);
      setErrorMsg(`Error ${status}: ${text}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-section="Contact"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 bg-[#FAFAFA]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold tracking-wide mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-none">
            Let's Build
            <span className="block bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </h2>
          <p className="mt-6 text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear about it.
            Send a message and I'll get back to you within 24 hours.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[40px] bg-white border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden">
          <div className="grid lg:grid-cols-5">

            {/* Left Panel */}
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-700 p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-white/5 translate-x-16 translate-y-16 pointer-events-none" />
              <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/5 translate-x-8 -translate-y-8 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-8">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-white leading-tight mb-4">Contact<br />Information</h3>
                <p className="text-indigo-200 text-sm leading-relaxed">
                  Fill in the form and I will get back to you within 24 hours, or reach out directly via email.
                </p>
              </div>

              <div className="relative z-10 space-y-7 mt-12">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-1">Email</p>
                    <a href="mailto:hiteshbawar20019@gmail.com" className="text-white text-sm font-medium hover:text-cyan-300 transition-colors break-all">
                      hiteshbawar20019@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-1">Location</p>
                    <p className="text-white text-sm font-medium">India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-1">Response Time</p>
                    <p className="text-white text-sm font-medium">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="lg:col-span-3 p-10 lg:p-14">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Send me a message</h3>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-5">

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Hitesh Bawari"
                      required
                      className="px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="hitesh@example.com"
                      required
                      className="px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project inquiry / Collaboration"
                    required
                    className="px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, timeline, and budget…"
                    required
                    className="px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>

                {/* ── Success ── */}
                {success && (
                  <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-green-50 border border-green-200">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-800 font-semibold text-sm">Message sent successfully!</p>
                      <p className="text-green-600 text-xs mt-0.5">I'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {/* ── Error with EXACT message ── */}
                {errorMsg && (
                  <div className="flex flex-col gap-2 px-5 py-4 rounded-2xl bg-red-50 border border-red-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-red-800 font-semibold text-sm">Failed to send message</p>
                    </div>
                    {/* Shows exact error — helps diagnose the issue */}
                    <p className="text-red-700 text-xs font-mono bg-red-100 rounded-lg px-3 py-2 break-all">
                      {errorMsg}
                    </p>
                    <p className="text-red-500 text-xs">
                      Also check browser Console (F12 → Console tab) for full error details.
                    </p>
                  </div>
                )}

              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}