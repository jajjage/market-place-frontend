import { CheckCircle, CreditCard, Shield } from "lucide-react";
import { ProcessCard } from "./small-comp";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            How Our Escrow Service Works
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Our platform provides a simple yet secure three-step process to protect all parties in
            online transactions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <ProcessCard
            step={1}
            title="Secure Payment"
            description="Buyer funds the escrow account with our secure payment system. Funds are verified but not yet released to the seller."
            icon={<CreditCard size={32} className="text-blue-600" />}
          />
          <ProcessCard
            step={2}
            title="Protected Holding"
            description="Seller delivers the product or service. The funds remain safely held in the escrow account until buyer approval."
            icon={<Shield size={32} className="text-indigo-600" />}
          />
          <ProcessCard
            step={3}
            title="Safe Release"
            description="Buyer approves the transaction after receiving and verifying the goods or services. Funds are released to the seller."
            icon={<CheckCircle size={32} className="text-green-600" />}
          />
        </div>
      </div>
    </section>
  );
}
