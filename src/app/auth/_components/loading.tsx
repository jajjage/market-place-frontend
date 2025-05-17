"use client";

import { useState, useEffect } from "react";

export default function LoadingSpinner({ showText = true }: { showText?: boolean }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      {showText && <p className="ml-3 text-sm font-medium">Loading{dots}</p>}
    </div>
  );
}
