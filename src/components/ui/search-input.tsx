// Search Input Component (if not exists)
interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function SearchInput({
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false,
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled === true}
        className={`w-full rounded-lg border border-gray-600/30 bg-gray-800/50 px-4 py-2 pl-10 pr-4 text-white placeholder-gray-400 transition-colors duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled === true ? "cursor-not-allowed opacity-50" : ""} `}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 transform">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}
