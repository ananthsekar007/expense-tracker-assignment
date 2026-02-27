import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CategoryDropdownProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CategoryDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
}: CategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label className="text-sm font-semibold text-gray-400">{label}</label>
      )}

      <div className="relative w-full">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#374151] rounded-xl border border-white/10 hover:border-white/20 transition-colors text-sm font-medium text-gray-200 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <TagIcon />
            {selected ? selected.label : placeholder}
          </span>
          <ChevronIcon open={open} />
        </button>

        {open && (
          <ul
            className="absolute z-50 w-full mt-1.5 bg-[#374151] border border-white/10 rounded-xl shadow-xl overflow-hidden p-1"
            onMouseDown={(e) => e.preventDefault()}
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-colors
                  ${
                    value === option.value
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
              >
                <TagIcon />
                {option.label}
                {value === option.value && <CheckIcon />}
              </li>
            ))}
          </ul>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}

const TagIcon = () => (
  <svg
    className="w-4 h-4 text-gray-500 flex-shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 6h.008v.008H6V6Z"
    />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
      open ? "rotate-180" : ""
    }`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-3.5 h-3.5 text-blue-400 ml-auto flex-shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);