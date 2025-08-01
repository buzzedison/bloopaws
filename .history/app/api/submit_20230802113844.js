// app/api/submit.js
import { config } from "dotenv";
import Airtable from "airtable";

config();

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const table = airtable.base(process.env.AIRTABLE_BASE_ID)(process.env.AIRTABLE_TABLE_NAME);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    console.log("Received email:", email); // Add this line

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    try {
      await table.create([{ fields: { Email: email } }]);
      res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
      console.error("Error during Airtable interaction:", error); // Add this line
      res.status(500).json({ error: "An error occurred while submitting the form" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}