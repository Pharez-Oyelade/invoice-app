import { formatCurrency } from "../../utils/helpers";
import { Trash2 } from "lucide-react";
import Button from "../ui/Button";

interface InvoiceItemsProps {
  items: [];
  errors: Record<string, string>;
  onAdd: () => void;
  onUpdate: (index: number, field: string, value: string | number) => void;
  onRemove: (index: number) => void;
}

export default function InvoiceItems({
  items,
  errors,
  onAdd,
  onUpdate,
  onRemove,
}: InvoiceItemsProps) {
  // calculate total for each item whenever quantity or price changes
  // const [totals, setTotals] = useState();
  // useEffect(() => {
  //   items.forEach((item: any, index: number) => {
  //     const total = parseFloat((item.quantity * item.price).toFixed(2));

  //     setTotals(total);
  //   });
  // }, [items]);

  return (
    <div className="space-y-6">
      <h3 className="text-base font-bold text-(--text-form)">Item List</h3>

      {items.length > 0 && (
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2">
          <span className="col-span-5 text-xs font-semibold text-(--text-form)">
            Item Name
          </span>
          <span className="col-span-2 text-xs font-semibold text-(--text-form)">
            Qty.
          </span>
          <span className="col-span-2 text-xs font-semibold text-(--text-form)">
            Price
          </span>
          <span className="col-span-2 text-xs font-semibold text-(--text-form)">
            Total
          </span>
          <span className="col-span-1"></span>
        </div>
      )}

      <div className="space-y-4">
        {items.map((item: any, index: number) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-end">
            {/* Name */}
            <div className="col-span-5">
              <input
                type="text"
                placeholder="Item name"
                value={item.name}
                onChange={(e) => onUpdate(index, "name", e.target.value)}
                className={`w-full px-4 py-3 rounded bg-(--bg-input) border border-(--border-input) text-(--text-primary) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${
                  errors[`item_${index}_name`] ? "border-red-500" : ""
                }`}
                aria-label="Item name"
              />
              {errors[`item_${index}_name`] && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors[`item_${index}_name`]}
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="col-span-2">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  onUpdate(
                    index,
                    "quantity",
                    Math.max(1, parseInt(e.target.value) || 1),
                  )
                }
                className={`w-full px-4 py-3 rounded bg-(--bg-input) border border-(--border-input) text-(--text-primary) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${
                  errors[`item_${index}_qty`] ? "border-red-500" : ""
                }`}
                aria-label="Quantity"
              />
            </div>

            {/* Price */}
            <div className="col-span-2">
              <input
                type="number"
                min="0"
                step="0.01"
                value={item.price}
                // onChange={(e) =>
                //   onUpdate(index, "price", parseFloat(e.target.value) || 0)
                // }
                onChange={(e) => {
                  const val = e.target.valueAsNumber;
                  if (!isNaN(val) && val >= 0) onUpdate(index, "price", val);
                }}
                className={`w-full px-4 py-3 rounded bg-(--bg-input) border border-(--border-input) text-(--text-primary) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${
                  errors[`item_${index}_price`] ? "border-red-500" : ""
                }`}
                aria-label="Price"
              />
            </div>

            {/* Total (read-only) */}
            <div className="col-span-2 text-right">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatCurrency(item.total)}
              </span>
            </div>

            {/* Delete */}
            <button
              type="button"
              className="col-span-1 text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => onRemove(index)}
              aria-label={`Remove ${item.name || `item ${index + 1}`}`}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {errors.items && <p className="text-sm text-red-500">{errors.items}</p>}

      <Button onClick={onAdd} variant="form" text="+ Add New Item" />
    </div>
  );
}
