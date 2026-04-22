import { useState } from "react";
import Button from "../components/ui/Button";
import { useInvoices } from "../context/InvoiceContext";
import InvoiceCard from "../components/invoice/InvoiceCard";
import { useNavigate } from "react-router-dom";
import InvoiceForm from "../components/invoice/InvoiceForm";
import { ChevronDown, ChevronUp } from "lucide-react";

const InvoiceListPage = () => {
  const { invoices } = useInvoices();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const toggleFilter = (status: string) => {
    if (filter === status) {
      setFilter("all");
    } else {
      setFilter(status);
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === "all") return true;
    return invoice.status === filter;
  });
  // const [editingInvoice, setEditingInvoice] = useState(null);

  // const OpenCreate = () => {setEditingInvoice(null); setIsOpen(true)}

  // return if no invoices

  return (
    <main className="bg-(--bg-primary) w-full relative min-h-screen pt-8">
      <div className="mt-[24px] w-[90%] lg:w-[75%] mx-auto md:px-10">
        <header className="flex justify-between items-center w-full">
          <div className="space-y-3 flex items-start gap-0 flex-col w-full">
            <h1 className="text-3xl font-bold leading-[100%] tracking-[-1.13px]">
              Invoices
            </h1>
            <p className="text-(--text-secondary) text-[13px] text-left w-full flex items-center gap-1">
              <span className="hidden md:block">There are</span>
              {invoices.length} <span className="hidden md:block">total</span>{" "}
              invoices
            </p>
          </div>

          <div className="flex gap-5 items-center w-full justify-end">
            <div className="relative cursor-pointer">
              <div
                onClick={toggleDropdown}
                className="flex items-center group gap-1 font-bold"
              >
                Filter <span className="hidden md:block">by status</span>
                {isDropdownOpen ? (
                  <ChevronUp
                    size={18}
                    className="group-hover:text-(--text-form)"
                  />
                ) : (
                  <ChevronDown
                    size={18}
                    className="group-hover:text-(--text-form)"
                  />
                )}
              </div>
              {isDropdownOpen && (
                <div className="absolute top-full -right-5 flex flex-col gap-3 w-[192px] bg-(--bg-card) shadow-lg rounded-[8px] p-5 mt-5">
                  <div className="w-full flex gap-5 items-center">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="w-[16px] h-[16px] bg-(--button-secondary)"
                      checked={filter === "draft"}
                      onChange={() => toggleFilter("draft")}
                    />
                    <label htmlFor="">Draft</label>
                  </div>

                  <div className="w-full flex gap-5 items-center">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="w-[16px] h-[16px] bg-(--button-secondary)"
                      checked={filter === "pending"}
                      onChange={() => toggleFilter("pending")}
                    />
                    <label htmlFor="">Pending</label>
                  </div>

                  <div className="w-full flex gap-5 items-center">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="w-[16px] h-[16px] bg-(--button-secondary)"
                      checked={filter === "paid"}
                      onChange={() => toggleFilter("paid")}
                    />
                    <label htmlFor="">Paid</label>
                  </div>
                </div>
              )}
            </div>
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
                  <p className="w-[193px] text-xs text-(--text-secondary) m-auto">
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
