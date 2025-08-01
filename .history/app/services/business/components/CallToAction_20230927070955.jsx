export default function CallToAction({ children }) {
    return (
      <div className="bg-indigo-600 p-8 rounded-lg my-10 text-white">
        <div className="max-w-xl mx-auto text-center">
          {children}
        </div>
      </div>
    )
  }