// Import axios
"use client"
import axios from "axios";
// Import useState from react
import { useState } from "react";

const containerStyles = `px-5 py-24 mx-auto max-w-7xl`

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
    console.log("Submitting form with email:", email);
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");

    try {
      // Use axios to make a POST request
      const response = await axios.post("/app/api/submit.js", { email });
      console.log("Server response:", response);
      console.log("Response status:", response.status);
      if (response.status === 200) {
        setMessage("Form submitted successfully");
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      // Catch any errors
      console.error("Error during form submission:", error);
      setMessage("An error occurred while submitting the form");
    }
  };

  return (
    <div className="bg-gray-100 py-24">
      <div className="container mx-auto">
      <h1 className="hero-title">
  Grow Your Business with <br />
  <span className="mt-4 font-extrabold">
    Our <i className="text-red-600">Digital </i>and{" "}
    <i className="text-red-600">Consulting</i> Services
  </span>
</h1>
<p className="hero-subtitle">
  From Business Development to Web Development,
  <br /> Our Digital and Consulting Experts Help Move You Business Forward
</p>
<div className="flex justify-center mt-6">
  <form className="max-w-screen-lg" onSubmit={(e) => handleSubmit(e)}>
    <div className="relative w-full">
      <input
        className="hero-input"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <p className="text-red-600">{emailError}</p>}
      <button className="hero-button" type="submit">
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
