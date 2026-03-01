import { useMemo } from "react";
import { useTransactions } from "../context/TransactionContext";
import { CATEGORY_COLORS, CATEGORY_DOT_COLORS } from "../constants/constants";
import StatCard from "./StatCard";


export default function FinancialOverview() {
  const { transactions } = useTransactions();

  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const netBalance = totalIncome - totalExpenses;
    const total = totalIncome + totalExpenses;
    const incomePercent = total > 0 ? Math.round((totalIncome / total) * 100) : 0;
    const expensePercent = total > 0 ? Math.round((totalExpenses / total) * 100) : 0;

    const categoryTotals: Record<string, number> = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
      });

    const topCategories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const maxCategoryAmount = topCategories[0]?.[1] ?? 1;

    return { totalIncome, totalExpenses, netBalance, incomePercent, expensePercent, topCategories, maxCategoryAmount };
  }, [transactions]);

  const fmt = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const netBarWidth = stats.totalIncome > 0
    ? Math.min(100, (Math.abs(stats.netBalance) / stats.totalIncome) * 100)
    : 0;

  return (
    <div className="bg-[#1f2937] rounded-lg m-5 lg:m-10 p-6 mb-15">
      <h2 className="text-lg font-bold mb-5">Financial Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#22c55e" className="size-4">
              <path fillRule="evenodd" d="M12 21.75a.75.75 0 0 1-.75-.75V4.81L7.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L12.75 4.81V21a.75.75 0 0 1-.75.75Z" clipRule="evenodd" />
            </svg>
          }
          iconBg="bg-green-950"
          borderColor="border-green-500/20"
          label="Total Income"
          value={fmt(stats.totalIncome)}
          badge={`${stats.incomePercent}% of total`}
          badgeColor="text-green-400"
          barColor="bg-green-500"
          barWidth={stats.incomePercent}
        />

        <StatCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" className="size-4">
              <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
          }
          iconBg="bg-red-950"
          borderColor="border-red-500/20"
          label="Total Expenses"
          value={fmt(stats.totalExpenses)}
          badge={`${stats.expensePercent}% of total`}
          badgeColor="text-red-400"
          barColor="bg-red-500"
          barWidth={stats.expensePercent}
        />

        <StatCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3b82f6" className="size-4">
              <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
              <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
              <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
            </svg>
          }
          iconBg="bg-blue-950"
          borderColor={stats.netBalance >= 0 ? "border-blue-500/20" : "border-red-500/20"}
          label="Net Balance"
          value={fmt(stats.netBalance)}
          badge="Net Balance"
          badgeColor={stats.netBalance >= 0 ? "text-blue-400" : "text-red-400"}
          barColor={stats.netBalance >= 0 ? "bg-blue-500" : "bg-red-500"}
          barWidth={netBarWidth}
        />
      </div>

      <div className="bg-[#111827] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Top Expense Categories</h3>
        {stats.topCategories.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No expense data yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {stats.topCategories.map(([cat, amount]) => (
              <div key={cat} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shrink-0 ${CATEGORY_DOT_COLORS[cat] ?? "bg-gray-400"}`} />
                <span className="text-sm text-gray-400 w-24 capitalize shrink-0">{cat}</span>
                <div className="flex-1 h-2 bg-[#374151] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${CATEGORY_COLORS[cat] ?? "bg-gray-500"}`}
                    style={{ width: `${(amount / stats.maxCategoryAmount) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-300 w-24 text-right shrink-0">
                  {fmt(amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}