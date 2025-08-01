// Import axios
"use client"
import axios from "axios";
// Import useState from react
import { useState } from "react";

//styles

const containerStyles = `px-5 py-24 mx-auto max-w-7xl`
const inputStyles = `w-full bg-gray-100 rounded-lg px-5 py-3 focus:outline-none`
const buttonStyles = `bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-200` 

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
    <div className={`${containerStyles} bg-gradient-to-r from-blue-300 to-blue-600`}>
    
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
          className={inputStyles}
        />

        <button className={buttonStyles}>
          Get Started
        </button>

      </form>
    </div>
    </div>
  );
};

export default Hero;
