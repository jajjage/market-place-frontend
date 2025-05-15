import { SecurityBadge, TrustItem } from "./small-comp";

export function TrustSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Trust & Security Guarantees
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Our platform is built on a foundation of robust security protocols and transparent
            business practices
          </p>
        </div>

        <div className="flex flex-col rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 shadow-md md:flex-row md:items-center md:justify-between">
          <div className="mb-8 md:mb-0 md:w-1/2 md:pr-8">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Industry-Leading Security Standards
            </h3>
            <ul className="space-y-4">
              <TrustItem text="SOC 2 Type II certified with annual security audits" />
              <TrustItem text="Bank-level 256-bit encryption for all data" />
              <TrustItem text="Multi-factor authentication on all accounts" />
              <TrustItem text="Automated fraud detection systems" />
              <TrustItem text="Dedicated security team monitoring 24/7" />
            </ul>
          </div>

          <div className="flex flex-col space-y-6 md:w-1/2">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
              <h4 className="mb-2 text-lg font-bold">Financial Protection</h4>
              <p className="text-gray-600">
                All funds held in escrow are stored in segregated accounts and fully insured up to
                $250,000 through our banking partners.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
              <h4 className="mb-2 text-lg font-bold">Verification System</h4>
              <p className="text-gray-600">
                Advanced ID verification for all users, including document verification and
                biometric checks for high-value transactions.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
              <h4 className="mb-2 text-lg font-bold">Transparent Pricing</h4>
              <p className="text-gray-600">
                Clear fee structure with no hidden charges. Pay only when your transaction completes
                successfully.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          <SecurityBadge text="PCI DSS Compliant" />
          <SecurityBadge text="GDPR Compliant" />
          <SecurityBadge text="SOC 2 Certified" />
          <SecurityBadge text="SSL Encrypted" />
          <SecurityBadge text="Money License" />
        </div>
      </div>
    </section>
  );
}


