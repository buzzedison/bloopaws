import Image from "next/image";
import Link from "next/link";

// ... (products array definition)

export default function ProductsSection() {
  return (
    <>
      <div className="mt-16">
        <div>
          <h1 className="text-gray-500 text-3xl text-center font-bold mb-8">
            Products we manage
          </h1>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Use the map method to iterate over the products array and render each product dynamically */}
            {products.map((product) => (
              <div
                key={product.title}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:p-12 transform transition duration-300 hover:shadow-2xl hover:scale-105 animate-fade-in"
              >
                <Image
                  className="w-full"
                  src={product.image}
                  alt={product.alt}
                  width={600}
                  height={200}
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-xl font-bold mb-2 pt-4 pb-4">
                      {product.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      {product.description}
                    </p>
                  </div>
                  <Link href={product.button.link} passHref>
                    <button className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 self-start text-sm transform transition duration-500 hover:scale-110 hover:-rotate-12">
                      {product.button.text}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
    </>
  );
}