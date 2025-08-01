// app/api/submit.js
import { config } from "dotenv";
import axios from "axios"; // Import axios

config();

// Create a custom axios instance
const api = axios.create({
  baseURL: "https://api.airtable.com/v0/appN08604EcWr0e4L",
  headers: {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    console.log("Received email:", email);

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    try {
      // Use the custom axios instance to make a POST request
      await api.post(`${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`, {
        fields: { Email: email },
      });
      res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
      // Catch any errors
      console.error("Error during Airtable interaction:", error);
      res.status(500).json({ error: "An error occurred while submitting the form" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
