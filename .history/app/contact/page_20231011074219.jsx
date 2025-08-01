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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the form data to your email using a backend service.
    console.log('Form submitted:', formData);
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
              <option value="Development">Development</option>
              <option value="Design">Design</option>
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

