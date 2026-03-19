"use client";
import React, { useEffect, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Shader3 } from "./Shader3";
import { useRouter } from "next/navigation";


import axios from "axios";

const emptySubscribe = () => () => {};

export default function DashboardClient({ ownerID }: { ownerID: string }) {
  const router = useRouter();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [businessName, setBusinessName] = React.useState("");
  const [supportEmail, setSupportEmail] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSetting = async () => {
    if (!ownerID) {
      setErrorMessage("Unable to save settings. Please log in again.");
      return;
    }

    if (!businessName || !supportEmail || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      setErrorMessage("");
      setLoading(true);

      const result = await axios.post("/api/auth/settings", {
        ownerId: ownerID,
        businessName,
        supportEmail,
        knowledge: description,
      });

      console.log(result.data);

      setLoading(false);
      setSaved(true);

      setTimeout(() => setSaved(false), 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Failed to save settings. Please try again."
        );
      } else {
        setErrorMessage("Failed to save settings. Please try again.");
      }
      console.error("Error saving settings:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ownerID) {
      const handleGetDetails = async () => {
        try {
          setLoading(true);

          const result = await axios.post("/api/auth/settings/get", {
            ownerId: ownerID,
          });

          console.log(result.data);

          if (result.data) {
            setBusinessName(result.data.businessName || "");
            setSupportEmail(result.data.supportEmail || "");
            setDescription(result.data.knowledge || "");
          }

          setLoading(false);
        } catch (error) {
          console.error("Error fetching settings:", error);
          setLoading(false);
        }
      };

      handleGetDetails();
    }
  }, [ownerID]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden react-default-font text-white">
      {/* Background Shader */}
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

          <motion.button className="px-5 py-2 rounded-full border border-white/30 text-sm font-medium hover:bg-[oklch(79%_0.17_162.48)] transition"  onClick={() => router.push("/embed")}>
            Embed ChatBot
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex justify-center px-2 py-8 mt-28">
        <motion.div className="w-full max-w-3xl backdrop-blur-xl bg-black/30 border border-white/20 rounded-2xl shadow-xl p-10">
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-2xl font-semibold">ChatBot Settings</h1>
            <p className="text-white">
              Manage your AI ChatBot knowledge and business details.
            </p>
          </div>

          {/* Business Details */}
          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Business Details</h1>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-white/30 px-4 py-3 text-sm bg-white/10 backdrop-blur-md text-white placeholder:text-white/60"
              />

              <input
                type="text"
                placeholder="Support Email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full rounded-xl border border-white/30 px-4 py-3 text-sm bg-white/10 backdrop-blur-md text-white placeholder:text-white/60"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h1 className="text-lg font-medium mb-4">Description</h1>

            <p className="text-white">
              Add FAQs, policies, delivery information, refund and other details
              to help your customers get quick answers.
            </p>

            <div className="space-y-4 mt-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-44 rounded-xl border border-white/30 px-6 py-6 text-sm bg-white/10 backdrop-blur-md text-white placeholder:text-white/60"
                placeholder={`Example:
• Refund policy: 7 days return available
• Delivery time: 3–5 working days
• Cash on Delivery available
• Support hours
`}
              />
            </div>
          </div>

          {/* Save Button + Status */}
          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading || !ownerID}
              onClick={handleSetting}
              className="px-7 py-3 rounded-xl bg-white text-black text-sm font-medium hover:bg-black hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save"}
            </motion.button>

            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-medium text-emerald-400"
              >
                ✓ Settings saved
              </motion.span>
            )}

            {errorMessage && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-medium text-red-300"
              >
                {errorMessage}
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
