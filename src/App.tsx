import { useState } from "react";
import "./App.css";
import ExpenseToggle from "./components/ExpenseToggle";
import CategoryDropdown from "./components/Dropdown";
import type { TransactionType } from "./components/ExpenseToggle";
import TransactionCard from "./components/TransactionCard";
import { dummyTransactions } from "./constants/constants";

const CATEGORIES = [
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "shopping", label: "Shopping" },
  { value: "health", label: "Health" },
  { value: "entertainment", label: "Entertainment" },
  { value: "salary", label: "Salary" },
];

function App() {
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let id = crypto.randomUUID()

    const values = {
      id,
      type,
      category,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      amount: formData.get("amount") as string,
      date: formData.get("date") as string,
    };

    console.log(values);
  };

  const handleClear = (e: React.FormEvent<HTMLFormElement>) => {
    e.currentTarget.reset();
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start p-5">

      <div className="bg-[#1f2937] rounded-lg m-5 pt-4 p-4 w-full">
        <div className="flex items-center mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3b82f6" className="size-6 mr-2">
            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
          </svg>
          <p className="text-lg font-bold">Quick Add</p>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <p className="text-md font-bold">Add Transaction</p>
            {type === "expense" ? (
              <div className="badge bg-amber-900 text-amber-500 border-0">Expense</div>
            ) : (
              <div className="badge bg-green-900 text-green-400 border-0">Income</div>
            )}
          </div>

          <hr className="opacity-10 mb-5" />
          <form onSubmit={handleSubmit} onReset={handleClear} className="flex flex-col w-full gap-4 p-5">

            <div className="w-full flex justify-center">
              <ExpenseToggle value={type} onChange={setType} />
            </div>

            <div className="flex flex-col w-full gap-1">
              <p className="text-sm font-semibold text-gray-400">Title</p>
              <label className="input bg-[#374151] border-[#374151] w-full">
                <input name="title" type="text" className="grow bg-[#374151]" placeholder="Title here" />
              </label>
            </div>

            <div className="flex flex-col w-full gap-1">
              <p className="text-sm font-semibold text-gray-400">Description</p>
              <label className="input bg-[#374151] border-[#374151] w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-gray-400 shrink-0">
                  <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                </svg>
                <input name="description" type="text" className="grow bg-[#374151]" placeholder="Groceries, Salary, etc." />
              </label>
            </div>

            <div className="flex flex-col w-full gap-1">
              <p className="text-sm font-semibold text-gray-400">Amount</p>
              <label className="input bg-[#374151] border-[#374151] w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <input name="amount" type="text" className="grow bg-[#374151]" placeholder="0.00" />
              </label>
            </div>

            <div className="flex flex-col w-full gap-1">
              <p className="text-sm font-semibold text-gray-400">Date</p>
              <label className="input bg-[#374151] border-[#374151] w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <input name="date" type="date" className="grow bg-[#374151] text-gray-300" />
              </label>
            </div>

            <CategoryDropdown
              label="Category"
              placeholder="Select a category"
              value={category}
              onChange={setCategory}
              options={CATEGORIES}
            />

            <div className="flex mt-2 gap-3">
              <button type="submit" className="btn btn-primary flex-1">Add</button>
              <button type="reset" className="btn btn-secondary flex-1">Clear</button>
            </div>

          </form>
        </div>
      </div>

      <div className="bg-[#1f2937] rounded-lg m-5 pt-4 p-4 w-full">
        <div className="flex flex-col sm:flex-row gap-3 shrink-0 items-center">
          <label className="input bg-[#374151] border-[#374151] w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-gray-400 shrink-0">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
            <input type="text" className="grow bg-[#374151]" placeholder="Search Transactions..." />
          </label>
          <div className="sm:w-56 shrink-0">
            <CategoryDropdown
              placeholder="All Categories"
              value={"all"}
              onChange={() => {}}
              options={[{ value: "all", label: "All Categories" }, ...CATEGORIES]}
            />
          </div>
        </div>
        <div className="gap-3 max-h-64 lg:max-h-150 overflow-y-auto mt-5">
          {dummyTransactions.map((t) => (
            <TransactionCard
              key={t.id}
              transaction={t}
              onEdit={(id) => console.log("Edit", id)}
              onDelete={(id) => console.log("Delete", id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;