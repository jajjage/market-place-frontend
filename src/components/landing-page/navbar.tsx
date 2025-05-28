import { Menu, X } from "lucide-react";
import React, { useCallback } from "react";
import { Logo, NavLinks } from "./small-comp";
import Link from "next/link";
import { Button } from "../ui/button";

type NavProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrollPosition: number;
  pathName: string;
};

export function Navbar({ isMenuOpen, setIsMenuOpen, scrollPosition, pathName }: NavProps) {
  const scrollToSection = useCallback(
    (sectionId: string) => {
      const section = document.querySelector(sectionId);
      if (section) {
        const navbarHeight = 80;
        const targetPosition = section.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
        setIsMenuOpen(false); // Close mobile menu after clicking
      }
    },
    [setIsMenuOpen]
  );

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
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>

        {/* Center Navigation */}

        {!pathName.startsWith("/auth") && (
          <nav className="hidden items-center md:flex">
            <NavLinks />
          </nav>
        )}

        {/* Auth Buttons */}
        <div className="hidden items-center space-x-4 md:flex">
          <Link href="/auth/login">
            <Button
              variant="ghost"
              className="font-medium text-gray-300 transition hover:text-[rgb(143,242,93)]"
            >
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="transform bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] px-5 py-2 font-medium text-gray-800 transition hover:scale-105 hover:shadow-lg">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
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
            <button
              onClick={() => scrollToSection("#hero")}
              className="w-full rounded-md p-2 text-left text-gray-300 transition-all hover:bg-[rgba(143,242,93,0.1)]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("#how-it-works")}
              className="w-full rounded-md p-2 text-left text-gray-300 transition-all hover:bg-[rgba(143,242,93,0.1)]"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("#features")}
              className="w-full rounded-md p-2 text-left text-gray-300 transition-all hover:bg-[rgba(143,242,93,0.1)]"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("#pricing")}
              className="w-full rounded-md p-2 text-left text-gray-300 transition-all hover:bg-[rgba(143,242,93,0.1)]"
            >
              Pricing
            </button>
            <div className="flex flex-col space-y-2 border-t border-[rgba(143,242,93,0.1)] pt-4">
              <Link href="/auth/login">
                <button className="w-full rounded-md border border-[rgba(143,242,93,0.3)] bg-[rgba(31,31,31,0.95)] p-2 text-center text-gray-300 transition-all hover:border-[rgba(143,242,93,0.5)] hover:text-white">
                  Login
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="w-full rounded-md bg-gradient-to-r from-[rgb(190,255,170)] to-[rgb(180,255,160)] p-2 text-center text-gray-800">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
