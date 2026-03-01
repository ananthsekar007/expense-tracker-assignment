import { useState } from "react";
import ExpenseToggle from "./ExpenseToggle";
import CategoryDropdown from "./Dropdown";
import FormField from "./FormField";
import type { TransactionType } from "./ExpenseToggle";
import { CATEGORIES } from "../constants/constants";
import { validateForm, type FormErrors } from "../helpers/formalValidation";
import { useTransactions } from "../context/TransactionContext";

export default function AddTransactionForm() {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState("food");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const amount = formData.get("amount") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;

    const newErrors = validateForm(title, amount, date, category);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    addTransaction({ type, category, title, description, amount, date });
    e.currentTarget.reset();
    setType("expense");
    setCategory("food");
    setErrors({});
  };

  const handleClear = (e: React.FormEvent<HTMLFormElement>) => {
    e.currentTarget.reset();
    setType("expense");
    setCategory("food");
    setErrors({});
  };

  return (
    <div className="bg-[#1f2937] rounded-lg m-5 pt-4 p-4 w-full">
      <div className="flex items-center mb-5">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#3b82f6"
            className="size-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        <p className="text-lg font-bold">Quick Add</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-md font-bold">Add Transaction</p>
        <div className={`badge border-0 ${type === "expense" ? "bg-amber-900 text-amber-500" : "bg-green-900 text-green-400"}`}>
          {type === "expense" ? "Expense" : "Income"}
        </div>
      </div>

      <hr className="opacity-10 mb-5" />

      <form onSubmit={handleSubmit} onReset={handleClear} className="flex flex-col w-full gap-4 p-5">
        <div className="w-full flex justify-center">
          <ExpenseToggle value={type} onChange={setType} />
        </div>

        <FormField label="Title" error={errors.title}>
          <label className="input bg-[#374151] border-[#374151] w-full">
            <input name="title" type="text" className="grow bg-[#374151]" placeholder="Title here" />
          </label>
        </FormField>

        <FormField label="Description">
          <label className="input bg-[#374151] border-[#374151] w-full">
            <input name="description" type="text" className="grow bg-[#374151]" placeholder="Groceries, Salary, etc." />
          </label>
        </FormField>

        <FormField label="Amount" error={errors.amount}>
          <label className="input bg-[#374151] border-[#374151] w-full">
            <input name="amount" type="text" className="grow bg-[#374151]" placeholder="0.00" />
          </label>
        </FormField>

        <FormField label="Date" error={errors.date}>
          <label className="input bg-[#374151] border-[#374151] w-full">
            <input name="date" type="date" className="grow bg-[#374151] text-gray-300" />
          </label>
        </FormField>

        <FormField label="Category" error={errors.category}>
          <CategoryDropdown
            placeholder="Select a category"
            value={category}
            onChange={(val) => { setCategory(val); setErrors(p => ({ ...p, category: undefined })); }}
            options={CATEGORIES}
          />
        </FormField>

        <div className="flex mt-2 gap-3">
          <button type="submit" className="btn btn-primary flex-1">Add</button>
          <button type="reset" className="btn btn-secondary flex-1">Clear</button>
        </div>
      </form>
    </div>
  );
}