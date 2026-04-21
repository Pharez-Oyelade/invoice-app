import Button from "../components/ui/Button";
import { useInvoices } from "../context/InvoiceContext";

const InvoiceListPage = () => {
  const { invoices } = useInvoices();
  return (
    <main className="bg-(--bg-primary) flex justify-center items-center mt-[77px] w-full">
      <header className="flex justify-between items-center w-full">
        <div className="leading-tight space-y-[1px] flex items-start gap-0 flex-col">
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
    </main>
  );
};

export default InvoiceListPage;
