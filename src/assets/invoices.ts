export const invoiceData = [
  {
    id: "RT3080",
    createdAt: "2021-08-18",
    paymentDue: "2021-09-19",
    description: "Re-branding",
    paymentTerms: 30,
    clientName: "Jensen Huang",
    clientEmail: "jensenh@mail.com",
    status: "paid",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "106 Kendell Street",
      city: "SharBorough",
      postCode: "S1 0JY",
      country: "United Kingdom",
    },
    items: [{ name: "Brand Guidlines", quantity: 1, price: 1800.9 }],
    total: 1800.9,
  },

  {
    id: "XM9141",
    createdAt: "2021-08-18",
    paymentDue: "2021-09-19",
    description: "Re-branding",
    paymentTerms: 30,
    clientName: "Jensen Huang",
    clientEmail: "jensenh@mail.com",
    status: "paid",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "106 Kendell Street",
      city: "SharBorough",
      postCode: "S1 0JY",
      country: "United Kingdom",
    },
    items: [
      { name: "Banner Design", quantity: 1, price: 156 },
      { name: "Email Design", quantity: 2, price: 200 },
    ],
    total: 556,
  },
];
