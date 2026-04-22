import { ChevronRight } from "lucide-react";

interface InvoiceCardProps {
  id: string;
  date: string;
  name: string;
  status: string;
  total: number;
  onClick: () => void;
}

const InvoiceCard = ({
  id,
  date,
  name,
  status,
  total,
  onClick,
}: InvoiceCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between bg-(--bg-card) border border-transparent hover:border-(--bg-accent) transition-colors duration-300 px-[32px] items-center w-full h-[72px] rounded-[8px] mt-5 shadow-card cursor-pointer
"
    >
      <div className="flex gap-10 items-center">
        <h3 className="font-bold text-[15px] ">
          <span className="text-[#ccc]">#</span> {id}
        </h3>
        <p className="text-[13px] text-[#858BB2]">Due {date}</p>
        <p className="text-[13px] text-[#858BB2]">{name}</p>
      </div>

      <div className="flex gap-10 items-center">
        <h3 className="font-bold text-[15px]">${total.toFixed(2)}</h3>
        <div
          className={`px-[8px] py-[4px] w-[104px] h-[40px] text-center text-[15px] font-bold flex justify-center items-center gap-2 capitalize ${
            status === "paid"
              ? "bg-[#33d6a0]/[5.71%] text-[#33D69F]"
              : status === "pending"
                ? "bg-[#FF8F00]/[5.71%] text-[#FF8F00]"
                : "bg-[#373B53]/[5.71%] text-[#373B53]"
          }`}
        >
          <div
            className={`h-2 w-2 ${status === "paid" ? "bg-green-500" : status === "pending" ? "bg-yellow-500" : "bg-[#373B53]"} rounded-full inline-block mr-2`}
          />
          {status}
        </div>
        <div>
          <ChevronRight className="w-4 h-4 text-(--bg-accent)" />
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
