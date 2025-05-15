import {
  ArrowRight,
  Shield,
  Users,
  CheckCircle,
  MessageCircle,
  CreditCard,
  BarChart3,
  Menu,
  X,
  ChevronRight,
  Lock,
  Clock,
  Star,
  LucideIcon,
} from "lucide-react";
import React from "react";

export function Logo() {
  return (
    <div className="flex items-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">
        <Lock className="text-white" size={20} />
      </div>
      <span className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent">
        SecureEscrow
      </span>
    </div>
  );
}

// Nav Links Component
export function NavLinks() {
  return (
    <>
      <a href="#" className="font-medium text-gray-700 transition hover:text-blue-600">
        Home
      </a>
      <a href="#how-it-works" className="font-medium text-gray-700 transition hover:text-blue-600">
        How It Works
      </a>
      <a href="#features" className="font-medium text-gray-700 transition hover:text-blue-600">
        Features
      </a>
      <a href="#pricing" className="font-medium text-gray-700 transition hover:text-blue-600">
        Pricing
      </a>
    </>
  );
}

type StatCardProps = {
  title: string;
  value: string | number;
  prefix?: string;
  suffix: string;
  icon: LucideIcon;
  iconClassName: string;
};
export function StatCard({
  title,
  value,
  prefix = "",
  suffix = "",
  icon: Icon,
  iconClassName,
}: StatCardProps) {
  return (
    <div className="transform rounded-xl border border-gray-100 bg-white bg-opacity-90 p-6 shadow-md backdrop-blur-sm transition hover:scale-105 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium text-gray-600">{title}</h3>
        <div className="rounded-full bg-blue-50 p-2">
          <Icon className={iconClassName} />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">
        {prefix}
        {value}
        {suffix}
      </p>
    </div>
  );
}

type ProcessCardProps = {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export function ProcessCard({ step, title, description, icon }: ProcessCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-b from-gray-50 to-white p-8 shadow-md transition hover:shadow-lg">
      <div className="absolute right-0 top-0 flex h-16 w-16 items-center justify-center rounded-bl-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white">
        {step}
      </div>
      <div className="mb-6 inline-block rounded-full bg-blue-50 p-4">{icon}</div>
      <h3 className="mb-4 text-2xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 group-hover:w-full"></div>
    </div>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="flex rounded-xl border border-gray-100 bg-white p-6 shadow-md transition hover:border-blue-200 hover:shadow-lg">
      <div className="h-fit rounded-xl bg-blue-50 p-4">{icon}</div>
      <div className="ml-4">
        <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

type TrustItemProps = {
  text: string;
};

export function TrustItem({ text }: TrustItemProps) {
  return (
    <div className="flex items-center">
      <div className="mr-3 rounded-full bg-green-100 p-1">
        <CheckCircle size={20} className="text-green-600" />
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}

// Security Badge Component
export function SecurityBadge({ text }: TrustItemProps) {
  return (
    <div className="flex items-center rounded-full bg-gray-100 px-4 py-2">
      <Lock size={16} className="mr-2 text-gray-700" />
      <span className="font-medium text-gray-700">{text}</span>
    </div>
  );
}

type BenefitItemProps = {
  text: string;
  color?: string;
};

export function BenefitItem({ text, color = "text-white" }: BenefitItemProps) {
  return (
    <div className="flex items-center">
      <div
        className={`p-1 ${color === "text-white" ? "bg-white/20" : "bg-green-100"} mr-3 rounded-full`}
      >
        <CheckCircle
          size={18}
          className={color === "text-white" ? "text-white" : "text-green-600"}
        />
      </div>
      <p className={color}>{text}</p>
    </div>
  );
}

type TestimonialPillProps = {
  name: string;
  text: string;
}

export function TestimonialPill({ name, text }:TestimonialPillProps) {
  return (
    <div className="flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
      <div className="mr-2 rounded-full bg-blue-400/20 p-1">
        <Star size={14} className="text-yellow-300" />
      </div>
      <p className="truncate text-sm text-white">
        <span className="font-medium">{name}:</span> {text}
      </p>
    </div>
  );
}

type FooterLinksProps = {
  links: string[]
}

export function FooterLinks({ links }: FooterLinksProps) {
  return (
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a href="#" className="transition hover:text-white">
            {link}
          </a>
        </li>
      ))}
    </ul>
  );
}

