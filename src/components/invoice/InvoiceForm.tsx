import { useEffect } from "react";
import { useInvoices } from "../../context/InvoiceContext";
import { validateInvoice, validateDraft } from "../../utils/validators";
import { useInvoiceForm } from "../../hooks/useInvoiceForm";
import { generateId, addDays } from "../../utils/helpers";
import AddressFields from "./AddressFields";
import InvoiceItems from "./InvoiceItems";
import Button from "../ui/Button";

interface InvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceToEdit?: any;
}

export default function InvoiceForm({
  isOpen,
  onClose,
  invoiceToEdit,
}: InvoiceFormProps) {
  const { addInvoice, updateInvoice } = useInvoices();
  const isEditing = !!invoiceToEdit;

  const {
    form,
    errors,
    setErrors,
    setField,
    setAddressField,
    addItem,
    updateItem,
    removeItem,
    reset,
    load,
    grandTotal,
  } = useInvoiceForm();

  useEffect(() => {
    if (isEditing && invoiceToEdit) {
      load(invoiceToEdit);
    }
  }, [invoiceToEdit]);

  // prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleDiscard = () => {
    reset();
    onClose();
  };

  const handleSaveDraft = () => {
    const draftErrors = validateDraft(form);
    if (Object.keys(draftErrors).length > 0) {
      setErrors(draftErrors);
      return;
    }

    const invoice = buildInvoice("draft");
    if (isEditing) {
      updateInvoice({ ...invoiceToEdit, ...invoice, status: "draft" });
    } else {
      addInvoice(invoice);
    }
    reset();
    onClose();
  };

  const handleSaveAndSend = () => {
    const validationErrors = validateInvoice(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const invoice = buildInvoice("pending");
    if (isEditing) {
      updateInvoice({ ...invoiceToEdit, ...invoice });
    } else {
      addInvoice(invoice);
    }
    reset();
    onClose();
  };

  const buildInvoice = (status: "draft" | "pending" | "paid") => ({
    id: isEditing ? invoiceToEdit.id : generateId(),
    createdAt: form.createdAt,
    paymentDue: addDays(form.createdAt, Number(form.paymentTerms)),
    description: form.description,
    paymentTerms: Number(form.paymentTerms),
    clientName: form.clientName,
    clientEmail: form.clientEmail,
    status,
    senderAddress: { ...form.senderAddress },
    clientAddress: { ...form.clientAddress },
    items: form.items.map(({ id, ...rest }: { id: string; rest: any }) => rest), // strip temp id
    total: grandTotal,
  });

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={handleDiscard}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 h-screen w-[719px] bg-(--bg-drawer) shadow-xl transform transition-transform duration-300 text-left ease-in-out z-50 flex flex-col rounded-tr-[20px] rounded-br-[20px] no-scrollbar ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label={isEditing ? "Edit Invoice" : "New Invoice"}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-12 pt-16 pb-8 text-left">
            <h2 className="font-bold">
              {isEditing ? (
                <>
                  Edit{" "}
                  <span className="text-purple-600">#{invoiceToEdit?.id}</span>
                </>
              ) : (
                "New Invoice"
              )}
            </h2>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-12 py-8 space-y-8">
            {/* ── Bill From ── */}
            <div>
              <h3 className="text-sm font-bold text-purple-600 mb-6">
                Bill From
              </h3>
              <AddressFields
                addressKey="senderAddress"
                address={form.senderAddress}
                errors={errors}
                onChange={setAddressField}
              />
            </div>

            {/* ── Bill To ── */}
            <div>
              <h3 className="text-sm font-bold text-purple-600 mb-6">
                Bill To
              </h3>

              <div className="space-y-6">
                {/* Client Name */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="clientName"
                      className="text-sm font-semibold text-(--text-form)"
                    >
                      Client's Name
                    </label>
                    {errors.clientName && (
                      <span className="text-xs text-red-500">
                        {errors.clientName}
                      </span>
                    )}
                  </div>
                  <input
                    id="clientName"
                    type="text"
                    value={form.clientName}
                    onChange={(e) => setField("clientName", e.target.value)}
                    className={`w-full px-4 py-3 rounded bg-(--bg-input) border border-(--border-input) text-(--text-primary) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.clientName ? "border-red-500" : ""
                    }`}
                  />
                </div>

                {/* Client Email */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="clientEmail"
                      className="text-sm font-semibold text-(--text-form)"
                    >
                      Client's Email
                    </label>
                    {errors.clientEmail && (
                      <span className="text-xs text-red-500">
                        {errors.clientEmail}
                      </span>
                    )}
                  </div>
                  <input
                    id="clientEmail"
                    type="email"
                    placeholder="e.g. email@example.com"
                    value={form.clientEmail}
                    onChange={(e) => setField("clientEmail", e.target.value)}
                    className={`w-full px-4 py-3 rounded bg-(--bg-input) border border-(--border-input) text-(--text-primary) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.clientEmail ? "border-red-500" : ""
                    }`}
                  />
                </div>
              </div>

              <div className="mt-6">
                <AddressFields
                  addressKey="clientAddress"
                  address={form.clientAddress}
                  errors={errors}
                  onChange={setAddressField}
                />
              </div>
            </div>

            {/* ── Invoice Meta ── */}
            <div>
              <div className="grid grid-cols-2 gap-6">
                {/* Invoice Date */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="createdAt"
                      className="text-sm font-semibold text-(--text-form)"
                    >
                      Invoice Date
                    </label>
                    {errors.createdAt && (
                      <span className="text-xs text-red-500">
                        {errors.createdAt}
                      </span>
                    )}
                  </div>
                  <input
                    id="createdAt"
                    type="date"
                    value={form.createdAt}
                    onChange={(e) => setField("createdAt", e.target.value)}
                    disabled={isEditing}
                    className={`w-full px-4 py-3 rounded bg-(--bg-input) border border-(--border-input) text-(--text-primary) focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.createdAt ? "border-red-500" : ""
                    }`}
                  />
                </div>

                {/* Payment Terms */}
                <div>
                  <label
                    htmlFor="paymentTerms"
                    className="text-sm font-semibold text-(--text-form) mb-2 block"
                  >
                    Payment Terms
                  </label>
                  <select
                    id="paymentTerms"
                    value={form.paymentTerms}
                    onChange={(e) => setField("paymentTerms", e.target.value)}
                    className="w-full px-4 py-3 rounded bg-(--bg-input) border border-(--border-input) text-(--text-primary) focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={1}>Net 1 Day</option>
                    <option value={7}>Net 7 Days</option>
                    <option value={14}>Net 14 Days</option>
                    <option value={30}>Net 30 Days</option>
                  </select>
                </div>
              </div>

              {/* Project Description */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-semibold text-(--text-form)"
                  >
                    Project Description
                  </label>
                  {errors.description && (
                    <span className="text-xs text-red-500">
                      {errors.description}
                    </span>
                  )}
                </div>
                <input
                  id="description"
                  type="text"
                  placeholder="e.g. Graphic Design Service"
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  className={`w-full px-4 py-3 rounded bg-(--bg-input) border border-(--border-input) text-(--text-primary) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>

            {/* ── Item List ── */}
            <InvoiceItems
              items={form.items}
              errors={errors}
              onAdd={addItem}
              onUpdate={updateItem}
              onRemove={removeItem}
            />
          </div>

          {/* ── Action Bar ── */}
          <div className="px-12 py-6 flex justify-between items-center gap-4">
            <Button variant="edit" onClick={handleDiscard} text="Discard" />

            <div className="flex gap-3">
              {!isEditing && (
                <Button
                  variant="draft"
                  onClick={handleSaveDraft}
                  text="Save as Draft"
                />
              )}
              <Button
                variant="secondary"
                onClick={handleSaveAndSend}
                text={isEditing ? "Save Changes" : "Save & Send"}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
