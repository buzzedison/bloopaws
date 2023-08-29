// Import axios
"use client"
import axios from "axios";
// Import useState from react
// Import React and Next.js components
import { useState } from "react";
import Image from "next/image";

// Import Tailwind CSS styles
import "tailwindcss/tailwind.css";

// Define a custom component for the header
function Header() {
  // Use state hook to store the email input value
  const [email, setEmail] = useState("");

  // Define a function to handle the form submission
  function handleSubmit(event) {
    event.preventDefault();
    // Do something with the email value
    console.log(email);
  }

  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-600">
      <div className="md:w-2/3 mx-auto text-center">
        <h1 className="text-3xl font-bold text-white sm:text-5xl">
          Grow your business with our digital services
        </h1>
        <p className="mt-4 text-white">
          Our team of experts helps drive results
        </p>
      </div>
      <div className="mt-12 md:w-2/3 mx-auto">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}

// Define the default export for the page
export default function Home() {
  return (
    <div className="container mx-auto">
      {/* Use the custom header component */}
      <Header />
      {/* Use the Next.js image component to optimize the image */}
      <Image src="/logo.png" alt="Logo" width={200} height={200} />
    </div>
  );
}
