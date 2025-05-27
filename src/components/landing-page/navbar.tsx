import { Menu, X } from "lucide-react";
import React from "react";
import { Logo, NavLinks } from "./small-comp";
import Link from "next/link";
import { Button } from "../ui/button";

type NavProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrollPosition: number;
};

export function Navbar({ isMenuOpen, setIsMenuOpen, scrollPosition }: NavProps) {
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrollPosition > 20
          ? "border-b border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.95)] shadow-md backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Logo />
        </div>

        <nav className="hidden items-center space-x-8 md:flex">
          <NavLinks />
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button className="font-medium text-gray-300 transition hover:text-[rgb(143,242,93)]">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="transform bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] px-5 py-2 font-medium text-gray-800 transition hover:scale-105 hover:shadow-lg">
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-300 hover:text-[rgb(143,242,93)]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-full w-full border-t border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.98)] shadow-lg backdrop-blur-md md:hidden">
          <div className="container mx-auto flex flex-col space-y-4 p-4">
            <a href="#" className="rounded-md p-2 text-gray-300 hover:bg-[rgba(143,242,93,0.1)]">
              Home
            </a>
            <a
              href="#how-it-works"
              className="rounded-md p-2 text-gray-300 hover:bg-[rgba(143,242,93,0.1)]"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="rounded-md p-2 text-gray-300 hover:bg-[rgba(143,242,93,0.1)]"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="rounded-md p-2 text-gray-300 hover:bg-[rgba(143,242,93,0.1)]"
            >
              Pricing
            </a>
            <div className="flex flex-col space-y-2 border-t border-[rgba(143,242,93,0.1)] pt-4">
              <button className="w-full rounded-md border border-[rgba(143,242,93,0.3)] bg-[rgba(31,31,31,0.95)] p-2 text-center text-gray-300 hover:border-[rgba(143,242,93,0.5)] hover:text-white">
                Login
              </button>
              <button className="w-full rounded-md bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] p-2 text-center text-gray-800">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
