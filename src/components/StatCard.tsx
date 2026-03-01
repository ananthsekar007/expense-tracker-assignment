import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  borderColor: string;
  label: string;
  value: string;
  badge: string;
  badgeColor: string;
  barColor: string;
  barWidth: number;
}

const StatCard = ({ icon, iconBg, borderColor, label, value, badge, badgeColor, barColor, barWidth }: StatCardProps) => {
  return (
    <div className={`bg-[#111827] rounded-xl p-4 border ${borderColor}`}>
      <div className="flex justify-between items-start mb-3">
        <div className={`flex items-center justify-center rounded-full p-2 ${iconBg}`}>
          {icon}
        </div>
        <span className={`text-xs font-medium ${badgeColor}`}>{badge}</span>
      </div>
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
      <div className="mt-3 h-1 bg-[#374151] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}

export default StatCard