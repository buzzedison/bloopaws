import airtable from 'airtable';

const sendToAirtable = async (email) => {
  // Create a new instance of Airtable
  const airtableInstance = airtable();

  // Configure airtable with your API key and base ID
  airtableInstance.configure({
    apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
    baseId: process.env.AIRTABLE_BASE_ID,
  });

  // Create a new Airtable record
  try {
    const record = await airtableInstance.table(process.env.AIRTABLE_WEBSITE_FORM).create({
      fields: {
        Email: email,
      },
    });

    // Log the success message
    console.log("Data sent to Airtable successfully:", record);

    // Return the record
    return record;
  } catch (error) {
    // Log the error with more details
    console.error("Error while sending data to Airtable:", error.message, error.stack);

    // Rethrow the error to be handled by the calling function
    throw error;
  }
};

export default sendToAirtable;