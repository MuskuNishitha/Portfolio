"use client";

import { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-[100px] bg-bg-2">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-primary/12 to-secondary/20 border border-primary/30 rounded-2xl p-6 md:p-8 mb-[60px] flex items-center gap-4 text-sm text-text-body">
          <span>🚀</span>
          <div>
            This is a <strong>Next.js App Router</strong> preview. In your
            project, this becomes{" "}
            <code className="bg-primary/20 px-2.5 py-1 rounded-md text-xs text-primary-3 font-mono">
              app/page.js
            </code>{" "}
            with components like{" "}
            <code className="bg-primary/20 px-2.5 py-1 rounded-md text-xs text-primary-3 font-mono">
              components/Hero.jsx
            </code>
            ,{" "}
            <code className="bg-primary/20 px-2.5 py-1 rounded-md text-xs text-primary-3 font-mono">
              components/Contact.jsx
            </code>
            , etc. All Tailwind CSS classes are production-ready.
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-20 items-start">
          <div>
            <span className="section-label">Contact Me</span>
            <h2 className="section-title">Let's Work Together!</h2>
            <div className="section-divider" />

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div className="form-group">
                  <label className="block text-xs font-semibold text-text-muted mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 bg-bg-card border border-border-2 rounded-xl text-sm text-white outline-none transition-all focus:border-primary focus:bg-primary/5 focus:shadow-[0_0_0_4px_rgba(135,80,247,0.1)]"
                    placeholder="John"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-xs font-semibold text-text-muted mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 bg-bg-card border border-border-2 rounded-xl text-sm text-white outline-none transition-all focus:border-primary focus:bg-primary/5 focus:shadow-[0_0_0_4px_rgba(135,80,247,0.1)]"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div className="form-group">
                  <label className="block text-xs font-semibold text-text-muted mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full p-4 bg-bg-card border border-border-2 rounded-xl text-sm text-white outline-none transition-all focus:border-primary focus:bg-primary/5 focus:shadow-[0_0_0_4px_rgba(135,80,247,0.1)]"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-xs font-semibold text-text-muted mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full p-4 bg-bg-card border border-border-2 rounded-xl text-sm text-white outline-none transition-all focus:border-primary focus:bg-primary/5 focus:shadow-[0_0_0_4px_rgba(135,80,247,0.1)]"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              <div className="form-group mb-5">
                <label className="block text-xs font-semibold text-text-muted mb-2">
                  Service
                </label>
                <select
                  defaultValue=""
                  className="w-full p-4 bg-bg-card border border-border-2 rounded-xl text-sm text-white outline-none transition-all focus:border-primary focus:bg-primary/5 focus:shadow-[0_0_0_4px_rgba(135,80,247,0.1)]"
                >
                  <option value="" disabled>
                    Choose a Service
                  </option>
                  <option value="Responsive Design">Responsive Design</option>
                  <option value="CMS Development">CMS Development</option>
                  <option value="API Integration">API Integration</option>
                  <option value="Website Redesign">Website Redesign</option>
                </select>
              </div>

              <div className="form-group mb-6">
                <label className="block text-xs font-semibold text-text-muted mb-2">
                  Your Message
                </label>
                <textarea
                  className="w-full p-4 bg-bg-card border border-border-2 rounded-xl text-sm text-white outline-none transition-all focus:border-primary focus:bg-primary/5 focus:shadow-[0_0_0_4px_rgba(135,80,247,0.1)] min-h-[130px] resize-y"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className={`btn-primary ${formStatus === "sent" ? "bg-gradient-to-r from-green-500 to-green-600" : ""}`}
                disabled={formStatus !== "idle"}
              >
                {formStatus === "idle" && "Send Message ✉️"}
                {formStatus === "sending" && "Sending..."}
                {formStatus === "sent" && "✅ Message Sent!"}
              </button>
            </form>
          </div>

          <div className="pt-3">
            <h3 className="text-4xl font-extrabold mb-3.5">Get In Touch</h3>
            <p className="text-text-muted leading-relaxed mb-10 text-base">
              I design and code beautifully simple things and I love what I do.
              Just simple like that!
            </p>

            <div className="flex flex-col gap-5">
              {[
                { icon: "📞", label: "Phone", value: "+01 123 654 8096" },
                { icon: "✉️", label: "Email", value: "mnishithareddy8765@gmail.com" },
                {
                  icon: "📍",
                  label: "Address",
                  value: "Warne Park Street Pine, FL 33157",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4.5 p-5.5 bg-bg-card border border-border rounded-xl transition-all hover:border-primary hover:translate-x-1.5"
                >
                  <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center text-xl text-primary-3 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-text-muted uppercase tracking-wide mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
