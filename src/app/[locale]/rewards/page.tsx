import Link from "next/link";
import { ArrowRight, Gift, Star } from "lucide-react";
export default function RewardsPage() {
  const steps = [
    [
      "1",
      "Join the Family",
      "Sign up for free at any official retail point or via our social media channels.",
    ],
    ["2", "Earn Points", "Get 1 point for every 1,000 MMK spent on Healthy & Happy products."],
    ["3", "Claim Rewards", "Redeem points for free cookies, discounts, or exclusive merchandise."],
  ] as const;
  return (
    <div className="bg-background pb-24">
      <section className="border-b bg-secondary/20 px-4 py-20 text-center">
        <Gift className="mx-auto mb-6 size-10 text-secondary" />
        <h1 className="text-4xl font-bold text-primary md:text-5xl">Healthy &amp; Happy Rewards</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          Because choosing health should always be rewarding. Join our loyalty program to earn
          points on every purchase.
        </p>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <h2 className="mb-16 text-center text-3xl font-bold text-primary">
          How to Earn &amp; Redeem
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(([number, title, text]) => (
            <article key={number} className="rounded-3xl border bg-white p-8 text-center shadow-sm">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary font-serif text-xl font-bold text-white">
                {number}
              </span>
              <h3 className="mt-6 text-xl font-bold text-primary">{title}</h3>
              <p className="mt-3 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4">
        <div className="rounded-3xl bg-primary p-10 text-center text-white md:p-16">
          <Star className="mx-auto mb-6 size-12 text-yellow-300" />
          <h2 className="text-3xl font-bold">Start Earning Today</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/80">
            Ready to make your healthy habits even sweeter? Contact our team to register your phone
            number for the rewards program.
          </p>
          <Link
            href="/en/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3 text-lg font-bold"
          >
            Register Now <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
