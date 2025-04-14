import Link from 'next/link';

export default function CallToAction({ children }) {
    return (
      <div className="bg-red-600 p-8 rounded-xl my-10 text-white shadow-lg">
        <div className="max-w-xl mx-auto text-center">
          <div className="text-2xl font-semibold pb-4">
            {children}
          </div>
          <Link 
            href="/contact"
            className="inline-block bg-white text-red-600 font-bold rounded-full px-8 py-3 transition duration-300 ease-in-out hover:bg-red-500 hover:text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    );
}