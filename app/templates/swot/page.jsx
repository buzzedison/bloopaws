"use client";

import React, { useState } from "react";

const SWOTAnalysis = () => {
  const [companyName, setCompanyName] = useState("");
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [opportunities, setOpportunities] = useState("");
  const [threats, setThreats] = useState("");

  const handleSubmit = () => {
    // Handle submission to back-end here...
  };

  return (
    <div className="p-8">
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Strengths"
        value={strengths}
        onChange={(e) => setStrengths(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Weaknesses"
        value={weaknesses}
        onChange={(e) => setWeaknesses(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Opportunities"
        value={opportunities}
        onChange={(e) => setOpportunities(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Threats"
        value={threats}
        onChange={(e) => setThreats(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default SWOTAnalysis;
