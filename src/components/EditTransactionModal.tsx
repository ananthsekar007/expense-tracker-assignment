import { useEffect, useRef, useState } from "react";
import CategoryDropdown from "./Dropdown";
import ExpenseToggle from "./ExpenseToggle";
import type { TransactionType } from "./ExpenseToggle";
import { validateForm, type FormErrors } from "../helpers/formalValidation";
import { useTransactions } from "../context/TransactionContext";
import type { Transaction } from "../types/types";
import { CATEGORIES } from "../constants/constants";

interface EditTransactionModalProps {
  transaction: Transaction | null;
  open: boolean;
  onClose: () => void;
}

export default function EditTransactionModal({
  transaction,
  open,
  onClose,
}: EditTransactionModalProps) {
  const { editTransaction } = useTransactions();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState("food");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (open) {
      setType(transaction?.type ?? "expense");
      setCategory(transaction?.category ?? "food");
      setErrors({});
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);


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

    editTransaction({
      ...transaction!,
      type,
      title,
      description,
      amount,
      date,
      category,
    });

    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      id="editModal"
      className="modal"
    >
      <div className="modal-box bg-[#1f2937] max-w-md w-full">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Edit Transaction</h3>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>

        <hr className="opacity-10 mb-5" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Title</p>
            <label className={`input w-full bg-[#374151] ${errors.title ? "border-red-500" : "border-[#374151]"}`}>
              <input
                name="title"
                type="text"
                className="grow bg-[#374151]"
                placeholder="Title here"
                defaultValue={transaction?.title}
                key={transaction?.id + "-title"}
              />
            </label>
            {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Description</p>
            <label className="input bg-[#374151] border-[#374151] w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-gray-400 shrink-0">
                <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>
              <input
                name="description"
                type="text"
                className="grow bg-[#374151]"
                placeholder="Groceries, Salary, etc."
                defaultValue={transaction?.description}
                key={transaction?.id + "-description"}
              />
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Amount</p>
            <label className={`input w-full bg-[#374151] ${errors.amount ? "border-red-500" : "border-[#374151]"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <input
                name="amount"
                type="text"
                className="grow bg-[#374151]"
                placeholder="0.00"
                defaultValue={transaction?.amount}
                key={transaction?.id + "-amount"}
              />
            </label>
            {errors.amount && <p className="text-xs text-red-400">{errors.amount}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Date</p>
            <label className={`input w-full bg-[#374151] ${errors.date ? "border-red-500" : "border-[#374151]"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <input
                name="date"
                type="date"
                className="grow bg-[#374151] text-gray-300"
                defaultValue={transaction?.date}
                key={transaction?.id + "-date"}
              />
            </label>
            {errors.date && <p className="text-xs text-red-400">{errors.date}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <CategoryDropdown
              label="Category"
              placeholder="Select a category"
              value={category}
              onChange={(val) => {
                setCategory(val);
                setErrors((prev) => ({ ...prev, category: undefined }));
              }}
              options={CATEGORIES}
            />
            {errors.category && <p className="text-xs text-red-400">{errors.category}</p>}
          </div>

          <div className="flex gap-3 mt-2">
            <button type="submit" className="btn btn-primary flex-1">Save Changes</button>
            <button type="button" onClick={onClose} className="btn btn-secondary flex-1">Cancel</button>
          </div>

        </form>
      </div>
    </dialog>
  );
}