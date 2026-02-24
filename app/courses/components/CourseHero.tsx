import Link from "next/link"

export default function CourseHero() {
    return (
      <div className=" bg-red-800 text-white py-20">
        <div className="container mx-auto text-center h-56 md:h-96">
          <h1 className=" mt-4 md:mt-24 text-4xl md:text-6xl font-extrabold mb-4 pt-0 md:pt-24">AI for Business Growth</h1>
          <p className="text-xl mb-8">Harness the power of AI to drive your business forward</p>
          <div className="space-x-4">
            <Link prefetch={false} href="https://bloopglobal.ck.page/f1460a0d63 " className="bg-black text-white px-8 py-3 rounded-full font-semibold">Sign Up</Link>
            <Link prefetch={false} href="/courses/aicourse" className="bg-transparent border border-red-200 text-red-200 px-8 py-3 rounded-full font-semibold">Learn More</Link>
          </div>
        </div>
      </div>
    );
  }
  