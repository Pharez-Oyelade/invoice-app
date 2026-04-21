import Button from "../components/ui/Button";
import { useInvoices } from "../context/InvoiceContext";
import InvoiceCard from "../components/invoice/InvoiceCard";
import { useNavigate } from "react-router-dom";

const InvoiceListPage = () => {
  const { invoices } = useInvoices();
  const navigate = useNavigate();

  return (
    <main className="bg-(--bg-primary) flex flex-col justify-center items-center mt-[77px] w-full">
      <header className="flex justify-between items-center w-full">
        <div className="space-y-3 flex items-start gap-0 flex-col">
          <h1 className="leading-[100%] tracking-[-1.13px] ">Invoices</h1>
          <p className="text-(--text-secondary)">
            There are {invoices.length} total invoices
          </p>
        </div>

        <div className="flex gap-5 items-center">
          <div>Filter by status</div>
          <Button variant="primary" text="New Invoice" />
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
    </main>
  );
};

export default InvoiceListPage;
