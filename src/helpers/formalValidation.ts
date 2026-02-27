export interface FormErrors {
  title?: string;
  amount?: string;
  date?: string;
  category?: string;
}

export const validateForm = (title: string, amount: string, date: string, category: string): FormErrors => {
    const newErrors: FormErrors = {};

    if (!title.trim())
      newErrors.title = "Title is required";

    if (!amount.trim())
      newErrors.amount = "Amount is required";
    else if (!/^\d+(\.\d{1,2})?$/.test(amount.trim()))
      newErrors.amount = "Amount must be a valid number (e.g. 50 or 50.99)";
    else if (Number(amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";

    if (!date)
      newErrors.date = "Date is required";

    if (!category)
      newErrors.category = "Please select a category";

    return newErrors;
  };