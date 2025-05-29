import { Lock, Shield, Users } from "lucide-react";

interface TrustIndicatorsProps {
  stats: {
    totalTransactions: number;
    verifiedSellers: number;
    moneyProtected: number;
  };
}

export function TrustIndicators({ stats }: TrustIndicatorsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="flex items-center rounded-xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] p-4 backdrop-blur-md">
        <div className="mr-4 rounded-full bg-[rgba(143,242,93,0.1)] p-3">
          <Shield size={24} className="text-[rgb(143,242,93)]" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">
            {stats.totalTransactions.toLocaleString()}+
          </p>
          <p className="text-sm text-gray-400">Protected Transactions</p>
        </div>
      </div>

      <div className="flex items-center rounded-xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] p-4 backdrop-blur-md">
        <div className="mr-4 rounded-full bg-[rgba(143,242,93,0.1)] p-3">
          <Users size={24} className="text-[rgb(143,242,93)]" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{stats.verifiedSellers.toLocaleString()}+</p>
          <p className="text-sm text-gray-400">Verified Sellers</p>
        </div>
      </div>

      <div className="flex items-center rounded-xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] p-4 backdrop-blur-md">
        <div className="mr-4 rounded-full bg-[rgba(143,242,93,0.1)] p-3">
          <Lock size={24} className="text-[rgb(143,242,93)]" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">
            ${(stats.moneyProtected / 1000000).toFixed(1)}M+
          </p>
          <p className="text-sm text-gray-400">Money Protected</p>
        </div>
      </div>
    </div>
  );
}
