"use client"

import Image from "next/image";
import { useState } from "react";
// Import custom Tabs component
import Tabs from "../components/Tabs";

export default function IdeaToCompanySection() {
  // Define an array of objects to store the data for each tab
  const tabs = [
    {
      label: "How we do it",
      content: "Content for 'How we do it' tab goes here.",
    },
    {
      label: "Those we have helped",
      content: "Content for 'Those we have helped' tab goes here.",
    },
  ];

  // Define a state variable to store the active tab index
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row">
        {/* Video Section */}
        <div className="md:w-1/2 flex items-center justify-center">
          {/* Use Image component to display the video thumbnail */}
          <Image
            src="/images/video-thumb.jpg"
            alt="Video thumbnail"
            width={500}
            height={300}
            className="rounded-lg shadow-lg cursor-pointer"
            // Add an onClick event to open the video modal
            onClick={() => console.log("Open video modal")}
          />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="mx-auto md:ml-8">
            {/* Logo and Section Title */}
            <div className="flex items-center mb-6">
              <Image
                src="/images/funding.png"
                alt="Bloop Global"
                width={500}
                height={250}
              />
              <h2 className="text-4xl font-bold text-gray-800 md:ml-8">
                Idea To Company:<br />
                Turning Ideas into Successful Businesses
              </h2>
            </div>

            {/* Section Description */}
            <p className="text-lg text-gray-600 mb-8">
              At Bloop Global, we partner with top talent to invest in, build,
              and grow successful companies. Our mission is to tackle big
              societal problems, create products that people love, and build
              businesses that can compete with the biggest names in the world.
            </p>

            {/* Tabs */}
            <Tabs>
              {/* Use the map method to iterate over the tabs array and render each tab dynamically */}
              {tabs.map((tab, index) => (
                // Use a div tag to wrap each tab content
                <div key={tab.label} label={tab.label}>
                  {/* Use a paragraph tag to display the tab content */}
                  <p>{tab.content}</p>
                  {/* Use a button tag to display a call to action for each tab */}
                  <button
                    className={`inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mt-8 ${
                      // Add a margin-left class only if it's not the first tab
                      index > 0 ? "ml-4" : ""
                    }`}
                    // Add an onClick event to handle the tab action
                    onClick={() => console.log(`Clicked on ${tab.label}`)}
                  >
                    {`Do something for ${tab.label}`}
                  </button>
                </div>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
