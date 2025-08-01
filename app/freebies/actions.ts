"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ApplicationData = {
  name: string;
  businessName: string;
  description: string;
  email: string;
  phone: string;
};

export async function submitApplication(data: ApplicationData) {
  try {
    // Send notification email to admin
    await resend.emails.send({
      from: 'Freebies Application <no-reply@updates.bloopglobal.com>',
      to: ['ask@bloopglobal.com'],
      subject: `New Website Application: ${data.businessName}`,
      html: `
        <h1>New Website Application</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Business:</strong> ${data.businessName}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
      `,
    });

    // Send confirmation email to applicant
    await resend.emails.send({
      from: 'Your Website Application <no-reply@updates.bloopglobal.com>',
      to: data.email,
      subject: 'We received your application!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5; text-align: center;">Application Received!</h1>
          
          <p>Hi ${data.name},</p>
          
          <p>Thank you for applying for our free website and workspace offer. We've received your application for ${data.businessName}.</p>
          
          <p>Our team will review your submission and get back to you within 3-5 business days.</p>
          
          <div style="background-color: #FEF9C3; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h2 style="color: #854D0E; margin-top: 0;">Don't Want to Wait?</h2>
            <p>Get your professional website built this week at 50% off our regular price.</p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/freebies/thank-you" style="display: inline-block; background-color: #DC2626; color: white; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Claim This Offer</a>
          </div>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>The Team</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to submit application');
  }
} 