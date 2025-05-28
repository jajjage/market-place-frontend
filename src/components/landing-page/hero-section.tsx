import { ArrowRight, BarChart3, CheckCircle, Shield, Users, Info } from "lucide-react";
import { StatCard } from "./small-comp";
import Link from "next/link";

type StatsProps = {
  stats: {
    transactions: number;
    users: number;
    volume: number;
    successRate: number;
  };
};

export function HeroSection({ stats }: StatsProps) {
  return (
    <section id="hero" className="diagonal-lines relative min-h-[80vh]">
      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4">
        <div className="relative z-10 text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Secure Escrow Service for{" "}
            <span className="bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] bg-clip-text text-transparent">
              Safe Trading
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            Trade with confidence using our secure escrow service. We protect both buyers and
            sellers, ensuring safe and reliable transactions every time.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/auth/signup">
              <button className="flex transform items-center rounded-full bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] px-8 py-4 font-medium text-gray-800 transition hover:scale-105 hover:shadow-lg">
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </button>
            </Link>
            <Link href="/about">
              <button className="flex transform items-center rounded-full border border-[rgba(143,242,93,0.3)] bg-[rgba(31,31,31,0.95)] px-8 py-4 font-medium text-white backdrop-blur-md transition hover:scale-105 hover:border-[rgba(143,242,93,0.5)]">
                Learn More
                <Info className="ml-2" size={20} />
              </button>
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[rgba(31,31,31,0.95)] via-transparent to-[rgba(31,31,31,0.95)]"></div>
      </div>
    </section>
  );
}
