"use server"
import { NextApiRequest, NextApiResponse } from 'next'
import sendToAirtable from '../utils/sendToAirtable'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get the email from the request body
    const { email } = req.body

    // Validate the email
    if (!email || typeof email !== 'string') {
      throw new Error('Invalid email')
    }

    // Send the email to Airtable
    const record = await sendToAirtable(email)

    // Send back a success response
    res.status(200).json({ message: 'Email sent to Airtable successfully', record })
  } catch (error) {
    // Send back an error response
    res.status(500).json({ message: 'Error sending email to Airtable', error })
  }
}
