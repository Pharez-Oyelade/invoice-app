export function generateId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letterPart = () => letters[Math.floor(Math.random() * 26)];
  const number = String(Math.floor(Math.random() * 9000) + 1000);
  return letterPart() + letterPart() + number;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

export function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function addDays(dateStr: string, days: number) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function todayISO() {
  return new Date().toISOString().split("T")[0];
}
