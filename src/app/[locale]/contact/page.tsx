"use client";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SiFacebook, SiTiktok, SiWhatsapp } from "react-icons/si";
import type { ReactNode } from "react";
export default function ContactPage() {
  return (
    <div className="bg-background">
      <section className="border-b bg-white px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">Contact Us</h1>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 sm:px-6 lg:px-8">
        <div className="h-100 overflow-hidden rounded-2xl border bg-[#e5e5e5] shadow-sm">
          <iframe
            title="Healthy & Happy Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3776.0!2d96.08!3d21.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb6e3a7af05de5%3A0x4e1e5e4c5c5a5c5a!2sYatanarpon%20Cyber%20City!5e0!3m2!1sen!2smm!4v1620000000000!5m2!1sen!2smm"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
          <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name" />
              <Field label="Last Name" />
            </div>
            <Field label="Email" type="email" />
            <label className="block text-sm font-medium">
              Message
              <textarea
                required
                rows={5}
                placeholder="Message"
                className="mt-1 w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm"
              />
            </label>
            <div className="flex justify-end">
              <button className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-white">
                Submit <Send className="size-4" />
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <ContactCard
          icon={
            <>
              <SiFacebook />
              <SiWhatsapp />
              <SiTiktok />
            </>
          }
          title="Follow Us On"
          text=""
        />
        <ContactCard icon={<Phone />} title="Call Us" text="+95 969650030" />
        <ContactCard icon={<Mail />} title="Email Us" text="healthyandhappygroup2017@gmail.com" />
        <ContactCard icon={<MapPin />} title="Location" text="Yatanarpon Cyber City, Myanmar" />
      </section>
    </div>
  );
}
function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        required
        type={type}
        placeholder={label}
        className="mt-1 w-full rounded-xl border bg-background px-4 py-3 text-sm"
      />
    </label>
  );
}
function ContactCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="flex flex-col items-center rounded-2xl border bg-white p-5 text-center shadow-sm">
      <span className="mb-2 flex gap-2 text-primary">{icon}</span>
      <h2 className="text-sm font-bold text-primary">{title}</h2>
      {text && <p className="mt-1 break-all text-xs text-muted">{text}</p>}
    </article>
  );
}
