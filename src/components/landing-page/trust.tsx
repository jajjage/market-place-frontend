import { Shield, Star, CheckCircle } from "lucide-react";

type TrustStat = {
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
  value: string;
  label: string;
};

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
};

export function TrustSection() {
  return (
    <section id="testimonial" className="diagonal-lines-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] bg-clip-text text-transparent">
              Thousands
            </span>{" "}
            of Users
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            Join our growing community of satisfied users who trust SafeTrade for their secure
            transactions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {trustStats.map((stat: TrustStat, index: number) => (
            <div
              key={index}
              className="transform rounded-2xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] p-6 text-center shadow-xl backdrop-blur-md transition hover:scale-105"
            >
              <div className="mx-auto mb-4 w-fit rounded-xl bg-[rgba(143,242,93,0.1)] p-3">
                <stat.icon size={24} className="text-[rgb(143,242,93)]" />
              </div>
              <h3 className="mb-2 text-3xl font-bold text-white">{stat.value}</h3>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <div
              key={index}
              className="transform rounded-2xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] p-6 shadow-xl backdrop-blur-md transition hover:scale-105"
            >
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-300">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300">{testimonial.text}</p>
              <div className="mt-4 flex text-[rgb(143,242,93)]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? "fill-current" : ""}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const trustStats: TrustStat[] = [
  {
    icon: Shield,
    value: "99.9%",
    label: "Secure Transactions",
  },
  {
    icon: Star,
    value: "50K+",
    label: "Happy Users",
  },
  {
    icon: CheckCircle,
    value: "$10M+",
    label: "Successfully Processed",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Online Seller",
    avatar: "/avatars/sarah.jpg",
    text: "SafeTrade has transformed how I do business online. The escrow system gives me peace of mind with every transaction.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Tech Entrepreneur",
    avatar: "/avatars/michael.jpg",
    text: "The platform is incredibly user-friendly and the customer support is exceptional. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emma Davis",
    role: "Digital Artist",
    avatar: "/avatars/emma.jpg",
    text: "As a freelancer, SafeTrade helps me ensure I get paid for my work. It's been a game-changer for my business.",
    rating: 5,
  },
];
