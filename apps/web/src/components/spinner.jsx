const Spinner = ({ label = 'Loading...', className = '' }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-6 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500" />
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  );
};

export default Spinner;
