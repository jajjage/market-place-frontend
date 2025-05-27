import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[rgb(31,31,31)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold">SafeTrade</h3>
            <p className="mb-4 text-gray-300">
              Your trusted platform for secure online transactions. We make trading safe and simple.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="transform rounded-full bg-[rgba(143,242,93,0.1)] p-2 transition hover:scale-110 hover:bg-[rgba(143,242,93,0.2)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} className="text-[rgb(143,242,93)]" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 text-xl font-bold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 transition hover:text-[rgb(143,242,93)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[rgba(143,242,93,0.1)] pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 text-gray-300 sm:flex-row sm:space-y-0">
            <p>&copy; {new Date().getFullYear()} SafeTrade. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-[rgb(143,242,93)]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[rgb(143,242,93)]">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Github, href: "#" },
];

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Documentation", href: "/docs" },
      { label: "API Status", href: "/status" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
];
