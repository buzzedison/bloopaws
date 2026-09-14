const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({ headless: true, channel: "chrome" });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    acceptDownloads: true,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:3098/quote-builder");
  await page
    .getByLabel("Business name *", { exact: true })
    .fill("Ama’s Kitchen");
  await page.getByLabel("Customer name *").fill("Akosua Mensah");
  await page.getByLabel("Item 1 *").fill("Lunch packs");
  await page.getByLabel("Quantity *").fill("50");
  await page.getByLabel("Unit price (GHS) *").fill("35");
  await page.getByLabel("Delivery / additional charge (GHS)").fill("50");
  await page
    .getByLabel("Save my details and last 10 quotes on this device")
    .check();
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Download PDF", exact: true }).click(),
  ]);
  await download.saveAs("output/quote-builder/browser.pdf");
  await page.reload();
  assert.equal(
    await page.getByLabel("Business name *", { exact: true }).inputValue(),
    "Ama’s Kitchen",
  );
  assert.equal(await page.getByLabel("Quantity *").inputValue(), "50");
  await page.getByRole("button", { name: "Duplicate", exact: true }).click();
  assert.equal(
    await page.getByLabel("Customer name *").inputValue(),
    "Akosua Mensah",
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "output/quote-builder/desktop.png",
    fullPage: true,
  });
  await page.evaluate(() => {
    window.open = (url) => {
      window.__quoteShare = url;
      return null;
    };
  });
  await page
    .getByRole("button", { name: "Share quote text on WhatsApp" })
    .click();
  const share = await page.evaluate(() => window.__quoteShare);
  assert.match(share, /^https:\/\/wa.me\/\?text=/);
  assert.ok(decodeURIComponent(share).includes("GHS 1,800.00"));
  await page.getByRole("button", { name: "Talk to Bloop" }).click();
  await page.route("**/api/quote-builder/enquiry", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, candidate: true }),
    }),
  );
  await page.getByLabel("Your name *", { exact: true }).fill("Demo Owner");
  await page.getByLabel("Email *", { exact: true }).fill("owner@example.com");
  await page
    .getByLabel("What do you need? *")
    .selectOption({ label: "Website / online shop" });
  await page
    .getByLabel("Your role *")
    .selectOption({ label: "Owner / decision-maker" });
  await page.getByLabel("Project budget (GHS) *").fill("5000");
  await page
    .getByLabel("When would you like to start? *")
    .selectOption({ label: "Within 1 month" });
  await page
    .getByLabel("What should it help you do? *")
    .fill("Customers should order lunch directly on our website.");
  await page.getByRole("checkbox", { name: /I agree/ }).check();
  await page.getByRole("button", { name: "Send my enquiry" }).click();
  await page
    .getByText("Your enquiry has been received.", { exact: false })
    .waitFor();
  await page.evaluate(() => {
    localStorage.setItem("bloop:quote:last-visit", "2026-01-01");
  });
  await page.reload();
  await page.getByLabel("Business name *", { exact: true }).waitFor();
  const events = await page.evaluate(() =>
    Array.from(window.dataLayer || []).map((x) => Array.from(x)),
  );
  assert.ok(events.some((x) => x[1] === "quote_builder_return"));
  await page
    .getByLabel("Save my details and last 10 quotes on this device")
    .uncheck();
  assert.equal(
    await page.evaluate(() => localStorage.getItem("bloop:quotes:v1")),
    null,
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "output/quote-builder/mobile.png",
    fullPage: true,
  });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
    true,
  );
  assert.deepEqual(errors, []);
  await browser.close();
  console.log(
    "PASS: desktop/mobile, PDF download, persisted quote, duplication, WhatsApp text, mocked enquiry, return event, delete saved data, no runtime errors.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
