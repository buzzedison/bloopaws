import ContactForm from "../components/ContactForm";
export const metadata = {
  title: "Discuss Your Project",
  description:
    "Tell Bloop what you want to build or automate. Share a short brief and we’ll help define the next step.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage({ searchParams }) {
  return (
    <ContactForm
      initialService={
        typeof searchParams?.service === "string" ? searchParams.service : ""
      }
    />
  );
}
