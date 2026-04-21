import { useState } from "react";
import Button from "../components/ui/Button";
import { useInvoices } from "../context/InvoiceContext";
import InvoiceCard from "../components/invoice/InvoiceCard";
import { useNavigate } from "react-router-dom";
import InvoiceForm from "../components/invoice/InvoiceForm";

const InvoiceListPage = () => {
  const { invoices } = useInvoices();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  // const [editingInvoice, setEditingInvoice] = useState(null);

  // const OpenCreate = () => {setEditingInvoice(null); setIsOpen(true)}

  return (
    <main className="bg-(--bg-primary) w-full flex flex-col justify-center items-center relative min-h-screen">
      <div className=" mt-[77px] w-[75%] m-auto">
        <header className="flex justify-between items-center w-full">
          <div className="space-y-3 flex items-start gap-0 flex-col">
            <h1 className="leading-[100%] tracking-[-1.13px] ">Invoices</h1>
            <p className="text-(--text-secondary)">
              There are {invoices.length} total invoices
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <div>Filter by status</div>
            <Button
              variant="primary"
              text="New Invoice"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </header>

        <section className="w-full mt-[48px]">
          {invoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              id={invoice.id}
              date={invoice.paymentDue}
              name={invoice.clientName}
              total={invoice.total}
              status={invoice.status}
              onClick={() => navigate(`/invoice/${invoice.id}`)}
            />
          ))}
        </section>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-0 h-full w-full z-50 backdrop-blur-sm">
          {/* <div className="bg-(--bg-drawer) h-full w-[40%] rounded-tr-[20px] rounded-br-[20px] pt-[59px] text-left px-[48px]">
            <h2 className="font-bold text-[12px]">New Invoice</h2>
          </div> */}

          <InvoiceForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </main>
  );
};

export default InvoiceListPage;
