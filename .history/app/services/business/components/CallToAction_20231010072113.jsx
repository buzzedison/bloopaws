// CallToAction.js
export default function CallToAction({ children }) {
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-purple-600 w-screen h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-5xl font-extrabold text-white">
          {children}
        </div>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 ease-in-out">
          Take Action
        </button>
      </div>
    </div>
  );
}
