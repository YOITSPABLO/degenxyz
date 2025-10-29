import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search markets..."
        className="w-full bg-black border-2 border-yellow-400/30 rounded-lg pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
      />
    </div>
  );
}
