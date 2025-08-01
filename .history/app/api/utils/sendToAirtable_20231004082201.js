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
  const record = await airtableInstance.table(process.env.AIRTABLE_WEBSITE_FORM).create({
    fields: {
      Email: email,
    },
  });

  // Return the record
  return record;
};

export default sendToAirtable;