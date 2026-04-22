import { useState } from "react";
import Button from "../components/ui/Button";
import { useInvoices } from "../context/InvoiceContext";
import InvoiceCard from "../components/invoice/InvoiceCard";
import { useNavigate } from "react-router-dom";
import InvoiceForm from "../components/invoice/InvoiceForm";
import Filter from "../components/ui/Filter";

const InvoiceListPage = () => {
  const { invoices } = useInvoices();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [selectedFilters, setSelectedFilters] = useState<
  //   ("draft" | "pending" | "paid")[]
  // >([]);
  const [selectedFilters, setSelectedFilters] = useState("");

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const toggleFilter = (status: "draft" | "pending" | "paid") => {
    // setSelectedFilters((prev) =>
    //   prev.includes(status)
    //     ? prev.filter((s) => s !== status)
    //     : [...prev, status],
    // );
    if (selectedFilters === status) {
      setSelectedFilters("");
    } else {
      setSelectedFilters(status);
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(
      invoice.status as "draft" | "pending" | "paid",
    );
  });

  return (
    <main className="bg-[var(--bg-primary)] w-full relative min-h-screen pt-8">
      <div className="mt-[24px] w-[90%] lg:w-[75%] mx-auto md:px-10">
        <header className="flex justify-between items-center w-full">
          <div className="space-y-3 flex items-start gap-0 flex-col w-full">
            <h1 className="text-3xl font-bold leading-[100%] tracking-[-1.13px]">
              Invoices
            </h1>
            <p className="text-[var(--text-secondary)] text-[13px] text-left w-full flex items-center gap-1">
              <span className="hidden md:block">There are</span>
              {invoices.length} <span className="hidden md:block">total</span>{" "}
              invoices
            </p>
          </div>

          <div className="flex gap-5 items-center w-full justify-end">
            <Filter
              onClick={toggleDropdown}
              isDropdownOpen={isDropdownOpen}
              selectedFilters={selectedFilters}
              toggleFilter={toggleFilter}
            />
            <Button
              variant="primary"
              text="New"
              fullText="Invoice"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </header>

        <section className="w-full mt-12 space-y-4">
          {invoices.length === 0 ||
            (filteredInvoices.length === 0 && (
              <div className="flex flex-col justify-center items-center w-full m-auto">
                <div className="w-50 overflow-hidden">
                  <img
                    src="undraw_newsletter-subscriber_plsr.svg"
                    alt=""
                    className="w-full object-cover"
                  />
                </div>

                <div className="mt-20 space-y-3 text-center">
                  <h3 className="font-bold text-[24px]">
                    There is nothing here
                  </h3>
                  <p className="w-[193px] text-xs text-[var(--text-secondary)] m-auto">
                    Create an invoice by clicking the New Invoice button and get
                    started
                  </p>
                </div>
              </div>
            ))}
          {filteredInvoices.map((invoice) => (
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
        <InvoiceForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </main>
  );
};

export default InvoiceListPage;
