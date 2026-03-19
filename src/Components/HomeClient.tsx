"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Shader3 } from "./Shader3";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";

const emptySubscribe = () => () => {};

function HomeClient({ email }: { email?: string }) {
  const router = useRouter();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  const firstLetter = email ? email[0].toUpperCase() : "";
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const features = [
    {
      title: "Instant Setup",
      desc: "Embed Echo on your website in seconds with a single script tag — no complex setup required.",
    },
    {
      title: "AI That Knows Your Business",
      desc: "You control the knowledge base, ensuring the AI provides accurate and relevant answers to your customers.",
    },
    {
      title: "24/7 Smart Support",
      desc: "Never miss a customer again. Echo provides instant responses anytime, day or night.",
    },
  ];

  const handleLogOut = async () => {
    try {
      await axios.get("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden react-default-font text-white">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Shader3 />
      </div>

      <motion.div className="fixed top-0 left-0 w-full h-20 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight">
            Echo : AI Customer Support
          </div>

          {email ? (
            <div ref={popupRef} className="relative">
              <button
                className="w-10 h-10 rounded-full bg-black flex items-center justify-center font-semibold hover:scale-105 transition"
                onClick={() => setOpen(!open)}
              >
                {firstLetter}
              </button>

              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-3 w-44 bg-black rounded-xl shadow-xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full text-center px-4 py-3 text-sm hover:bg-white hover:text-black"
                  >
                    Dashboard
                  </button>

                  <button
                    className="w-full text-center px-4 py-3 text-sm hover:bg-red-500"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.button
              onClick={handleLogin}
              className="px-5 py-2 rounded-full border border-white/30 text-sm font-medium hover:bg-[oklch(79%_0.17_162.48)] transition"
            >
              Login
            </motion.button>
          )}
        </div>
      </motion.div>

      <section className="relative z-10 pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              AI Customer Support <br />
              Built for Modern Websites
            </h1>

            <p className="text-xl leading-relaxed mt-6">
              Say goodbye to long wait times and hello to instant support with
              Echo, the AI-powered customer support solution designed for modern
              websites. Our intelligent chatbot provides 24/7 assistance,
              answering common questions, resolving issues, and guiding your
              customers through their journey.
            </p>

            <div className="flex gap-4 mt-8">
              {email ? (
                <button className="px-7 py-3 rounded-xl bg-black hover:bg-white hover:text-black transition font-medium"  onClick={() => router.push("/dashboard")}>
                  Go to Dashboard
                </button>
              ) : (
                <button
                  className="px-7 py-3 rounded-xl bg-black hover:bg-white hover:text-black transition font-medium"
                  onClick={handleLogin}
                >
                  Get Started
                </button>
              )}

              <a
                href="#features"
                className="px-7 py-3 rounded-xl border border-white hover:bg-white hover:text-black transition font-medium inline-block"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
                      <div className="mt-14">
            <h1 className="text-lg font-medium mb-2">Live Preview</h1>

            <p className="text-sm text-zinc-300 mb-6">
              This is how the chatbot will appear on your website.
            </p>

            <div className="rounded-xl border border-zinc-300 bg-white shadow-md overflow-hidden relative">

              {/* Browser header */}
              <div className="flex items-center gap-2 px-4 h-9 bg-zinc-100 border-b border-zinc-200">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />

                <span className="ml-4 text-xs text-zinc-500">
                  your-website.com
                </span>
              </div>

              {/* Website area */}
              <div className="relative h-64 sm:h-72 p-6 text-zinc-400 text-sm">
                Your website content goes here

                {/* Chat bubble */}
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
                  💬
                </div>

                {/* Chat window */}
                <div className="absolute bottom-20 right-4 w-64 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden">

                  {/* Chat header */}
                  <div className="bg-black text-white px-4 py-2 text-sm font-medium flex justify-between items-center">
                    <span>Customer Support</span>
                    <span>✕</span>
                  </div>

                  {/* Chat body */}
                  <div className="p-4 text-xs text-zinc-600">
                    Hi 👋 <br />
                    How can I help you today?
                  </div>

                  {/* Input */}
                  <div className="border-t border-zinc-200 p-2">
                    <input
                      className="w-full text-xs outline-none"
                      placeholder="Type a message..."
                    />
                  </div>

                </div>

              </div>

            </div>
          </div>
          </motion.div>
        </div>
      </section>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-6 right-6
                   w-14 h-14 rounded-full
                   bg-white text-black
                   flex items-center justify-center
                   shadow-xl text-xl cursor-pointer"
      >
        💬
      </motion.div>

      <section id="features" className=" py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold text-center"
          >
            Why Choose Echo for Your Customer Support Needs?
          </motion.h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((f, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: false }}
                className="
                          bg-black rounded-2xl
                          p-8 shadow-lg
                          border border-zinc-200
                        "
              >
                <h1 className="text-xl font-semibold mb-2 ">{f.title}</h1>
                <p className="text-white">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} Echo AI Customer Support. All rights
        reserved.
      </footer>
    </div>
  );
}

export default HomeClient;
