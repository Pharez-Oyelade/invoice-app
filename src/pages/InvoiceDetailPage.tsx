import { useParams, useNavigate } from "react-router-dom";
import { useInvoices } from "../context/InvoiceContext";
import { ChevronLeft } from "lucide-react";
import Button from "../components/ui/Button";

const InvoiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { invoices } = useInvoices();
  const invoice = invoices.find((i) => i.id === id);
  return (
    <main className="bg-(--bg-primary) w-full flex flex-col justify-center items-center relative min-h-screen">
      <div className="mt-[70px] w-[75%] m-auto">
        {/* back */}

        <div className="text-left">
          <button
            onClick={() => navigate(-1)}
            className="text-[15px] font-bold flex gap-2 items-center cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Go back
          </button>
        </div>

        {/* status and actions */}
        <div className="flex justify-between items-center w-full bg-(--bg-card) rounded-[8px] h-[88px] my-10 px-10 shadow-card">
          <div className="flex items-center gap-5">
            <span>Status</span>
            <div
              className={`px-[8px] py-[4px] w-[104px] h-[40px] text-center text-[15px] font-bold flex justify-center items-center gap-2 capitalize ${
                invoice?.status === "paid"
                  ? "bg-[#33d6a0]/[5.71%] text-[#33D69F]"
                  : invoice?.status === "pending"
                    ? "bg-[#FF8F00]/[5.71%] text-[#FF8F00]"
                    : "bg-[#373B53]/[5.71%] text-[#373B53]"
              }`}
            >
              <div
                className={`h-2 w-2 ${invoice?.status === "paid" ? "bg-green-500" : invoice?.status === "pending" ? "bg-yellow-500" : "bg-[#373B53]"} rounded-full inline-block mr-2`}
              />
              {invoice?.status}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button variant="edit" text="Edit" />
            <Button variant="delete" text="Delete" />
            <Button variant="secondary" text="Mark as Paid" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default InvoiceDetailPage;
