import { Airtable } from 'airtable';

const sendToAirtable = async (email) => {
  // Configure airtable with your API key and base ID
  Airtable.configure({
    apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
    baseId: process.env.AIRTABLE_BASE_ID,
  });

  // Create a new Airtable record
  const record = await airtable.table(process.env.AIRTABLE_TABLE_NAME).create({
    fields: {
      Email: email,
    },
  });

  // Return the record
  return record;
};

export default sendToAirtable;
