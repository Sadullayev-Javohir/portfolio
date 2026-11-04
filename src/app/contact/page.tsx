import type { Metadata } from "next";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactSidebar } from "@/components/contact/ContactSidebar";

export const metadata: Metadata = {
  title: "Contact · Javohir Sadullayev (.NET & AI Engineer)",
  description:
    "Get in touch with Javohir Sadullayev (javohir engineer). Available for .NET backend engineering roles, system architecture consulting, and high-concurrency API contracts.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Contact Header */}
      <ContactHeader />

      {/* Main Two-Column Content: Form & Direct Channels */}
      <section className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pb-16 lg:pb-[64px] flex flex-col lg:flex-row gap-6 lg:gap-[24px] items-start">
        {/* Form Column */}
        <ContactForm />

        {/* Sidebar: Direct Channels & Good Fit */}
        <ContactSidebar />
      </section>
    </div>
  );
}