type SocialIconType = "twitter" | "facebook" | "instagram" | "linkedin";
type SocialIconProps = {
  icon?: SocialIconType;
  label: string;
}

// Social Icon Component
export function SocialIcon({ icon, label }: SocialIconProps) {
  const icons = {
    twitter: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    ),
    facebook: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
    instagram: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    linkedin: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  };
  return (
    <a
      href="#"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 transition hover:bg-blue-600"
    >
      <span className="sr-only">{label || "Social Media"}</span>
      {icons[icon ?? "twitter"]}
    </a>
  );
}

type PaymentType = "visa" | "mastercard" | "paypal" | "applePay";
type PaymentIconProps = {
  type: PaymentType
}
export function PaymentIcon({ type }: PaymentIconProps) {
  const icons: Record<PaymentType, JSX.Element> = {
    visa: (
      <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor">
        <path d="M11.447 8.016L9.43 12.02H8.136L7.147 8.794c-.06-.24-.111-.32-.295-.42A5.986 5.986 0 0 0 5.6 8.016h.028c.433 0 .825.273.928.682l.847 3.322h1.479l2.003-4.004h-1.438zm6.688 2.67c.006-1.156-1.596-1.221-1.583-1.741.004-.157.153-.325.481-.368.162-.021.609-.037.1.193l.277-.91c-.288-.098-.585-.19-.904-.19-1.06 0-1.7.566-1.707 1.372-.008.598.502.93.885 1.129.394.203.526.334.525.515-.3.278-.314.404-.608.408-.507.009-.802-.14-.1-.24l-.3.94c.298.095.537.174.906.178 1 .018 1.67-.557 1.675-1.429zm2.496 1.334H22.2c.289 0 .525-.12.638-.328l.45-1.041-1.43-3.32h1.44l.76 2.108.447-2.108h1.44l-1.554 4.69h-1.32l.248-.748zm-3.776-4.69l-1.133 4.004h-1.375l1.133-4.004h1.375zm-6.279 0l-2.165 4.004h-1.38l-.309-1.511c-.524.343-1.104.636-1.729.835l.25-.328H3.6c.288 0 .525-.186.605-.472l1.109-2.528h1.437zM24.407 6c-.546 0-1.92.045-1.92.045S21.6 6 21.053 6H9.54c-.545 0-.987.442-.987.987v7.024c0 .546.442.989.987.989h14.913c.546 0 .987-.443.987-.989V6.987c0-.545-.441-.987-.987-.987h-.046z" />
      </svg>
    ),
    mastercard: (
      <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor">
        <path d="M10.5 14a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7zm4-1h3v-6h-8v6h3a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-3v6h3a2 2 0 0 0 2 2z" />
        <path d="M12.5 8a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm.5 3V9h2v2h-2z" />
      </svg>
    ),
    paypal: (
      <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor">
        <path d="M19.768 8.69c-.154-.87-.744-1.194-1.583-1.194h-.26a.445.445 0 0 0-.447.44v2.703c0 .242.203.44.447.44h.26c.849 0 1.428-.332 1.583-1.201.028-.177.043-.348.043-.595 0-.246-.015-.418-.043-.594zM21.66 10c-.152.96-.91 1.49-2.152 1.49h-.552a.223.223 0 0 0-.223.22v1.71c0 .18-.15.327-.335.346l-1.305.134a.356.356 0 0 1-.393-.353V7.167c0-.193.16-.35.358-.35h2.45c1.242 0 2 .53 2.152 1.49.044.29.07.54.07.847 0 .306-.026.556-.07.846z" />
        <path d="M10.9 11.489H9.033l-.124.766a.356.356 0 0 1-.353.305H7.2a.226.226 0 0 1-.224-.267l1.112-5.94a.58.58 0 0 1 .569-.472h2.53c1.242 0 2 .53 2.152 1.49.044.29.07.54.07.847 0 1.053-.268 1.707-.783 2.19-.514.484-1.306.692-2.365.692-.492 0-.896-.055-1.207-.166-.31-.11-.465-.277-.465-.498 0-.56.119-.952.356-1.192.238-.24.692-.361 1.364-.361h.59zm.283-2.8H9.37c-.194 0-.364.143-.395.333l-.338 2.1h1.634c.607 0 1.054-.098 1.339-.293.285-.195.427-.51.427-.941 0-.236-.061-.408-.183-.517-.122-.108-.251-.176-.387-.206a2.655 2.655 0 0 0-.568-.045c-.108 0-.166-.108-.166-.108s.058-.323.058-.323z" />
        <path d="M15.255 11.49h-1.868l-.123.766a.356.356 0 0 1-.353.304h-1.356a.226.226 0 0 1-.224-.267l1.112-5.94a.58.58 0 0 1 .569-.472h2.53c1.242 0 2 .53 2.152 1.49.044.29.07.54.07.847 0 1.053-.268 1.707-.783 2.19-.514.484-1.306.692-2.365.692-.492 0-.896-.055-1.207-.166-.31-.11-.465-.277-.465-.498 0-.56.119-.952.356-1.192.238-.24.692-.361 1.364-.361h.59zm.282-2.8h-1.813c-.194 0-.364.143-.395.333l-.338 2.1h1.634c.608 0 1.054-.098 1.34-.293.284-.195.427-.51.427-.941 0-.236-.061-.408-.183-.517-.123-.108-.252-.176-.388-.206a2.655 2.655 0 0 0-.567-.045c-.109 0-.167-.108-.167-.108s.058-.323.058-.323h.392z" />
      </svg>
    ),
    applePay: (
      <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor">
        <path d="M16.12 12.61c-.15-.42-.44-.76-.88-1.03-.43-.26-.89-.4-1.35-.4-.58 0-1.1.16-1.58.49-.48.33-.86.77-1.14 1.34-.28.57-.41 1.2-.41 1.92 0 .71.15 1.35.44 1.9.29.56.68 1 1.17 1.3.49.31 1.03.47 1.62.47.71 0 1.32-.19 1.84-.57.52-.38.88-.87 1.07-1.48h-1.41c-.08.17-.21.3-.4.4-.19.1-.4.15-.64.15-.34 0-.61-.1-.81-.31-.2-.21-.33-.49-.39-.84h3.67c.01-.12.01-.22.01-.31 0-.9-.17-1.67-.51-2.33zm-3.44 1.26c.08-.33.22-.59.42-.77.2-.18.44-.27.73-.27.3 0 .55.09.74.27.19.18.31.43.37.77h-2.26z" />
        <path d="M8.09 12.44c-.36 0-.67.1-.94.29-.27.19-.47.45-.6.77h-.02v-.91H5v5.29h1.57v-2.78c0-.36.11-.65.33-.87.22-.22.49-.33.82-.33.3 0 .53.08.7.26.17.17.25.43.25.77v2.95h1.57v-3.13c0-.71-.19-1.25-.56-1.61-.37-.36-.83-.54-1.39-.54-.42 0-.8.1-1.12.31-.32.2-.56.48-.71.82h-.04v-.99h-1.5v5.17h1.57v-2.78c0-.36.11-.65.33-.87.22-.22.49-.33.82-.33.3 0 .53.08.7.26.17.17.25.43.25.77v2.95h1.57v-3.13c0-.71-.19-1.25-.56-1.61-.37-.36-.84-.54-1.39-.54z" />
        <path d="M21.86 16.95c-.37 0-.69-.16-.94-.49-.26-.33-.39-.77-.39-1.33 0-.58.13-1.04.4-1.39.27-.35.59-.52.96-.52.37 0 .68.16.93.47.25.31.38.75.38 1.32 0 .57-.13 1.03-.38 1.38-.26.35-.57.53-.96.56zm1.01-5.16v1.05h-.04c-.15-.21-.36-.39-.64-.52-.28-.13-.57-.19-.87-.19-.44 0-.84.13-1.21.38-.36.25-.66.6-.88 1.05-.22.45-.33.96-.33 1.54 0 .57.11 1.07.32 1.5.21.43.5.77.87 1.01.37.24.79.36 1.25.36.31 0 .6-.06.86-.19.26-.12.48-.29.65-.5h.04v.54h1.52v-6.07h-1.54v.04z" />
      </svg>
    ),
  };

  return (
    <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-800 text-gray-300 transition hover:text-white">
      {type ? icons[type] : <CreditCard size={20} />}
    </div>
  );
}