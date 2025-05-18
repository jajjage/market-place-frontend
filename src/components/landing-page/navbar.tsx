import { Menu, X } from "lucide-react";
import React from "react";
import { Logo, NavLinks } from "./small-comp";
import Link from "next/link";
type NavProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrollPosition: number;
};
export function Navbar({ isMenuOpen, setIsMenuOpen, scrollPosition }: NavProps) {
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrollPosition > 20 ? "bg-white/95 shadow-sm backdrop-blur-sm" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Logo />
        </div>

        <nav className="hidden items-center space-x-8 md:flex">
          <NavLinks />
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <button className="font-medium text-gray-700 transition hover:text-blue-600">
                Login
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="transform rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 font-medium text-white transition hover:scale-105 hover:shadow-lg">
                Sign Up
              </button>
            </Link>
          </div>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-full w-full bg-white shadow-lg md:hidden">
          <div className="container mx-auto flex flex-col space-y-4 p-4">
            <a href="#" className="rounded-md p-2 hover:bg-gray-100">
              Home
            </a>
            <a href="#how-it-works" className="rounded-md p-2 hover:bg-gray-100">
              How It Works
            </a>
            <a href="#features" className="rounded-md p-2 hover:bg-gray-100">
              Features
            </a>
            <a href="#pricing" className="rounded-md p-2 hover:bg-gray-100">
              Pricing
            </a>
            <div className="flex flex-col space-y-2 border-t pt-4">
              <button className="w-full rounded-md border border-gray-300 p-2 text-center">
                Login
              </button>
              <button className="w-full rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 p-2 text-center text-white">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
