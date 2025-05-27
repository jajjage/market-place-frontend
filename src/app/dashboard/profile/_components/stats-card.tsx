interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

export const StatsCard = ({ title, value, icon, color }: StatsCardProps) => {
  return (
    <div className="diagonal-lines-subtle rounded-xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.98)] p-6">
      <div className="flex items-center space-x-4">
        <div className={`rounded-full p-3 ${color}`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};
