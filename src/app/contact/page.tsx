import React from "react";
import ContactCards from "@/components/common/contact-cards";
import ContactSection from "@/components/common/contact-section";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Capital Engineering",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#12263b] px-4 py-12 text-slate-100">
      <div className="container mx-auto">
        <ContactCards />

        <header className="mb-8">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-2 text-slate-300">
            Have a project or question? Send us a message.
          </p>
        </header>

        <ContactSection />
      </div>
    </main>
  );
}
