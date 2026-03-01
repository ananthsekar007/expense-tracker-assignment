import { useState } from "react";
import CategoryDropdown from "./Dropdown";
import TransactionCard from "./TransactionCard";
import { FILTER_CATEGORIES } from "../constants/constants";
import { useTransactions } from "../context/TransactionContext";

interface TransactionListProps {
  onEdit: (id: string) => void;
}

export default function TransactionList({ onEdit }: TransactionListProps) {
  const { transactions, deleteTransaction } = useTransactions();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "all" || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#1f2937] rounded-lg m-5 pt-4 p-4 w-full">
      <div className="flex flex-col sm:flex-row gap-3 shrink-0 items-center">
        
        <label className="input bg-[#374151] border-[#374151] w-full">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 text-gray-400 shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          <input
            type="text"
            className="grow bg-[#374151]"
            placeholder="Search Transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <div className="sm:w-56 shrink-0">
          <CategoryDropdown
            placeholder="All Categories"
            value={filterCategory}
            onChange={setFilterCategory}
            options={FILTER_CATEGORIES}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 max-h-150 lg:h-150 overflow-y-auto mt-5">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            {transactions.length === 0 ? "No transactions yet. Add one!" : "No transactions match your filters."}
          </p>
        ) : (
          filtered.map((t) => (
            <TransactionCard
              key={t.id}
              transaction={t}
              onEdit={onEdit}
              onDelete={(id) => deleteTransaction(id)}
            />
          ))
        )}
      </div>
    </div>
  );
}