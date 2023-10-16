// components/CaseStudies.tsx
import React from 'react';

const CaseStudies = () => {
  return (
    <div className="min-h-screen p-10" style={{ backgroundImage: 'url(/images/casehome.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto py-20  rounded-xl mt-24">
        <h1 className="text-center text-6xl font-bold mb-8 text-white">Revamping MyCo's Online Presence</h1>
        <p className="text-xl mb-10 text-white text-center p-4 ">
          The founders of MyCo knew there had to be a better way to manage customer relations.<br/> After countless late nights and many cups of coffee, they cracked the code
          <br/> - a revolutionary app called My Center Office (MyCo).
        </p>
        <div className="flex justify-center">
          <button className="bg-red-700 text-white px-6 py-4 rounded-lg">Learn More</button>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-16">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-2xl font-semibold mb-4">Making Room for What Matters</h3>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-2xl font-semibold mb-4">
            Two men, a vision and a health tech app</h3>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-2xl font-semibold mb-4">Author Talks: How to speak confidently when you’re put on the spot</h3>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-2xl font-semibold mb-4">Some employees are destroying value. Others are building it. Do you know the difference?</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
