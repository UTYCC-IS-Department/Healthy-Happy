"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SiFacebook, SiTiktok, SiWhatsapp } from "react-icons/si";
import type { ReactNode } from "react";
import type { ContactMessages } from "@/i18n/message-types";

export default function ContactClient({ messages }: { messages: ContactMessages }) {
  return (
  <div className="bg-[#f4f2eb] pt-8 pb-10 text-black font-sans">
    {/* Title */}
    <section className="px-4 py-6 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
        {messages.title}
      </h1>
    </section>

    {/* Map & Form Grid */}
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-2 sm:px-6 lg:px-8">
      {/* Map Container */}
      <div className="h-80 min-h-[320px] overflow-hidden rounded-2xl bg-[#dadada] shadow-none md:h-full">
        <iframe
          title={messages.mapTitle}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3776.0!2d96.08!3d21.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb6e3a7af05de5%3A0x4e1e5e4c5c5a5c5a!2sYatanarpon%20Cyber%20City!5e0!3m2!1sen!2smm!4v1620000000000!5m2!1sen!2smm"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Form Container */}
      <div className="rounded-2xl bg-transparent p-0">
        <form
          className="flex flex-col space-y-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label={messages.fields.firstName} />
            <Field label={messages.fields.lastName} />
          </div>

          <Field label={messages.fields.email} type="email" />

          <div className="block text-xs font-semibold text-black">
            <textarea
              required
              rows={4}
              placeholder={messages.fields.message}
              className="w-full resize-none rounded-2xl bg-[#dadada] px-5 py-3.5 text-sm font-medium text-black placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-[#2b303a] px-7 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-black"
            >
              {messages.submit} <Send className="size-3.5" />
            </button>
          </div>
        </form>
      </div>
    </section>

    {/* Cards Section */}
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 pt-4 pb-6 sm:grid-cols-2 lg:grid-cols-12 sm:px-6 lg:px-8">
      {/* Social Links Box */}
      <div className="flex flex-col items-center justify-center rounded-2xl bg-[#dadada] p-4 lg:col-span-4">
        <span className="mb-2 text-xs font-semibold text-black">
          {messages.follow}
        </span>
        <div className="flex items-center gap-5 text-xl text-black">
          <a href="#" aria-label={messages.social.facebook} className="hover:opacity-80">
            <SiFacebook />
          </a>
          <a href="#" aria-label={messages.social.whatsapp} className="hover:opacity-80">
            <SiWhatsapp />
          </a>
          <a href="#" aria-label={messages.social.tiktok} className="hover:opacity-80">
            <SiTiktok />
          </a>
        </div>
      </div>

      {/* Call Us Box */}
      <div className="flex items-center gap-3 rounded-2xl bg-[#dadada] p-4 lg:col-span-2">
        <Phone className="h-5 w-5 shrink-0 fill-black text-black" />
        <div className="text-xs">
          <span className="block font-bold text-black">{messages.call}</span>
          <span className="font-medium text-neutral-800">+95 969650030</span>
        </div>
      </div>

      {/* Email Us Box */}
      <div className="flex items-center gap-3 rounded-2xl bg-[#dadada] p-4 lg:col-span-3">
        <Mail className="h-5 w-5 shrink-0 fill-black text-black" />
        <div className="text-xs">
          <span className="block font-bold text-black">{messages.emailUs}</span>
          <span className="break-all font-medium text-neutral-800">
            healthyandhappygroup2017@gmail.com
          </span>
        </div>
      </div>

      {/* Location Box */}
      <div className="flex items-center gap-3 rounded-2xl bg-[#dadada] p-4 lg:col-span-3">
        <MapPin className="h-5 w-5 shrink-0 fill-black text-black" />
        <div className="text-xs">
          <span className="block font-bold text-black">{messages.location}</span>
          <span className="font-medium leading-tight text-neutral-800">
            {messages.address}
          </span>
        </div>
      </div>
    </section>
  </div>
);
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block w-full">
      <input
        required
        type={type}
        placeholder={label}
        className="w-full rounded-2xl bg-[#dadada] px-5 py-3.5 text-sm font-medium text-black placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </label>
  );
}

function ContactCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="flex flex-col items-center justify-center rounded-2xl bg-[#dadada] p-5 text-center">
      <span className="mb-2 flex items-center justify-center text-black">{icon}</span>
      <h2 className="text-xs font-extrabold text-black">{title}</h2>
      {text && <p className="mt-1 break-all text-xs font-medium text-neutral-800">{text}</p>}
    </article>
  );
}
