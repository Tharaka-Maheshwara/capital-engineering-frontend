import React from "react";
import ContactCards from "@/components/common/contact-cards";
import ContactForm from "@/components/common/contact-form";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Capital Engineering",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12 text-slate-900">
      <div className="container mx-auto">
      <ContactCards />

      <header className="mb-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-2 text-muted-foreground">Have a project or question? Send us a message.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold mb-4">Send a message</h2>
          <ContactForm />
        </section>

        <aside>
          <h2 className="text-xl font-semibold mb-4">Contact details</h2>
          <p className="mb-2">Capital Engineering</p>
          <p className="mb-2">123 Example Street, Colombo</p>
          <p className="mb-2">Phone: +94 11 123 4567</p>
          <p className="mb-4">Email: info@capital-eng.lk</p>

          <div className="mb-4">
            <h3 className="font-medium">Business hours</h3>
            <p>Mon — Fri: 9:00 — 17:00</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Location</h3>
            <div className="h-48 w-full rounded border bg-gray-100 flex items-center justify-center">Map placeholder</div>
          </div>
        </aside>
      </div>
      </div>
    </main>
  );
}
