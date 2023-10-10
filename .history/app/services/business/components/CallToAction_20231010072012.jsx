

export default function CallToAction({ children }) {
  return (
    <div className="bg-red-600 p-8 rounded-xl my-10 text-white shadow-lg">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-2xl font-semibold pb-4">
          {children}
        </div>
       
      </div>
    </div>
  );
}