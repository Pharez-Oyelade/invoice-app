interface AddressFieldsProps {
  addressKey: "senderAddress" | "clientAddress";
  address: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  onChange: (
    addressKey: "senderAddress" | "clientAddress",
    field: string,
    value: string,
  ) => void;
  errors: Record<string, string>;
}

export default function AddressFields({
  addressKey,
  address,
  onChange,
  errors,
}: AddressFieldsProps) {
  const key = addressKey === "senderAddress" ? "sender" : "client";

  const handle = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(addressKey, field, e.target.value);

  return (
    <div className="space-y-6">
      {/* Street */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor={`${key}-street`}
            className="text-sm font-semibold text-(--text-form)"
          >
            Street Address
          </label>
          {errors[`${key}.street`] && (
            <span className="text-xs text-red-500">
              {errors[`${key}.street`]}
            </span>
          )}
        </div>
        <input
          id={`${key}-street`}
          type="text"
          value={address.street}
          onChange={handle("street")}
          className={`w-full px-4 py-3 rounded bg-(--bg-input) border border-(--border-input) text-(--text-primary) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors[`${key}.street`] ? "border-red-500" : ""
          }`}
        />
      </div>

      {/* City / Post Code / Country row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor={`${key}-city`}
              className="text-sm font-semibold text-(--text-form)"
            >
              City
            </label>
            {errors[`${key}.city`] && (
              <span className="text-xs text-red-500">
                {errors[`${key}.city`]}
              </span>
            )}
          </div>
          <input
            id={`${key}-city`}
            type="text"
            value={address.city}
            onChange={handle("city")}
            className={`w-full px-4 py-3 rounded bg-(--bg-input) border border-(--border-input) text-(--text-primary) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors[`${key}.city`] ? "border-red-500" : ""
            }`}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor={`${key}-postCode`}
              className="text-sm font-semibold text-(--text-form)"
            >
              Post Code
            </label>
            {errors[`${key}.postCode`] && (
              <span className="text-xs text-red-500">
                {errors[`${key}.postCode`]}
              </span>
            )}
          </div>
          <input
            id={`${key}-postCode`}
            type="text"
            value={address.postCode}
            onChange={handle("postCode")}
            className={`w-full px-4 py-3 rounded bg-(--bg-input) border border-(--border-input) text-(--text-primary) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors[`${key}.postCode`] ? "border-red-500" : ""
            }`}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor={`${key}-country`}
              className="text-sm font-semibold text-(--text-form)"
            >
              Country
            </label>
            {errors[`${key}.country`] && (
              <span className="text-xs text-red-500">
                {errors[`${key}.country`]}
              </span>
            )}
          </div>
          <input
            id={`${key}-country`}
            type="text"
            value={address.country}
            onChange={handle("country")}
            className={`w-full px-4 py-3 rounded bg-(--bg-input) border border-(--border-input) text-(--text-primary) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors[`${key}.country`] ? "border-red-500" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}
