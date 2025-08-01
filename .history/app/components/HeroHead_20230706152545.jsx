// pages/index.js
import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Hero Section Example</title>
      </Head>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4">
          <header className="py-6">
            <h1 className="text-3xl font-semibold">Your Company</h1>
          </header>
          <section className="bg-white shadow-md rounded-lg px-12 py-8 mt-6">
            <div className="text-center">
              <h2 className="text-4xl font-semibold mb-4">Title of the Hero Section</h2>
              <p className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
                Learn More
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;