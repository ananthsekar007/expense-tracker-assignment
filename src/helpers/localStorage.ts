import type { Transaction } from "../types/types";

const STORAGE_KEY = "transactions";

export function getTransactions(): Transaction[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Transaction[];
  } catch {
    return [];
  }
}

export function setTransactions(transactions: Transaction[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}