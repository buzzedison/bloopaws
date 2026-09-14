import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { readFileSync } from "fs";
import {
  Quote,
  money,
  totals,
  validateQuote,
  cents,
} from "../../../quote-builder/model";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (raw.length > 450000)
    return NextResponse.json({ error: "Quote is too large." }, { status: 413 });
  let q: Quote;
  try {
    q = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid quote." }, { status: 400 });
  }
  const error = validateQuote(q);
  if (error) return NextResponse.json({ error }, { status: 400 });
  try {
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 48, left: 48, right: 48, bottom: 85 },
        bufferPages: true,
        info: { Title: `Quotation ${q.reference}`, Author: q.business },
      });
      const chunks: Buffer[] = [];
      doc.on("data", (c) => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);
      // Built-in fonts cover Latin text; a bundled Unicode font covers wider business names.
      doc.registerFont(
        "body",
        readFileSync(`${process.cwd()}/public/fonts/quote/DejaVuSans.ttf`),
      );
      doc.registerFont(
        "bold",
        readFileSync(`${process.cwd()}/public/fonts/quote/DejaVuSans-Bold.ttf`),
      );
      const text = (s: string, size = 10, bold = false) =>
        doc
          .font(bold ? "bold" : "body")
          .fontSize(size)
          .fillColor("#202020")
          .text(s, { width: 499, lineGap: 3 });
      if (q.logo) {
        doc.image(Buffer.from(q.logo.split(",")[1], "base64"), 448, 48, {
          fit: [95, 55],
        });
      }
      doc
        .font("bold")
        .fontSize(25)
        .fillColor("#b91c1c")
        .text("QUOTATION", 48, 48, { width: 380 });
      doc.moveDown(1);
      doc.fontSize(17).fillColor("#202020").text(q.business, { width: 360 });
      text(q.contact);
      doc.moveDown();
      text(`Quote: ${q.reference}`, 10, true);
      text(
        `Date: ${q.date}${q.validUntil ? `    Valid until: ${q.validUntil}` : ""}`,
      );
      text(`Prepared for: ${q.customer}`, 12);
      doc.moveDown();
      const header = () => {
        const y = doc.y;
        doc.rect(48, y, 499, 26).fill("#f1eee9");
        doc.fillColor("#202020").font("bold").fontSize(9);
        doc.text("ITEM", 56, y + 8, { width: 225 });
        doc.text("QTY", 290, y + 8, { width: 40, align: "right" });
        doc.text("UNIT (GHS)", 338, y + 8, { width: 85, align: "right" });
        doc.text("AMOUNT (GHS)", 428, y + 8, { width: 111, align: "right" });
        doc.y = y + 34;
      };
      header();
      for (const item of q.items) {
        doc.font("body").fontSize(10);
        const h = Math.max(
          30,
          doc.heightOfString(item.description, { width: 225, lineGap: 3 }) + 16,
        );
        if (doc.y + h > 735) {
          doc.addPage();
          header();
          doc.font("body").fontSize(10);
        }
        const y = doc.y;
        doc.text(item.description, 56, y, { width: 225, lineGap: 3 });
        doc.text(String(item.quantity), 285, y, { width: 45, align: "right" });
        doc.text(money(item.price).slice(4), 334, y, {
          width: 89,
          align: "right",
        });
        doc.text(
          money(Math.round(cents(item.price) * item.quantity) / 100).slice(4),
          426,
          y,
          { width: 113, align: "right" },
        );
        doc
          .moveTo(48, y + h - 6)
          .lineTo(547, y + h - 6)
          .strokeColor("#e6e2dc")
          .stroke();
        doc.y = y + h;
      }
      if (doc.y + 150 > 735) doc.addPage();
      doc.x = 48;
      doc.moveDown();
      const t = totals(q);
      text(`Subtotal: ${money(t.subtotal)}`);
      text(`Delivery: ${money(q.delivery)}`);
      text(`Total: ${money(t.total)}`, 16, true);
      text(`Deposit (${q.deposit}%): ${money(t.deposit)}`);
      text(`Balance after deposit: ${money(t.balance)}`);
      if (q.notes) {
        doc.moveDown();
        text("Notes / payment instructions", 10, true);
        text(q.notes);
      }
      const range = doc.bufferedPageRange();
      for (let i = 0; i < range.count; i++) {
        doc.switchToPage(i);
        doc.page.margins.bottom = 0;
        doc
          .font("body")
          .fontSize(8)
          .fillColor("#777777")
          .text(
            `Quotation • ${q.reference}    |    ${i + 1} / ${range.count}`,
            48,
            785,
            { width: 499, lineBreak: false },
          );
      }
      doc.end();
    });
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="quotation.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not create the PDF. Check your logo or try again." },
      { status: 500 },
    );
  }
}
