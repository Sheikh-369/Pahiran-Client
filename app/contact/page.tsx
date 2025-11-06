"use client";

import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Thank you! Your message has been sent.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Something went wrong. Please try again later.");
      }
    } catch {
      setStatus("❌ Network error. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-gray-800"
      style={{
        background: "linear-gradient(135deg, #acade9, #b59ee9, #e0acc6)",
      }}
    >
      <section className="max-w-6xl w-full flex flex-col lg:flex-row items-stretch bg-white/40 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
        {/* Left Section - Contact Info */}
        <div className="lg:w-1/2 w-full p-8 flex flex-col justify-center bg-white/30">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Get in Touch</h1>
          <p className="text-gray-700 mb-8">
            Have questions about your order, our products, or just want to say hello?  
            We’re always happy to connect with you. Our team at <strong>WashTralaya</strong> will respond within 24 hours.
          </p>

          <div className="space-y-4 text-gray-800">
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-purple-700" />
              <p><strong>Email:</strong> support@washtralaya.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-purple-700" />
              <p><strong>Phone:</strong> +9779807915786</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-purple-700" />
              <p><strong>Address:</strong> Sanishcahre-Road, Birtamode, Jhapa, Nepal</p>
            </div>
          </div>

          <div className="mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.0602758036634!2d87.99038527461089!3d26.64655247680673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5ba60b049c20d%3A0xca7a2724598125b!2sSagar%20Silai%20Machine!5e0!3m2!1sen!2sin!4v1762449085800!5m2!1sen!2sin"
              width="100%"
              height="250"
              loading="lazy"
              allowFullScreen
              className="rounded-md border border-gray-300"
            ></iframe>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="lg:w-1/2 w-full p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className={`w-full font-medium py-2 rounded-md transition ${
                isSending
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-purple-700 text-white hover:bg-purple-800"
              }`}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p
                className={`text-center text-sm mt-2 ${
                  status.startsWith("✅")
                    ? "text-green-700"
                    : status.startsWith("❌")
                    ? "text-red-700"
                    : "text-gray-700"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
