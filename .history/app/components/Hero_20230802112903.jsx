"use client"
import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");

    try {
      const response = await fetch("/app/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Form submitted successfully");
      } else {
        const error = await response.json();
        setMessage(error.error);
      }
    } catch (error) {
      setMessage("An error occurred while submitting the form");
    }
  };

  return (
    <div className="bg-gray-100 py-24">
      <div className="container mx-auto">
        {/* ... */}
        <div className="flex justify-center mt-6">
          <form className="max-w-screen-lg" onSubmit={(e) => handleSubmit(e)}>
            <div className="relative w-full">
              <input
                className="w-full px-40 pl-36 pr-36 rounded-2xl border-spacing-1 border-2 py-4"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-red-600">{emailError}</p>}
              <button
                className="absolute right-0 top-0 bottom-0 m-1 bg-red-600 hover:bg-black text-white px-6 py-4 rounded-lg"
                type="submit"
              >
                Get Started
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;