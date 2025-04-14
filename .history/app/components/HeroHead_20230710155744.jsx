import Image from 'next/image'

const HomePage = () => {
  return (
    <div className="relative bg-gray-100 py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex items-center justify-between">
          <div className="sm:mr-10 mb-10 sm:mb-0 w-24 h-24 relative">
            <Image
              src="/images/back.png"
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className="sm:text-left text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Making sense of generational stereotypes at work
            </h1>
            <h2 className="text-lg text-gray-500 mt-4">
              Boomers to the left of you; gen Z to the right. Are we really so bafflingly different?
            </h2>
            <div className="mt-8 sm:flex items-center justify-center sm:justify-start">
              <div className="rounded-md shadow">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  People are people <svg className="ml-2 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M17.707 11.293a1 1 0 0 0-1.414 0L11 16.586V7a1 1 0 1 0-2 0v9.586l-5.293-5.293a1 1 0 0 0-1.414 1.414l6 6a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0 0-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gray-900 opacity-25"></div>
      <Image
        src="/images/hero-background.jpg"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
    </div>
  )
}

export default HomePage