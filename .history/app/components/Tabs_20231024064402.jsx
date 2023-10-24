"use client"
import { useState } from "react";

export default function Tabs({ tabs }) {
  // Define a state variable to store the active tab index
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="text-gray-600 pr-6">
      {/* Use a div tag to wrap the tab labels */}
      <div className="flex ">
        {/* Use the map method to iterate over the tabs array and render each tab label as a button */}
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            // Add Tailwind classes for styling
            className={`px-4 py-2 rounded-lg ${
              // Add a different background color class depending on whether the tab is active or not
              index === activeTab ? "bg-black text-white" : "bg-gray-200"
            }`}
            // Add an onClick event to update the active tab index
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Use conditional rendering to display the content of the active tab */}
      {tabs[activeTab] && (
        // Use a div tag to wrap the tab content
        <div className="mt-4">
          {tabs[activeTab].content}
        </div>
      )}
    </div>
  );
}
