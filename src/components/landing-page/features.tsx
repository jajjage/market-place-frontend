import { BarChart3, CreditCard, MessageCircle, Shield, Users, Lock } from "lucide-react";
import { FeatureCard } from "./small-comp";

export function FeaturesSection() {
  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Advanced Security Features
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Our platform offers comprehensive protection through advanced security technologies and
            transparent policies
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Buyer Protection"
            description="100% money-back guarantee if goods or services don't match the agreement"
            icon={<Shield className="text-blue-600" />}
          />
          <FeatureCard
            title="Seller Security"
            description="Verified payment confirmation before shipping goods or delivering services"
            icon={<Lock className="text-indigo-600" />}
          />
          <FeatureCard
            title="Dispute Resolution"
            description="Fair and impartial mediation with 98% satisfaction rate if issues arise"
            icon={<Users className="text-purple-600" />}
          />
          <FeatureCard
            title="Real-time Chat"
            description="End-to-end encrypted communication between buyers and sellers"
            icon={<MessageCircle className="text-green-600" />}
          />
          <FeatureCard
            title="Bank-Level Security"
            description="256-bit encryption and multi-factor authentication for all transactions"
            icon={<CreditCard className="text-red-600" />}
          />
          <FeatureCard
            title="Transaction Tracking"
            description="Real-time monitoring with detailed logs and automatic notifications"
            icon={<BarChart3 className="text-yellow-600" />}
          />
        </div>
      </div>
    </section>
  );
}
