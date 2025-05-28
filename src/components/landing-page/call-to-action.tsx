import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { TestimonialPill } from "./small-comp";
import React from "react";

export function CtaSection() {
  return (
    <section className="diagonal-lines-green py-20">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] p-12 shadow-2xl backdrop-blur-md">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Ready to Trade with{" "}
              <span className="bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] bg-clip-text text-transparent">
                Confidence?
              </span>
            </h2>
            <p className="mb-8 text-xl text-gray-300">
              Join thousands of satisfied users who trust SafeTrade for their secure transactions.
              Start your journey today!
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/auth/signup">
                <button className="flex transform items-center rounded-full bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] px-8 py-4 font-medium text-gray-800 transition hover:scale-105 hover:shadow-lg">
                  Get Started Now
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex transform items-center rounded-full border border-[rgba(143,242,93,0.3)] bg-[rgba(31,31,31,0.95)] px-8 py-4 font-medium text-white backdrop-blur-md transition hover:scale-105 hover:border-[rgba(143,242,93,0.5)]">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
