import Link from "next/link";
export default function NotFound() {
  return (
    <div className="bg-[#f8f6f2] px-6 pt-40 pb-28 text-zinc-900">
      <div className="max-w-3xl mx-auto">
        <p className="text-red-700 text-sm font-semibold mb-6">
          PAGE NOT FOUND
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Let’s get you
          <br />
          to the right place.
        </h1>
        <p className="text-zinc-600 mb-8">
          This page may have moved, or the link may be incomplete.
        </p>
        <div className="flex flex-wrap gap-5">
          <Link href="/" className="bg-red-700 text-white px-6 py-3 rounded-lg">
            Back to home
          </Link>
          <Link href="/services" className="px-6 py-3 underline">
            Explore our services
          </Link>
        </div>
      </div>
    </div>
  );
}
