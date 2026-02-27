import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { Transaction } from "../types/types";
import { getTransactions, setTransactions } from "../helpers/localStorage";

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: getTransactions(),
};

type TransactionAction =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "EDIT_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | { type: "SET_TRANSACTIONS"; payload: Transaction[] };

function transactionReducer(
  state: TransactionState,
  action: TransactionAction,
): TransactionState {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case "SET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };

    default:
      return state;
  }
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  editTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  getTransactionById: (id: string) => Transaction | undefined;
}

const TransactionContext = createContext<TransactionContextType | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  useEffect(() => {
    setTransactions(state.transactions);
  }, [state.transactions]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        ...transaction,
        id: crypto.randomUUID(),
      },
    });
  };

  const editTransaction = (transaction: Transaction) => {
    dispatch({ type: "EDIT_TRANSACTION", payload: transaction });
  };

  const deleteTransaction = (id: string) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const getTransactionById = (id: string): Transaction | undefined => {
    return state.transactions.find((t) => t.id === id);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        getTransactionById,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used inside <TransactionProvider>",
    );
  }
  return context;
}
