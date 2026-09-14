import QuoteBuilder from "./QuoteBuilder";
export const metadata = {
  title: "Free Quote Builder for Ghanaian Businesses",
  description:
    "Create a professional quotation in GHS, download a PDF and share it on WhatsApp. Save your business details on your device. No signup needed.",
  alternates: { canonical: "/quote-builder" },
};
export default function Page() {
  return <QuoteBuilder />;
}
