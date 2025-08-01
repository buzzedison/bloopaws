
export default function NewsletterCTAB() {
    const externalUrl = "https://airtable.com/appN08604EcWr0e4L/shrQjeN4bgyIoN6Tr"; // replace with your actual external URL
  
    return (
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-red-400 via-red-700 to-red-500 py-16 px-0 w-full">
        <div className="md:w-1/2">
          <div className="max-w-screen-xl w-full text-center space-y-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              Unlock the Growth Tools of Tomorrow, Today!
            </h2>
            <p className="text-lg text-white">
              Get ahead of the curve with cutting-edge insights, courses, and
              resources. All served fresh in our weekly newsletter.
            </p>
            <div className="mt-8 space-y-4">
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-3 px-4 rounded-full text-white bg-black hover:bg-gray-800 focus:ring focus:ring-purple-200 transition duration-300"
              >
                <span>Join the Future</span>
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }