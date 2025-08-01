// app/api/submit.js
import { config } from "dotenv";
import axios from "axios"; // Import axios

config();

// Create a custom axios instance
const api = axios.create({
  baseURL: "https://api.airtable.com/v0/appfZJKGAHUVcffJL.",
  headers: {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export default async function handler(request) { // Remove NextRequest type
  if (request.method === "POST") {
    const { email } = await request.json(); // Use request.json() method to parse the request body
    console.log("Received email:", email);

    if (!email) {
      return new NextResponse( // Use new NextResponse() constructor to create a response
        JSON.stringify({ error: "Email is required" }),
        { status: 400 }
      );
    }

    try { // Add try block
      // Use the custom axios instance to make a POST request with await keyword
      const response = await api.post(`${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`, {
        fields: { Email: email },
      });
      return new NextResponse( // Use new NextResponse() constructor to create a response
        JSON.stringify({ message: "Form submitted successfully" }),
        { status: 200 }
      );
    } catch (error) { // Add catch block
      // Catch any errors
      console.error("Error during Airtable interaction:", error);
      return new NextResponse( // Use new NextResponse() constructor to create a response
        JSON.stringify({ error: "An error occurred while submitting the form" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse( // Use new NextResponse() constructor to create a response
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405 }
    );
  }
}
