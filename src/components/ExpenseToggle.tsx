import { useState } from "react";

export type TransactionType = "expense" | "income";

interface TransactionToggleProps {
  value?: TransactionType;
  onChange?: (type: TransactionType) => void;
}

export default function TransactionToggle({
  value,
  onChange,
}: TransactionToggleProps) {
  const [internal, setInternal] = useState<TransactionType>("expense");
  const selected = value ?? internal;

  const handleSelect = (type: TransactionType) => {
    setInternal(type);
    onChange?.(type);
  };

  return (
    <div className="relative flex items-center bg-[#374151] rounded-xl p-1 w-fit m-auto">
      <div
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 4,
          width: "calc(50% - 4px)",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
          background: "hsl(var(--b1))",
          transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          transform:
            selected === "income"
              ? "translateX(calc(100%))"
              : "translateX(0px)",
        }}
      />
      <button
        onClick={() => handleSelect("expense")}
        type="button"
        className={`
          relative z-10 flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold
          transition-colors duration-300 cursor-pointer select-none w-32 justify-center
          ${selected === "expense" ? "text-base-content" : "text-base-content/40 hover:text-base-content/60"}
        `}
      >
        <span>↓</span>
        Expense
      </button>
      <button
        onClick={() => handleSelect("income")}
        type="button"
        className={`
          relative z-10 flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold
          transition-colors duration-300 cursor-pointer select-none w-32 justify-center
          ${selected === "income" ? "text-base-content" : "text-base-content/40 hover:text-base-content/60"}
        `}
      >
        <span>↑</span>
        Income
      </button>
    </div>
  );
}