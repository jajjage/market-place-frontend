import { useState, useEffect } from "react";

export default function GoogleLoadingSpinner() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[linear-gradient(135deg,_rgb(48,48,48)_0%,_rgb(31,31,31)_100%)]">
      <div className="flex flex-col items-center rounded-lg bg-[rgba(31,31,31,0.98)] p-8 shadow-md border border-[rgba(143,242,93,0.15)]">
        {/* Escrow-style colored spinner */}
        <div className="relative h-12 w-12">
          <div className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-[rgb(143,242,93)] border-l-transparent border-t-transparent"></div>
          <div
            className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-[rgb(180,255,170)] border-l-transparent border-r-transparent border-t-transparent"
            style={{ animationDuration: "1.2s" }}
          ></div>
          <div
            className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-[rgb(48,48,48)] border-b-transparent border-l-transparent border-t-transparent"
            style={{ animationDuration: "1.5s" }}
          ></div>
          <div
            className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-[rgb(31,31,31)] border-b-transparent border-l-transparent border-r-transparent"
            style={{ animationDuration: "1.8s" }}
          ></div>
        </div>

        {/* Status text */}
        <div className="mt-6 text-center">
          <p className="text-lg font-medium text-[rgb(143,242,93)]">Signing in to Google</p>
          <p className="mt-2 text-sm text-gray-200">Please wait{dots}</p>
          <p className="mt-4 text-xs text-gray-400">This may take a few moments</p>
        </div>
      </div>
    </div>
  );
}
