import {
  Shield,
  CreditCard,
  Clock,
  UserCheck,
  Receipt,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="diagonal-lines-subtle overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] bg-clip-text text-transparent">
              Security Features
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            Our platform is built with state-of-the-art security measures to ensure safe
            transactions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative transform rounded-2xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] p-6 shadow-xl backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(143,242,93,0.15)]"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_50%,rgba(143,242,93,0.1),transparent_70%)]"></div>
                <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-t from-transparent via-[rgba(143,242,93,0.03)] to-transparent"></div>
              </div>

              <div className="relative z-10">
                <div className="mb-4 w-fit rounded-xl bg-[rgba(143,242,93,0.1)] p-3 transition-colors duration-500 group-hover:bg-[rgba(143,242,93,0.2)]">
                  <feature.icon size={24} className="text-[rgb(143,242,93)]" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
                <ul className="mt-4 space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex translate-y-2 transform items-center text-gray-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                      style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                      <ArrowRight size={16} className="mr-2 text-[rgb(143,242,93)]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex transform items-center rounded-full bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] px-8 py-4 font-medium text-gray-800 transition hover:scale-105 hover:shadow-lg">
            Explore All Features
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Shield,
    title: "Secure Escrow System",
    description:
      "Our advanced escrow system ensures secure transactions between buyers and sellers.",
    details: [
      "Multi-layer encryption",
      "Automated verification",
      "Real-time monitoring",
      "Dispute resolution",
    ],
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Methods",
    description: "Support for various payment methods to accommodate different user preferences.",
    details: ["Credit & debit cards", "Bank transfers", "Cryptocurrency", "International payments"],
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Get instant notifications and updates about your transactions.",
    details: ["Push notifications", "Email alerts", "Status tracking", "Milestone updates"],
  },
  {
    icon: UserCheck,
    title: "Verified Users",
    description: "Our thorough verification process ensures a trusted trading community.",
    details: ["ID verification", "Business checks", "Address verification", "History tracking"],
  },
  {
    icon: Receipt,
    title: "Transaction History",
    description: "Access detailed transaction records and documentation.",
    details: ["Digital invoices", "Transaction records", "Tax documents", "Audit trails"],
  },
  {
    icon: MessageSquare,
    title: "Secure Messaging",
    description: "Built-in encrypted messaging system for seamless communication.",
    details: ["End-to-end encryption", "File sharing", "Message history", "Read receipts"],
  },
];
