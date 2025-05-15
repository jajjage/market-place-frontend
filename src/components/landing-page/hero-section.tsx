import { ArrowRight, BarChart3, CheckCircle, Shield, Users } from "lucide-react";
import { StatCard } from "./small-comp";

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
    <section className="relative overflow-hidden pb-20 pt-28 md:pb-32 md:pt-40">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>

      {/* Animated background shapes */}
      <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-indigo-400 opacity-10 blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row">
          <div className="w-full space-y-6 md:w-1/2">
            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              <span className="block">Trust-Verified</span>
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Escrow Services
              </span>
              <span className="block">for Online Transactions</span>
            </h1>
            <p className="text-xl text-gray-700 md:pr-10">
              Protecting buyers and sellers with bank-level security and transparent escrow
              solutions.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button className="flex transform items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-medium text-white transition hover:scale-105 hover:shadow-lg">
                Get Started
                <ArrowRight className="ml-2" size={18} />
              </button>
              <button className="rounded-full border-2 border-blue-600 px-8 py-3 font-medium text-blue-600 transition hover:bg-blue-50">
                Learn More
              </button>
            </div>
          </div>

          <div className="mt-12 w-full md:mt-0 md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                title="Transactions"
                value={stats.transactions.toLocaleString()}
                suffix="+"
                icon={BarChart3}
                iconClassName="text-blue-600"
              />
              <StatCard
                title="Active Users"
                value={stats.users.toLocaleString()}
                suffix="+"
                icon={Users}
                iconClassName="text-indigo-600"
              />
              <StatCard
                title="Volume Secured"
                value={stats.volume}
                prefix="$"
                suffix="M+"
                icon={Shield}
                iconClassName="text-purple-600"
              />
              <StatCard
                title="Success Rate"
                value={stats.successRate}
                suffix="%"
                icon={CheckCircle}
                iconClassName="text-green-600"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}