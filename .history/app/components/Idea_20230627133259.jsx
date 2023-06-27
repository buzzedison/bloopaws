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

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row">
        {/* Video Section */}
        <div className="md:w-1/2 flex items-center justify-center">
          {/* Use Image component to display the video thumbnail */}
          <Image
            src="/images/funding.png"
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
          <div className="mx-auto md:ml-4">
            {/* Logo and Section Title */}
            <div className="flex items-center mb-6">
              
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
            {/* Pass the tabs data as props to the Tabs component */}
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>
    </div>
  );
}
