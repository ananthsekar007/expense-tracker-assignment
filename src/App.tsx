import { useState } from "react";
import { useTransactions } from "./context/TransactionContext";
import type { Transaction } from "./types/types";
import EditTransactionModal from "./components/EditTransactionModal";
import AddTransactionForm from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";

function App() {
  const { getTransactionById } = useTransactions();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleEditClick = (id: string) => {
    const transaction = getTransactionById(id);
    if (transaction) {
      setEditingTransaction(transaction);
      setIsEditModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start p-5">
      <EditTransactionModal
        transaction={editingTransaction}
        open={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setEditingTransaction(null); }}
      />
      <AddTransactionForm />
      <TransactionList onEdit={handleEditClick} />
    </div>
  );
}

export default App