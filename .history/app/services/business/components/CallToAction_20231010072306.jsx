// CallToAction.js
export default function CallToAction({ children }) {
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-purple-600 w-full py-16">
      <div className="container mx-auto text-center space-y-4">
        <div className="text-4xl font-extrabold text-white">
          {children}
        </div>
        <button className="bg-white text-red-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 ease-in-out">
          Take Action
        </button>
      </div>
    </div>
  );
}
