import { ChevronRight, Shield, Users } from "lucide-react";
import { BenefitItem } from "./small-comp";
import Link from "next/link";

export function BenefitsSection() {
  return (
    <section className="diagonal-lines-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Benefits For All Parties
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            Our platform creates a balanced ecosystem where both buyers and sellers can transact
            with confidence
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Buyers Card */}
          <div className="w-full md:w-1/2">
            <div className="h-full rounded-2xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] p-8 text-white shadow-xl backdrop-blur-md">
              <div className="mb-6 flex items-center">
                <div className="rounded-xl bg-[rgba(143,242,93,0.1)] p-3">
                  <Users size={32} className="text-[rgb(143,242,93)]" />
                </div>
                <h3 className="ml-4 text-2xl font-bold">For Buyers</h3>
              </div>

              <ul className="space-y-4">
                <BenefitItem text="Complete purchase protection with money-back guarantee" />
                <BenefitItem text="Verification of goods or services before payment release" />
                <BenefitItem text="Detailed quality inspection reports for physical goods" />
                <BenefitItem text="Transparent seller ratings and review system" />
                <BenefitItem text="Secure messaging with potential sellers" />
                <BenefitItem text="Milestone-based payments for complex transactions" />
              </ul>

              <div className="mt-8">
                <Link href="/auth/login">
                  <button className="flex transform items-center rounded-full bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] px-6 py-3 font-medium text-gray-800 transition hover:scale-105 hover:shadow-lg">
                    Start Buying Safely
                    <ChevronRight className="ml-2" size={18} />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sellers Card */}
          <div className="w-full md:w-1/2">
            <div className="h-full rounded-2xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] p-8 shadow-xl backdrop-blur-md">
              <div className="mb-6 flex items-center">
                <div className="rounded-xl bg-[rgba(143,242,93,0.1)] p-3">
                  <Shield size={32} className="text-[rgb(143,242,93)]" />
                </div>
                <h3 className="ml-4 text-2xl font-bold text-white">For Sellers</h3>
              </div>

              <ul className="space-y-4">
                <BenefitItem
                  text="Guaranteed payment confirmation before shipping"
                  color="text-gray-300"
                />
                <BenefitItem
                  text="Protection against fraudulent charge backs"
                  color="text-gray-300"
                />
                <BenefitItem
                  text="Verified buyer profiles with transaction history"
                  color="text-gray-300"
                />
                <BenefitItem
                  text="Secure payment processing with multiple options"
                  color="text-gray-300"
                />
                <BenefitItem
                  text="Fast funds release once delivery is confirmed"
                  color="text-gray-300"
                />
                <BenefitItem
                  text="Automated invoicing and tax documentation"
                  color="text-gray-300"
                />
              </ul>

              <div className="mt-8">
                <Link href={"/auth/login"}>
                  <button className="flex transform items-center rounded-full bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] px-6 py-3 font-medium text-gray-800 transition hover:scale-105 hover:shadow-lg">
                    Start Selling Securely
                    <ChevronRight className="ml-2" size={18} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
