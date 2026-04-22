import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterProps {
  onClick: () => void;
  isDropdownOpen: boolean;
  selectedFilters: string;
  toggleFilter: (status: "draft" | "pending" | "paid") => void;
}

const Filter = ({
  onClick,
  isDropdownOpen,
  selectedFilters,
  toggleFilter,
}: FilterProps) => {
  const statuses = ["draft", "pending", "paid"] as const;

  const handleFilterChange = (status: (typeof statuses)[number]) => {
    toggleFilter(status);
  };

  return (
    <div className="relative cursor-pointer">
      <div
        onClick={onClick}
        className="flex items-center group gap-1 font-bold hover:text-[var(--text-form)]"
      >
        Filter <span className="hidden md:block">by status</span>
        {isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      {isDropdownOpen && (
        <div className="absolute top-full right-0 z-10 flex flex-col gap-4 w-48 bg-[var(--bg-card)] shadow-lg rounded-lg p-6 mt-5">
          {statuses.map((status) => (
            <div key={status} className="flex items-center gap-4">
              <input
                type="checkbox"
                id={`filter-${status}`}
                checked={selectedFilters.includes(status)}
                onChange={() => handleFilterChange(status)}
                className="w-4 h-4 cursor-pointer accent-purple-500"
                aria-label={`Filter by ${status} invoices`}
              />
              <label
                htmlFor={`filter-${status}`}
                className="capitalize cursor-pointer flex-1"
              >
                {status}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
