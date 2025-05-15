import { CheckCircle } from "lucide-react";
import { TestimonialPill } from "./small-comp";
import React from "react";

type CtaSectionProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export function CtaSection({email, setEmail}: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

      {/* Background Elements */}
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-white opacity-10"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white opacity-10"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Start Secure Trading Today</h2>
          <p className="mb-10 text-xl text-blue-100">
            Join thousands of satisfied users who trust our platform for their high-value online
            transactions
          </p>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col gap-4 md:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-full px-6 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="transform rounded-full border-2 border-white/20 bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-medium text-white transition hover:scale-105 hover:shadow-lg">
                Create Free Account
              </button>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <div className="mr-2 rounded-full bg-green-400/20 p-1">
                <CheckCircle size={16} className="text-green-400" />
              </div>
              <p className="text-sm text-blue-50">
                No credit card required • Free 30-day trial • Cancel anytime
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            <TestimonialPill name="John D." text="Sold my car with complete confidence" />
            <TestimonialPill name="Sarah M." text="Protected my freelance payment" />
            <TestimonialPill name="David R." text="Secure real estate transaction" />
            <TestimonialPill name="Emma L." text="Safe payment for custom artwork" />
          </div>
        </div>
      </div>
    </section>
  );
}
