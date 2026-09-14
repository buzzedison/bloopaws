const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
(async () => {
  const b = await chromium.launch({ channel: "chrome", headless: true });
  const p = await b.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  await p.route("**/google-analytics.com/**", (r) => r.abort());
  await p.goto("http://localhost:3098/quote-builder");
  await p.getByLabel("Business name *", { exact: true }).fill("Draft Business");
  await p.getByLabel("Customer name *").fill("Draft Customer");
  await p.getByLabel("Item 1 *").fill("Catering");
  await p.getByLabel("Quantity *").fill("0");
  await p.getByLabel("Quote date *", { exact: true }).fill("");
  await p
    .getByLabel("Save my details and last 10 quotes on this device")
    .check();
  await p.reload();
  assert.equal(
    await p.getByLabel("Business name *", { exact: true }).inputValue(),
    "Draft Business",
  );
  assert.equal(
    await p.getByLabel("Quote date *", { exact: true }).inputValue(),
    "",
  );
  assert.equal(await p.getByLabel("Quantity *").inputValue(), "0");
  let pdfRequests = 0;
  await p.route("**/api/quote-builder/pdf", (r) => {
    pdfRequests++;
    return r.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Test download failure" }),
    });
  });
  await p.getByRole("button", { name: "Download PDF", exact: true }).click();
  assert.equal(pdfRequests, 0);
  await p.getByLabel("Quote date *", { exact: true }).fill("2026-09-14");
  await p.getByLabel("Quantity *").fill("2.5");
  await p.getByLabel("Unit price (GHS) *").fill("25.50");
  await p.getByLabel("Deposit required (%)").fill("100");
  await p.getByRole("button", { name: "Download PDF", exact: true }).click();
  await p.getByText("Test download failure", { exact: true }).waitFor();
  assert.equal(
    await p.getByLabel("Customer name *").inputValue(),
    "Draft Customer",
  );
  await p.getByRole("button", { name: "New quote", exact: true }).click();
  assert.equal(await p.getByLabel("Customer name *").inputValue(), "");
  assert.equal(
    await p.getByRole("button", { name: "Load", exact: true }).count(),
    1,
  );
  await p.getByRole("button", { name: "Load", exact: true }).click();
  assert.equal(await p.getByLabel("Quantity *").inputValue(), "2.5");
  for (let i = 1; i < 30; i++)
    await p.getByRole("button", { name: "Add an item", exact: true }).click();
  assert.equal(
    await p
      .getByRole("button", { name: "Add an item", exact: true })
      .isDisabled(),
    true,
  );
  await p.getByRole("button", { name: "Remove item 30", exact: true }).click();
  assert.equal(
    await p
      .getByRole("button", { name: "Add an item", exact: true })
      .isEnabled(),
    true,
  );
  await p.evaluate(() =>
    localStorage.setItem(
      "bloop:quotes:v1",
      JSON.stringify({ version: 1, draft: { items: [null] }, quotes: [] }),
    ),
  );
  await p.reload();
  await p.getByLabel("Business name *", { exact: true }).waitFor();
  assert.deepEqual(errors, []);
  await p.setViewportSize({ width: 360, height: 800 });
  assert.ok(
    await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  );
  await b.close();
  console.log(
    "PASS: unfinished draft recovery, invalid export blocking, download failure recovery, new-quote history, fractional quantities, 30-item limit, corrupt storage and 360px layout.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
