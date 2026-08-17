import { Loader } from "lucide-react";

const Spinner = ({  className = '' }) => {
  return (
    <div
      className="flex  items-center justify-center  py-6  "
      
    >
    {/*   <div className="h-10 w-10 flex items-center justify-center rounded-full border-4 border-slate-200 border-t-blue-500" /> */}
      <Loader  className=" w-6 h-6 animate-spin " size={36}/>
     
    </div>
  );
};

export default Spinner;
