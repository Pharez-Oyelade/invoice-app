import { createContext, useContext, useState, useEffect } from "react";
import { invoiceData } from "../assets/invoices.ts";

// invoice interface
interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "draft" | "pending" | "paid";
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: [{ name: string; quantity: number; price: number; total: number }];
  total: number;
}

interface InvoiceContextType {
  invoices: Invoice[];
  theme: string;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  markAsPaid: (id: string) => void;
  deleteInvoice: (id: string) => void;
  toggleTheme: () => void;
}

const InvoiceContext = createContext<InvoiceContextType | null>(null);

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState(invoiceData as Invoice[]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedInvoices = localStorage.getItem("invoices");
    const parsed = storedInvoices ? JSON.parse(storedInvoices) : null;

    if (parsed && parsed.length > 0) {
      setInvoices(parsed);
    } else {
      localStorage.setItem("invoices", JSON.stringify(invoiceData));
    }

    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  // persist on chanfe
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const addInvoice = (invoice: Invoice) =>
    setInvoices((prev) => [...prev, invoice]);

  const updateInvoice = (invoice: Invoice) =>
    setInvoices((prev) => prev.map((i) => (i.id === invoice.id ? invoice : i)));

  const markAsPaid = (id: string) =>
    setInvoices((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "paid" } : i)),
    );

  const deleteInvoice = (id: string) =>
    setInvoices((prev) => prev.filter((i) => i.id !== id));

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        theme,
        addInvoice,
        updateInvoice,
        markAsPaid,
        deleteInvoice,
        toggleTheme,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const context = useContext(InvoiceContext);

  if (!context)
    throw new Error("useInvoices must be used inside InvoiceProvider");

  return context;
}
