import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInvoices } from "../context/InvoiceContext";
import { ChevronLeft } from "lucide-react";
import Button from "../components/ui/Button";
import { formatCurrency } from "../utils/helpers";
import InvoiceForm from "../components/invoice/InvoiceForm";

const InvoiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { invoices, markAsPaid, deleteInvoice } = useInvoices();
  const invoice = invoices.find((i) => i.id === id);

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const openEdit = (invoice: any) => {
    setEditingInvoice(invoice);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (invoice?.id) {
      deleteInvoice(id);
    }
    setIsDeleteOpen(false);
    navigate(-1);
  };

  return (
    <main className="bg-(--bg-primary) w-full flex flex-col justify-center items-center relative min-h-screen">
      <div className="mt-[24px] lg:mt-[50px] w-[90%] lg:w-[75%] mb-[70px] m-auto">
        {/* back */}

        <div className="text-left">
          <button
            onClick={() => navigate(-1)}
            className="text-[15px] font-bold flex gap-2 items-center cursor-pointer hover:text-(--text-form) transition-colors duration-300"
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
              className={`px-[8px] py-[4px] w-[104px] h-[40px] text-center text-[15px] font-bold md:flex justify-center items-center gap-2 capitalize hidden ${
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

          <div
            className={`px-[8px] py-[4px] w-[104px] h-[40px] text-center text-[15px] font-bold flex justify-center items-center gap-2 capitalize md:hidden ${
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

          {/* Action Buttons */}
          <div className="md:flex gap-4 hidden">
            <Button
              variant="edit"
              text="Edit"
              onClick={openEdit.bind(null, invoice)}
            />
            <Button
              variant="delete"
              text="Delete"
              onClick={() => setIsDeleteOpen(true)}
            />
            <Button
              variant="secondary"
              text="Mark as Paid"
              onClick={() => invoice?.id && markAsPaid(invoice.id)}
              disabled={invoice?.status === "paid"}
            />
          </div>
        </div>

        {/* Detail Card */}
        <div className="bg-(--bg-card) shadow-card rounded-[8px] p-10">
          {/* header */}
          <div className="flex flex-col md:flex-row gap-10 justify-between w-full">
            <div className="md:space-y-3 text-left">
              <h3 className="font-extrabold text-[15px]">
                <span className="text-[#ccc]">#</span>
                {invoice?.id}
              </h3>
              <p className="text-[13px] text-(--text-form)">
                {invoice?.description}
              </p>
            </div>

            <p className="text-[13px] text-(--text-form) text-left md:text-right">
              {invoice?.senderAddress.street} <br />
              {invoice?.senderAddress.city} <br />
              {invoice?.senderAddress.postCode} <br />
              {invoice?.senderAddress.country}
            </p>
          </div>

          {/* details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-left my-6">
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

          {/* Items
          <div className="bg-(--button-secondary) grid grid-cols-8 p-10 rounded-tl-[8px] rounded-tr-[8px] mt-10">
            <div className="flex flex-col gap-5 col-span-3 text-left">
              <span className="text-[13px] text-(--text-form) hidden md:block">
                Item Name
              </span>
              {invoice?.items.map((item: any, index: number) => (
                <div key={index}>
                  <h3 className="font-bold text-[15px]">{item.name}</h3>
                  <span
                    key={index}
                    className="font-bold text-[15px] text-(--text-form) md:hidden"
                  >
                    {item.quantity} x {formatCurrency(item.price)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5 text-right">
              <span className="text-[13px] text-(--text-form) hidden md:block">
                Qty
              </span>
              {invoice?.items.map((item: any, index: number) => (
                <span
                  key={index}
                  className="font-bold text-[15px] text-(--text-form) hidden md:block"
                >
                  {item.quantity}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-5 col-span-2 text-right">
              <span className="text-[13px] text-(--text-form) hidden md:block">
                Price
              </span>
              {invoice?.items.map((item: any, index: number) => (
                <span
                  key={index}
                  className="font-bold text-[15px] text-(--text-form) hidden md:block"
                >
                  {formatCurrency(item.price)}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-5 col-span-2 text-right">
              <span className="text-[13px] text-(--text-form) hidden md:block">
                Total
              </span>
              {invoice?.items.map((item: any, index: number) => (
                <h3 key={index} className="font-bold text-[15px]">
                  {formatCurrency(item.price * item.quantity)}
                </h3>
              ))}
            </div>
          </div> */}

          {/* Items */}
          <div className="bg-(--button-secondary) p-10 rounded-tl-[8px] rounded-tr-[8px] mt-10">
            <div className="hidden md:grid grid-cols-8 mb-5">
              <span className="col-span-3 text-[13px] text-(--text-form) text-left">
                Item Name
              </span>
              <span className="col-span-1 text-[13px] text-(--text-form) text-right">
                Qty
              </span>
              <span className="col-span-2 text-[13px] text-(--text-form) text-right">
                Price
              </span>
              <span className="col-span-2 text-[13px] text-(--text-form) text-right">
                Total
              </span>
            </div>

            {invoice?.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-start md:grid md:grid-cols-8 mb-5 last:mb-0"
              >
                {/* Name + qty×price subtitle */}
                <div className="md:col-span-3 text-left">
                  <h3 className="font-bold text-[15px] text-left">
                    {item.name}
                  </h3>
                  <span className="font-bold text-[15px] text-(--bg-accent) md:hidden text-left">
                    {item.quantity} x {formatCurrency(item.price)}
                  </span>
                </div>

                {/* Qty desktop only */}
                <span className="hidden md:block md:col-span-1 font-bold text-[15px] text-(--text-form) text-right">
                  {item.quantity}
                </span>

                {/* Unit price desktop only */}
                <span className="hidden md:block md:col-span-2 font-bold text-[15px] text-(--text-form) text-right">
                  {formatCurrency(item.price)}
                </span>

                <h3 className="font-bold text-[15px] md:col-span-2 text-right">
                  {formatCurrency(item.price * item.quantity)}
                </h3>
              </div>
            ))}
          </div>

          <div className="bg-(--bg-footer) h-[80px] rounded-br-[8px] rounded-bl-[8px] flex justify-between items-center px-10">
            <span className="text-white">Amount Due</span>
            <span className="text-white font-bold text-2xl">
              {formatCurrency(invoice?.total || 0)}
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-0 h-full w-full z-50 backdrop-blur-sm">
          <InvoiceForm
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            invoiceToEdit={editingInvoice}
          />
        </div>
      )}

      {isDeleteOpen && (
        <div className="absolute left-0 top-0 h-full w-full z-50 bg-black/10 backdrop-blur-xs flex justify-center items-center">
          <div className="bg-(--bg-card) p-10 rounded-[8px] shadow-card w-[480px] text-left space-y-5">
            <h2>Confirm Deletion</h2>
            <span>
              Are you sure you want to delete invoice #{invoice?.id}? This
              operation cannot be undone
            </span>

            <div className="flex justify-end gap-5 items-center mt-10">
              <Button
                variant="edit"
                text="cancel"
                onClick={() => setIsDeleteOpen(false)}
              />
              <Button
                variant="delete"
                text="Delete"
                onClick={() => invoice?.id && handleDelete(invoice.id)}
              />
            </div>
          </div>
        </div>
      )}
      <div className="md:hidden flex gap-4 items-center fixed bottom-0 left-0 w-full bg-(--bg-card) p-5 shadow-card justify-center">
        <Button
          variant="edit"
          text="Edit"
          onClick={openEdit.bind(null, invoice)}
        />
        <Button
          variant="delete"
          text="Delete"
          onClick={() => setIsDeleteOpen(true)}
        />
        <Button
          variant="secondary"
          text="Mark as Paid"
          onClick={() => invoice?.id && markAsPaid(invoice.id)}
          disabled={invoice?.status === "paid"}
        />
      </div>
    </main>
  );
};

export default InvoiceDetailPage;
