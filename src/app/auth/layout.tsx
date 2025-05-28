"use client";

import { Footer, Navbar } from "@/components/landing-page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    transactions: 0,
    users: 0,
    volume: 0,
    successRate: 0,
  });

  console.log(pathName);

  // Handle scroll events for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate statistics
  useEffect(() => {
    const animateStats = () => {
      const targetStats = {
        transactions: 125000,
        users: 50000,
        volume: 250,
        successRate: 99.7,
      };

      const duration = 2000; // 2 seconds
      const frameRate = 60;
      const totalFrames = duration / (1000 / frameRate);
      let frame = 0;

      const interval = setInterval(() => {
        frame++;
        if (frame <= totalFrames) {
          const progress = frame / totalFrames;
          setAnimatedStats({
            transactions: Math.floor(targetStats.transactions * progress),
            users: Math.floor(targetStats.users * progress),
            volume: Math.floor(targetStats.volume * progress),
            successRate: parseFloat((targetStats.successRate * progress).toFixed(1)),
          });
        } else {
          clearInterval(interval);
          setAnimatedStats(targetStats);
        }
      }, 1000 / frameRate);

      return () => clearInterval(interval);
    };

    // Start animation after a small delay to ensure component is mounted
    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[rgb(48,48,48)] to-[rgb(31,31,31)]">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollPosition={scrollPosition}
        pathName={pathName}
      />
      <main className="flex-grow pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
}
