export type Item = { description: string; quantity: number; price: number };
export type Quote = {
  business: string;
  contact: string;
  customer: string;
  reference: string;
  date: string;
  validUntil: string;
  items: Item[];
  delivery: number;
  deposit: number;
  notes: string;
  logo: string;
};
export const money = (n: number) =>
  `GHS ${n.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const cents = (n: number) => Math.round((n + Number.EPSILON) * 100);
export function totals(q: Quote) {
  const subtotal = q.items.reduce(
    (sum, i) => sum + Math.round(cents(i.price) * i.quantity),
    0,
  );
  const total = subtotal + cents(q.delivery);
  const deposit = Math.round((total * q.deposit) / 100);
  return {
    subtotal: subtotal / 100,
    total: total / 100,
    deposit: deposit / 100,
    balance: (total - deposit) / 100,
  };
}
export function blankQuote(): Quote {
  const date = new Date();
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  return {
    business: "",
    contact: "",
    customer: "",
    reference: `Q-${localDate.replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    date: localDate,
    validUntil: "",
    items: [{ description: "", quantity: 1, price: 0 }],
    delivery: 0,
    deposit: 50,
    notes: "",
    logo: "",
  };
}
export function validateQuote(value: unknown): string | null {
  if (!value || typeof value !== "object") return "Enter your quote details.";
  const q = value as Quote;
  for (const [key, max] of Object.entries({
    business: 120,
    contact: 200,
    customer: 120,
    reference: 60,
    date: 10,
    validUntil: 10,
    notes: 1000,
    logo: 400000,
  })) {
    if (
      typeof q[key as keyof Quote] !== "string" ||
      (q[key as keyof Quote] as string).length > max
    )
      return `Check ${key}.`;
  }
  if (!q.business.trim() || !q.customer.trim() || !q.reference.trim())
    return "Add your business, customer and quote reference.";
  const validDate = (s: string) =>
    /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    !Number.isNaN(Date.parse(s)) &&
    new Date(s).toISOString().slice(0, 10) === s;
  if (
    !validDate(q.date) ||
    (q.validUntil && (!validDate(q.validUntil) || q.validUntil < q.date))
  )
    return "Check the quote dates. Valid until must be on or after the quote date.";
  if (!Array.isArray(q.items) || !q.items.length || q.items.length > 30)
    return "Include between 1 and 30 items.";
  for (const item of q.items) {
    if (
      !item ||
      typeof item.description !== "string" ||
      !item.description.trim() ||
      item.description.length > 180 ||
      !Number.isFinite(item.quantity) ||
      item.quantity <= 0 ||
      item.quantity > 100000 ||
      !Number.isFinite(item.price) ||
      item.price < 0 ||
      item.price > 10000000
    )
      return "Each item needs a description, a positive quantity and a valid price.";
  }
  if (
    !Number.isFinite(q.delivery) ||
    q.delivery < 0 ||
    q.delivery > 10000000 ||
    !Number.isFinite(q.deposit) ||
    q.deposit < 0 ||
    q.deposit > 100
  )
    return "Check delivery and deposit (0–100%).";
  if (q.logo && !/^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(q.logo))
    return "Use a PNG or JPEG logo.";
  return null;
}
export function whatsappText(q: Quote) {
  const t = totals(q);
  return [
    `Quotation ${q.reference}`,
    q.business,
    q.contact,
    `For: ${q.customer}`,
    `Date: ${q.date}${q.validUntil ? ` | Valid until: ${q.validUntil}` : ""}`,
    "",
    ...q.items.map(
      (i) =>
        `${i.description} — ${i.quantity} × ${money(i.price)} = ${money(Math.round(cents(i.price) * i.quantity) / 100)}`,
    ),
    `Delivery: ${money(q.delivery)}`,
    `Total: ${money(t.total)}`,
    `Deposit (${q.deposit}%): ${money(t.deposit)}`,
    `Balance after deposit: ${money(t.balance)}`,
    "",
    q.notes,
  ]
    .filter(Boolean)
    .join("\n");
}
