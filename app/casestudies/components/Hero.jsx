import React from 'react';

const CaseStudies = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-10" style={{ backgroundImage: 'url(/images/casehome.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 rounded-xl mt-12 sm:mt-16 lg:mt-24">
        <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-white">Revamping MyCo's Online Presence</h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-white text-center p-2 sm:p-4 ">
          The founders of MyCo knew there had to be a better way to manage customer relations. After countless late nights and many cups of coffee, they cracked the code - a revolutionary app called My Center Office (MyCo).
        </p>
        <div className="flex justify-center">
          <button className="bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-4 rounded-lg">Learn More</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
          <div className="bg-white p-4 sm:p-6 rounded shadow">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Making Room for What Matters</h3>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded shadow">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Two men, a vision and a health tech app</h3>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded shadow">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">No Cap! We built the flyest online home for a real estate company</h3>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded shadow">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Some employees are destroying value. Others are building it. Do you know the difference?</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
