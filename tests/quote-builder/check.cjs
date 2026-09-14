const fs = require("fs");
const ts = require("typescript");
const assert = require("node:assert/strict");
require.extensions[".ts"] = (module, filename) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
      },
    }).outputText,
    filename,
  );
const {
  blankQuote,
  totals,
  validateQuote,
  whatsappText,
} = require("../../app/quote-builder/model.ts");
const q = {
  ...blankQuote(),
  business: "Ama’s Kitchen",
  customer: "Akosua Mensah",
  contact: "Accra · 020 000 0000",
  items: [{ description: "Lunch packs", quantity: 50, price: 35 }],
  delivery: 50,
  notes: "Delivery to East Legon. Please use the quote reference when paying.",
  deposit: 50,
};
assert.equal(validateQuote(q), null);
assert.deepEqual(totals(q), {
  subtotal: 1750,
  total: 1800,
  deposit: 900,
  balance: 900,
});
assert.equal(
  totals({
    ...q,
    items: [{ description: "Fraction", price: 1.01, quantity: 1.5 }],
    delivery: 0,
  }).total,
  1.52,
);
for (const change of [
  { deposit: -1 },
  { delivery: NaN },
  { items: [] },
  { date: "2026-02-30" },
  { items: [{ description: "", quantity: 1, price: 1 }] },
  { logo: "data:image/svg+xml;base64,abc" },
])
  assert.ok(validateQuote({ ...q, ...change }));
assert.ok(whatsappText(q).includes("GHS 1,800.00"));
assert.ok(!whatsappText(q).includes("NaN"));
// Test the CRM adapter without contacting Stride or emailing a prospect.
const { NextRequest } = require("next/server");
const { POST } = require("../../app/api/quote-builder/enquiry/route.ts");
const originalFetch = global.fetch;
const data = {
  name: "Test Owner",
  business: "Test Business",
  email: "owner@example.com",
  phone: "",
  service: "Website / online shop",
  role: "Owner / decision-maker",
  budget: "5000",
  timeline: "Within 1 month",
  need: "Customers should place orders through our website.",
  consent: "yes",
  website_url: "",
};
(async () => {
  process.env.STRIDE_API_KEY = "test-only";
  let outbound;
  global.fetch = async (_, init) => {
    outbound = JSON.parse(init.body);
    return new Response(JSON.stringify({ data: { id: "test-contact" } }), {
      status: 200,
    });
  };
  const request = (body, ip) =>
    new NextRequest("http://localhost/api/quote-builder/enquiry", {
      method: "POST",
      headers: { origin: "http://localhost", "x-forwarded-for": ip },
      body: JSON.stringify(body),
    });
  let res = await POST(request(data, "test1"));
  assert.equal(res.status, 200);
  assert.equal((await res.json()).candidate, true);
  assert.equal(outbound.source, "Bloop Quote Builder");
  res = await POST(request({ ...data, budget: "0" }, "test2"));
  assert.equal((await res.json()).candidate, false);
  global.fetch = async () => new Response("{}", { status: 500 });
  res = await POST(request(data, "test3"));
  assert.equal(res.status, 502);
  global.fetch = async () => {
    throw Error("Should not call");
  };
  res = await POST(request({ ...data, consent: "no" }, "test4"));
  assert.equal(res.status, 400);
  res = await POST(request(null, "test-null"));
  assert.equal(res.status, 400);
  res = await POST(new NextRequest("http://localhost/api/quote-builder/enquiry", { method: "POST", body: "{invalid", headers: { "x-forwarded-for": "test-json" } }));
  assert.equal(res.status, 400);
  global.fetch = originalFetch;
  fs.mkdirSync("output/quote-builder", { recursive: true });
  fs.writeFileSync("output/quote-builder/sample.json", JSON.stringify(q));
  console.log(
    "PASS: currency rounding, invalid input, WhatsApp content, CRM success/failure, qualification and consent. No live external writes.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
