import { useReducer, useState } from "react";
import { generateId, todayISO } from "../utils/helpers";

const defaultForm = () => ({
  senderAddress: { street: "", city: "", postCode: "", country: "" },
  clientName: "",
  clientEmail: "",
  clientAddress: { street: "", city: "", postCode: "", country: "" },
  createdAt: todayISO(),
  paymentTerms: 30,
  description: "",
  items: [],
});

function formReducer(state: any, action: any) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_ADDRESS_FIELD":
      return {
        ...state,
        [action.addressKey]: {
          ...state[action.addressKey],
          [action.field]: action.value,
        },
      };

    case "ADD_ITEM":
      return {
        ...state,
        items: [
          ...state.items,
          { id: generateId(), name: "", quantity: 1, price: 0, total: 0 },
        ],
      };

    case "UPDATE_ITEM": {
      const updated = state.items.map((item: any, i: number) => {
        if (i !== action.index) return item;
        const next = { ...item, [action.field]: action.value };
        const qty = Number(next.quantity) || 1;
        const price = isNaN(Number(next.price)) ? 0 : Number(next.price);
        next.total = Number((qty * price).toFixed(2));
        return next;
      });
      return { ...state, items: updated };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((_: any, i: number) => i !== action.index),
      };

    case "RESET":
      return defaultForm();

    case "LOAD":
      return {
        ...action.invoice,
        items: action.invoice.items.map((item: any) => ({
          ...item,
          id: item.id ?? generateId(),
          total: Number(item.quantity || 0) * Number(item.price || 0),
        })),
      };

    default:
      return state;
  }
}

export function useInvoiceForm(initial = null) {
  const [form, dispatch] = useReducer(formReducer, initial || defaultForm());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (field: string, value: any) =>
    dispatch({ type: "SET_FIELD", field, value });

  const setAddressField = (addressKey: string, field: string, value: any) =>
    dispatch({ type: "SET_ADDRESS_FIELD", addressKey, field, value });

  const addItem = () => dispatch({ type: "ADD_ITEM" });

  const updateItem = (index: number, field: string, value: any) =>
    dispatch({ type: "UPDATE_ITEM", index, field, value });

  const removeItem = (index: number) =>
    dispatch({ type: "REMOVE_ITEM", index });

  const reset = () => {
    dispatch({ type: "RESET" });
    setErrors({});
  };

  const load = (invoice: any) => dispatch({ type: "LOAD", invoice });

  const grandTotal = form.items.reduce(
    (sum: number, item: any) => sum + item.total,
    0,
  );

  return {
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
  };
}
