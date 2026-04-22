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
      className="bg-(--bg-card) border border-transparent hover:border-(--bg-accent) transition-colors duration-300 px-6 py-4 md:px-8 w-full rounded-[8px] shadow-card cursor-pointer
        grid grid-cols-[1fr_auto] grid-rows-2 gap-y-3 items-center
        md:flex md:flex-row md:justify-between md:items-center md:h-[72px] md:gap-0"
    >
      <div className="flex flex-col gap-2 md:flex-row md:gap-10 md:items-center">
        <h3 className="font-bold text-[15px] text-left">
          <span className="text-[#ccc]">#</span>
          {id}
        </h3>

        <p className="text-[13px] text-[#858BB2] hidden md:block">Due {date}</p>
        <p className="text-[13px] text-[#858BB2] hidden md:block">{name}</p>
      </div>

      {/* Top-right (mobile): Name */}
      <p className="text-[13px] text-[#858BB2] text-right md:hidden">{name}</p>

      {/* Bottom-left (mobile): Due date */}
      <div className="flex flex-col gap-2 md:hidden">
        <p className="text-[13px] text-left text-[#858BB2] md:hidden">
          Due {date}
        </p>
        <h3 className="font-bold text-[15px] text-left">${total.toFixed(2)}</h3>
      </div>

      <div className="flex gap-4 items-center justify-end">
        <h3 className="font-bold hidden md:block text-[15px]">
          ${total.toFixed(2)}
        </h3>
        <div
          className={`px-[8px] py-[4px] w-[104px] h-[40px] text-center text-[15px] font-bold flex justify-center items-center gap-2 capitalize rounded-[6px] ${
            status === "paid"
              ? "bg-[#33d6a0]/[5.71%] text-[#33D69F]"
              : status === "pending"
                ? "bg-[#FF8F00]/[5.71%] text-[#FF8F00]"
                : "bg-[#373B53]/[5.71%] text-[#373B53]"
          }`}
        >
          <div
            className={`h-2 w-2 rounded-full inline-block mr-2 flex-shrink-0 ${
              status === "paid"
                ? "bg-green-500"
                : status === "pending"
                  ? "bg-yellow-500"
                  : "bg-[#373B53]"
            }`}
          />
          {status}
        </div>
        <ChevronRight className="w-4 h-4 text-(--bg-accent) hidden md:block" />
      </div>
    </div>
  );
};

export default InvoiceCard;
