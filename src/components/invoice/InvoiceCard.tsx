interface InvoiceCardProps {
  id: string;
  date: string;
  name: string;
  status: string;
  total: number;
}

const InvoiceCard = ({ id, date, name, status, total }: InvoiceCardProps) => {
  return (
    <div className="flex justify-between bg-white px-[32px] items-center w-full h-[72px] rounded-[8px] mt-[264px]">
      <div>
        <h2 className="font-bold text-[15px] ">
          <span className="text-[#ccc]">#</span> {id}
        </h2>
        <p className="text-[13px] text-[#858BB2]">Due {date}</p>
        <p className="text-[13px] text-[#858BB2]">{name}</p>
      </div>

      <div>
        <div className="font-bold text-[15px]">${total.toFixed(2)}</div>
        <div
          className={`px-[8px] py-[4px] rounded-full text-[12px] font-bold ${
            status === "Paid"
              ? "bg-green-100 text-green-500"
              : status === "Pending"
                ? "bg-yellow-100 text-yellow-500"
                : "bg-red-100 text-red-500"
          }`}
        >
          <div
            className={`h-4 w-4 ${status === "Paid" ? "bg-green-500" : status === "Pending" ? "bg-yellow-500" : "bg-red-500"} rounded-full inline-block mr-2`}
          />
          {status}
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
