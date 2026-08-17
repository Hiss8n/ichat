import { Loader } from "lucide-react";

const Spinner = ({  className = '' }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-6 ${className} `}
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 flex items-center justify-center rounded-full border-4 border-slate-200 border-t-blue-500" />
      <Loader  className=" w-3 h-3 animate-spin " size={24}/>
     
    </div>
  );
};

export default Spinner;
