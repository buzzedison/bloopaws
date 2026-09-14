const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("fs");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage();
  await page.route("**/google-analytics.com/**", (r) => r.abort());
  await page.goto("http://localhost:3098/quote-builder");
  const data = await page.evaluate(() => {
    const c = document.createElement("canvas");
    c.width = 1200;
    c.height = 800;
    const ctx = c.getContext("2d");
    const pixels = ctx.createImageData(1200, 800);
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i] = Math.random() * 255;
      pixels.data[i + 1] = Math.random() * 255;
      pixels.data[i + 2] = 150;
      pixels.data[i + 3] = 255;
    }
    ctx.putImageData(pixels, 0, 0);
    ctx.fillStyle = "white";
    ctx.fillRect(80, 240, 1040, 320);
    ctx.fillStyle = "#b91c1c";
    ctx.font = "bold 120px Arial";
    ctx.fillText("TEST LOGO", 220, 440);
    return { png: c.toDataURL("image/png"), webp: c.toDataURL("image/webp") };
  });
  const png = Buffer.from(data.png.split(",")[1], "base64");
  assert.ok(png.length > 250000);
  const upload = page.locator("input[type=file]");
  await upload.setInputFiles({
    name: "large-logo.png",
    mimeType: "image/png",
    buffer: png,
  });
  await page
    .getByText("Logo added. It will appear on your downloaded PDF.", {
      exact: true,
    })
    .waitFor();
  const normalized = await page
    .getByAltText("Uploaded logo")
    .getAttribute("src");
  assert.ok(normalized.length < 400000);
  assert.ok(await page.getByAltText("Your business logo").isVisible());
  await page
    .getByLabel("Business name *", { exact: true })
    .fill("Logo Test Business");
  await page.getByLabel("Customer name *").fill("Test Customer");
  await page.getByLabel("Item 1 *").fill("Website");
  await page
    .getByLabel("Save my details and last 10 quotes on this device")
    .check();
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Download PDF", exact: true }).click(),
  ]);
  fs.mkdirSync("output/quote-builder", { recursive: true });
  await download.saveAs("output/quote-builder/logo-test.pdf");
  await page.reload();
  await page.getByAltText("Uploaded logo").waitFor();
  assert.equal(
    await page.getByAltText("Uploaded logo").getAttribute("src"),
    normalized,
  );
  await upload.setInputFiles({
    name: "invalid.png",
    mimeType: "image/png",
    buffer: Buffer.from("not a real image"),
  });
  await page
    .getByText("This image could not be opened.", { exact: false })
    .waitFor();
  assert.equal(
    await page.getByAltText("Uploaded logo").getAttribute("src"),
    normalized,
  );
  await upload.setInputFiles({
    name: "web-logo.webp",
    mimeType: "image/webp",
    buffer: Buffer.from(data.webp.split(",")[1], "base64"),
  });
  await page
    .getByText("Logo added. It will appear on your downloaded PDF.", {
      exact: true,
    })
    .waitFor();
  await page.getByRole("button", { name: "Remove logo", exact: true }).click();
  assert.equal(await page.getByAltText("Uploaded logo").count(), 0);
  await upload.setInputFiles({
    name: "large-logo.png",
    mimeType: "image/png",
    buffer: png,
  });
  await page.getByAltText("Uploaded logo").waitFor();
  await page.getByAltText("Uploaded logo").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "output/quote-builder/logo-upload.png" });
  await browser.close();
  console.log(
    "PASS: >250KB PNG, auto-resizing, preview, PDF, saved reload, corrupt-file feedback, WebP, remove and re-upload.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
