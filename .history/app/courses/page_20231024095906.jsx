const ComingSoon = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
            Coming Soon
          </h1>
          <p className="text-xl mb-4 text-gray-600">
            We're working hard to finish the development of this page.
          </p>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email to get notified"
              className="p-2 border border-gray-300 rounded-lg mr-2 w-1/2"
            />
            <button className="bg-red-700 text-white py-2 px-6 rounded-lg">
              Notify Me
            </button>
          </div>
          <p className="text-gray-500">Stay tuned for something amazing!</p>
        </div>
      </div>
    );
  };
  
  export default ComingSoon;
  