"use client"
import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Construct the payload
    const payload = {
      api_key: process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY,
      email: formData.email,
      first_name: formData.name,
      fields: {
        phone: formData.phone,
        message: formData.message,
        service: formData.service,
      },
    };
  
    try {
      // Send the payload to ConvertKit
      const res = await fetch(`https://api.convertkit.com/v3/forms/${process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        // Handle error
        console.error('Failed to subscribe:', await res.text());
        return;
      }
  
      // Handle success
      console.log('Successfully subscribed:', await res.json());
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-red-200">
      <div className="mt-2 md:mt-24 bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2">
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
            <label className="block text-sm mb-2">Service</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>Select a service</option>
              <option value="Consulting">Consulting</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Website Design">Website Design</option>
              <option value="Funding">Funding</option>
            </select>
          </div>
          <button type="submit" className="bg-red-700 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

