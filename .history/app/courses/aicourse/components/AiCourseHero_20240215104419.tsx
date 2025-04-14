// components/AICourseHero.tsx
import Link from "next/link";
export default function AICourseHero() {
  return (
    <div className=" bg-red-800 text-white py-20 mt-20 md:mt-12">
      <div className="container mx-auto text-center pt-2 md:pt-24">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">AI for Business Growth</h1>
        <p className="text-xl mb-8">The Complete Guide to Transforming Your Business with Generative AI</p>
        <Link href="https://bloopglobal.ck.page/f1460a0d63" className="bg-red-800 text-white px-8 py-3 rounded-full font-semibold">Enroll Now</Link>
      </div>
    </div>
  );
}
