export interface Transaction {
  id: string;
  type: "expense" | "income";
  title: string;
  description?: string;
  amount: string;
  date: string;
  category: string;
}