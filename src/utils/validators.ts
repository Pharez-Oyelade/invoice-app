export function validateInvoice(form: any) {
  const errors: Record<string, string> = {};

  // Sender address
  if (!form.senderAddress.street.trim())
    errors["sender.street"] = "Can't ne empty";
  if (!form.senderAddress.city.trim()) errors["sender.city"] = "Can't be empty";
  if (!form.senderAddress.postCode.trim())
    errors["sender.postCode"] = "Can't be empty";
  if (!form.senderAddress.country.trim())
    errors["sender.country"] = "Can't be empty";

  // client info
  if (!form.clientName.trim()) errors.clientName = "Can't be empty";

  if (!form.clientEmail.trim()) {
    errors.clientEmail = "Can't be empty";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.clientEmail)) {
    errors.clientEmail = "Invalid email address";
  }

  // Client address
  if (!form.clientAddress.street.trim())
    errors["client.street"] = "Can't be empty";
  if (!form.clientAddress.city.trim()) errors["client.city"] = "Can't be empty";
  if (!form.clientAddress.postCode.trim())
    errors["client.postCode"] = "Can't be empty";
  if (!form.clientAddress.country.trim())
    errors["client.country"] = "Can't be empty";

  // Invoice meta
  if (!form.createdAt) errors.createdAt = "Can't be empty";
  if (!form.description.trim()) errors.description = "Can't be empty";

  // Items
  if (form.items.length === 0) {
    errors.items = "An item must be added";
  } else {
    form.items.forEach((item: any, i: number) => {
      if (!item.name.trim()) errors[`item_${i}_name`] = "Can't be empty";
      if (item.quantity <= 0) errors[`item_${i}_qty`] = "Must be at least 1";
      if (item.price <= 0) errors[`item_${i}_price`] = "Must be greater than 0";
    });
  }

  return errors;
}

// Draft only requires items to have names if they exist
export function validateDraft(form: any) {
  const errors: Record<string, string> = {};
  if (form.items.length > 0) {
    form.items.forEach((item: any, i: number) => {
      if (!item.name.trim()) errors[`item_${i}_name`] = "Can't be empty";
    });
  }
  return errors;
}
