"use client"
import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  interest: '',
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Submitting...');

    const payload = {
      api_key: process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY,
      email: formData.email,
      first_name: formData.name,
      fields: {
        phone: formData.phone,
        message: formData.message,
        interest: formData.interest,
      },
    };

    try {
      const res = await fetch(`https://api.convertkit.com/v3/forms/${process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to subscribe');
      }

      const data = await res.json();
      if (data.subscription.state === 'inactive') {
        setSubmitStatus('Message Sent! Thank you for contacting us. We will get back to you ASAP');
      } else {
        setSubmitStatus('Email sent successfully!');
      }

      // Reset the form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        interest: '',
      });

    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('Failed to submit. Please try again later.');
    }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-red-200">
      <div className="mt-2 md:mt-24 bg-rose-700 p-8 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-2xl mb-4 font-semibold">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">What are you interested in?</label>
            <select
              name="interest"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="" disabled className="text-black">Select interest</option>
              <option value="Consulting">Getting Investment</option>
              <option value="Mobile App">Investing in startups</option>
              <option value="Website Design">Receiving donations</option>
              <option value="Funding">Donating to startups</option>
            </select>
          </div>
          <button type="submit" className="bg-red-200 text-black p-2 rounded">
            Submit
          </button>
        </form>
        {submitStatus && <div className="submit-status mt-4">{submitStatus}</div>}
      </div>
    </div>
  );
}
