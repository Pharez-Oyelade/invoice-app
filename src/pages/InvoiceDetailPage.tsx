import { useParams, useNavigate } from "react-router-dom";
import { useInvoices } from "../context/InvoiceContext";
import { ChevronLeft } from "lucide-react";
import Button from "../components/ui/Button";
import { formatCurrency } from "../utils/helpers";

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

        {/* Detail Card */}
        <div className="bg-(--bg-card) shadow-card rounded-[8px] p-10">
          {/* header */}
          <div className="flex justify-between w-full">
            <div className="space-y-3 text-left">
              <h3 className="font-extrabold text-[15px]">
                <span className="text-[#ccc]">#</span>
                {invoice?.id}
              </h3>
              <p className="text-[13px] text-(--text-form)">
                {invoice?.description}
              </p>
            </div>

            <p className="text-[13px] text-(--text-form) text-right">
              {invoice?.senderAddress.street} <br />
              {invoice?.senderAddress.city} <br />
              {invoice?.senderAddress.postCode} <br />
              {invoice?.senderAddress.country}
            </p>
          </div>

          {/* details */}
          <div className="grid grid-cols-4 gap-10 text-left my-6">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                <span className="text-[13px] text-(--text-form)">
                  Invoice Date
                </span>
                <h3>{invoice?.createdAt}</h3>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-[13px] text-(--text-form)">
                  Payment Due
                </span>
                <h3>{invoice?.paymentDue}</h3>
              </div>
            </div>

            <div>
              <div className="flex flex-col gap-4">
                <span className="text-[13px] text-(--text-form)">Bill To</span>
                <div>
                  <h3>{invoice?.clientName}</h3>
                  <p className="text-[13px] text-(--text-form)">
                    {invoice?.clientAddress.street}
                  </p>
                  <p className="text-[13px] text-(--text-form)">
                    {invoice?.clientAddress.city}
                  </p>
                  <p className="text-[13px] text-(--text-form)">
                    {invoice?.clientAddress.postCode}
                  </p>
                  <p className="text-[13px] text-(--text-form)">
                    {invoice?.clientAddress.country}
                  </p>
                </div>
              </div>
            </div>

            {/* client mail */}
            <div className="col-span-2">
              <div className="flex flex-col gap-4">
                <span className="text-[13px] text-(--text-form)">Sent To</span>
                <h3>{invoice?.clientEmail}</h3>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-(--button-secondary) grid grid-cols-8 p-10 rounded-tl-[8px] rounded-tr-[8px] mt-10">
            <div className="flex flex-col gap-5 col-span-3 text-left">
              <span className="text-[13px] text-(--text-form)">Item Name</span>
              {invoice?.items.map((item: any, index: number) => (
                <h3 key={index} className="font-bold text-[15px]">
                  {item.name}
                </h3>
              ))}
            </div>

            <div className="flex flex-col gap-5 text-right">
              <span className="text-[13px] text-(--text-form)">Qty</span>
              {invoice?.items.map((item: any, index: number) => (
                <span
                  key={index}
                  className="font-bold text-[15px] text-(--text-form)"
                >
                  {item.quantity}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-5 col-span-2 text-right">
              <span className="text-[13px] text-(--text-form)">Price</span>
              {invoice?.items.map((item: any, index: number) => (
                <span
                  key={index}
                  className="font-bold text-[15px] text-(--text-form)"
                >
                  {formatCurrency(item.price)}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-5 col-span-2 text-right">
              <span className="text-[13px] text-(--text-form)">Total</span>
              {invoice?.items.map((item: any, index: number) => (
                <h3 key={index} className="font-bold text-[15px]">
                  {formatCurrency(item.price * item.quantity)}
                </h3>
              ))}
            </div>
          </div>

          <div className="bg-(--bg-footer) h-[80px] rounded-br-[8px] rounded-bl-[8px] flex justify-between items-center px-10">
            <span className="text-white">Amount Due</span>
            <span className="text-white font-bold text-2xl">
              {formatCurrency(invoice?.total || 0)}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InvoiceDetailPage;
