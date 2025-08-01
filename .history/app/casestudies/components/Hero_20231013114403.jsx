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
<button className="items-center btn bg-red-700 text-white px-6 py-4 rounded-lg"> Learn More</button>
        <div className="grid grid-cols-2 gap-8 mt-16">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-2xl font-semibold mb-4">The economic potential of generative AI: The next productivity frontier</h3>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-2xl font-semibold mb-4">McKinsey Technology Trends Outlook 2023</h3>
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
