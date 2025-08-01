import { airtable } from "airtable";

const sendToAirtable = async (email) => {
  const airtable = new Airtable({
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