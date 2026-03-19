"use client";
import React, { useState } from "react";
import { Shader3 } from "./Shader3";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function EmbedClient({ ownerId }: { ownerId?: string }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const embedCode = ownerId
    ? `<script src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js" data-owner-id="${ownerId}"></script>`
    : "Owner ID not found";

  const copyCode = async () => {
    if (!ownerId) return;

    await navigator.clipboard.writeText(embedCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen text-white react-default-font">
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Shader3 />
      </div>

      {/* Navbar */}
      <motion.div className="fixed top-0 left-0 w-full h-20 z-50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-lg font-semibold tracking-tight cursor-pointer"
            onClick={() => router.push("/")}
          >
            Echo : AI Customer Support
          </div>

          <motion.button
            className="px-5 py-2 rounded-full border border-white/30 text-sm font-medium hover:bg-[oklch(79%_0.17_162.48)] transition"
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </motion.button>
        </div>
      </motion.div>

      {/* Embed Section */}
      <div className="flex justify-center px-2 py-8 mt-28">
        <motion.div className="w-full max-w-3xl backdrop-blur-xl bg-black/30 border border-white/20 rounded-2xl shadow-xl p-10">
          
          <h1 className="text-2xl font-semibold">Embed ChatBot</h1>

          <p className="text-white mt-3 mb-6">
            Copy and paste this code before <code>&lt;/body&gt;</code> in your
            website to embed the AI ChatBot.
          </p>

          {/* Code Block */}
          <div className="bg-black/50 border border-white/10 rounded-xl overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 border-b border-white/10">
              <span className="text-xs text-white/60 font-mono">
                embed-script.html
              </span>

              <button
                onClick={copyCode}
                className="text-xs px-3 py-1 border border-white/20 rounded hover:bg-white/10 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <pre className="p-5 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
              {embedCode}
            </pre>
          </div>

          {/* Example */}
          <div className="mt-6 text-sm text-white/70">Example usage:</div>

          <div className="mt-2 bg-black/40 border border-white/10 rounded-xl p-4 text-xs font-mono overflow-x-auto">
            <pre>
{`<html>
  <body>
    ...
    ${embedCode}
  </body>
</html>`}
            </pre>
          </div>

          {/* Steps */}
          <h4 className="text-lg font-semibold mt-8">Steps to Embed:</h4>

          <ol className="space-y-3 text-sm text-white/90 list-decimal list-inside mt-4">
            <li>Copy the embed script</li>
            <li>
              Paste it before <code>&lt;/body&gt;</code> in your HTML
            </li>
            <li>Save and deploy your changes</li>
          </ol>

          {/* Live Preview */}
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
    </div>
  );
}

export default EmbedClient;
