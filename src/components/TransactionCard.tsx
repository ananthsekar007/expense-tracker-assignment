import type { Transaction } from "../types/types";

interface TransactionCardProps {
  transaction: Transaction;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TransactionCard({
  transaction,
  onEdit,
  onDelete,
}: TransactionCardProps) {
  const isExpense = transaction.type === "expense";

  return (
    <div className="flex items-center w-full bg-[#111827] rounded-xl px-3 py-3 gap-3 mb-5 relative overflow-hidden">
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
          isExpense ? "bg-red-500" : "bg-green-500"
        }`}
      />
      <div
        className={`flex items-center justify-center rounded-full p-2 shrink-0 ml-1 ${
          isExpense ? "bg-red-950" : "bg-green-950"
        }`}
      >
        {isExpense ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" className="size-4">
            <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#22c55e" className="size-4">
            <path fillRule="evenodd" d="M12 21.75a.75.75 0 0 1-.75-.75V4.81L7.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L12.75 4.81V21a.75.75 0 0 1-.75.75Z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <p className="font-bold text-white text-sm truncate">
          {transaction.title}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 mt-1">
          <span className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            {new Date(transaction.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="badge badge-sm bg-yellow-900 text-yellow-400 border-none px-2 py-0.5 text-xs font-medium whitespace-nowrap">
            {transaction.category}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <p className={`font-bold text-sm w-30 text-right ${isExpense ? "text-red-400" : "text-green-400"}`}>
          {isExpense ? "- " : "+ "}${Number(transaction.amount).toFixed(2)}
        </p>

        <button
          onClick={() => onEdit(transaction.id)}
          className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </button>

        <button
          onClick={() => onDelete(transaction.id)}
          className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  );
}