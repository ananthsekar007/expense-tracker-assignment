interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col w-full gap-1">
      <p className="text-sm font-semibold text-gray-400">{label}</p>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}