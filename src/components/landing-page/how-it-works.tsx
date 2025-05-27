import { ShoppingCart, Lock, Truck, CheckCircle } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="diagonal-lines py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            How{" "}
            <span className="bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] bg-clip-text text-transparent">
              SafeTrade
            </span>{" "}
            Works
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            A simple four-step process to ensure secure transactions between buyers and sellers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-[rgba(143,242,93,0.3)] to-transparent lg:block"></div>
              )}
              <div
                className={`transform rounded-2xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] p-6 shadow-xl backdrop-blur-md transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_30px_rgba(143,242,93,0.15)] ${
                  index === 0 ? "peer-hover:scale-100" : ""
                }`}
              >
                <div className="mb-4 flex items-center">
                  <div className="rounded-xl bg-[rgba(143,242,93,0.1)] p-3 transition-colors duration-500 group-hover:bg-[rgba(143,242,93,0.2)]">
                    <step.icon size={24} className="text-[rgb(143,242,93)]" />
                  </div>
                  <span className="ml-4 text-lg font-bold text-[rgb(143,242,93)]">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    icon: ShoppingCart,
    title: "Place Order",
    description: "Buyer places an order and submits payment to our secure escrow system.",
  },
  {
    icon: Lock,
    title: "Funds Secured",
    description: "We securely hold the payment while the seller prepares the order.",
  },
  {
    icon: Truck,
    title: "Item Shipped",
    description: "Seller ships the item and provides tracking information.",
  },
  {
    icon: CheckCircle,
    title: "Complete",
    description: "Buyer confirms receipt and we release payment to the seller.",
  },
];
