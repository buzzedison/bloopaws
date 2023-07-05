"use client"
import Image from "next/image";
import { useState } from "react";
import { useDynamicScript } from "../hooks/useDynamicScript";

// Import custom Tabs component
import Tabs from "../components/Tabs";

export default function IdeaToCompanySection() {
  // Define an array of objects to store the data for each tab
  const tabs = [
    {
      label: "How we do it",
      content: "Content for 'How we do it' tab goes here yes.",
    },
    {
      label: "Those we have helped",
      content: "Content for 'Those we have helped' tab goes here.",
    },
  ];

  // Define a state variable to show or hide the modal
  const [showModal, setShowModal] = useState(false);

  // Define a ref for the modal element
  const modalRef = useRef();

  // Use a custom hook to detect clicks outside the modal and close it
  useDynamicScript(modalRef, () => setShowModal(false));

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
            // Add an onClick event to open the modal
            onClick={() => setShowModal(true)}
          />
          {/* Modal component */}
          {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                  ref={modalRef}
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    {/* Video inside modal */}
                    <video src="/video/bloop.mp4" width={500} height={300} controls />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="mx-auto md:ml-8">
            {/* Logo and Section Title */}
            <div className="flex items-center mb-6">
              
              <h2 className="text-4xl font-bold text-red-600 ">
                Idea To Company:<br />
                <span className="text-black">Turning Ideas into Successful Businesses</span>
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
