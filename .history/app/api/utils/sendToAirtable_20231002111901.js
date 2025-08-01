import axios from "axios";

const sendToAirtable = async (email) => {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

  const airtableURL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  };

  const data = {
    fields: {
      Email: email,
    },
  };

  try {
    const response = await axios.post(airtableURL, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error sending email to Airtable:", error);
    throw error;
  }
};

export default sendToAirtable;
