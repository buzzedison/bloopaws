# AI Chatbot Setup Instructions

Your OpenAI-powered chatbot with lead capture has been installed! Follow these steps to get it running:

## 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-`)

## 2. Configure Resend for Email (Lead Capture)

1. Go to [Resend](https://resend.com/api-keys)
2. Create an account if needed
3. Get your API key
4. **(Optional)** Create an audience at [Resend Audiences](https://resend.com/audiences)
5. **(Important)** Verify your domain in Resend to send emails from your domain

**Note:** Without domain verification, emails will be sent from Resend's testing domain and may not be delivered reliably.

## 3. Add API Keys to Environment Variables

Add these lines to your `.env` file:

```bash
# Required
OPENAI_API_KEY=sk-your-actual-api-key-here
RESEND_API_KEY=re-your-resend-api-key-here

# Optional - only if you want to save contacts to an audience
RESEND_AUDIENCE_ID=your-audience-id-here
```

**Important:** Never commit your `.env` file to git. It should already be in `.gitignore`.

## 3. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and you'll see the chat button in the bottom right corner!

## 4. Deployment (Vercel, Netlify, etc.)

Add the `OPENAI_API_KEY` environment variable in your hosting platform's dashboard:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables

## What's Been Added

### Files Created:
- `app/api/chat/route.ts` - API endpoint that handles chat requests
- `app/api/save-contact/route.ts` - API endpoint that saves contacts to Resend
- `app/api/send-followup/route.ts` - API endpoint that sends follow-up emails
- `app/components/ChatBot.tsx` - Floating chat widget UI component with lead capture
- `.env.example` - Example environment variables file

### Files Modified:
- `app/layout.js` - Added ChatBot component (replaced TidioChat)
- `package.json` - Added OpenAI SDK dependency

## Features

### 🎯 Lead Capture
- Visitors provide their name and email before chatting
- Contact info is automatically saved to Resend
- Contacts are added to your Resend audience (if configured)

### 📧 Automated Emails
- **Welcome Email**: Sent immediately when visitor starts chatting
- **Follow-up Email**: Sent when visitor closes the chat
- **Internal Notification**: Your team gets notified of new leads at ask@bloopglobal.com

### 💬 Smart AI Assistant
- Answers questions about Bloop services
- Personalized conversation using visitor's name
- Encourages leads to contact your team

## Customization Options

### Change the AI Model (in `app/api/chat/route.ts`)
- `gpt-4o-mini` (default) - Fast and cost-effective (~$0.15 per 1M input tokens)
- `gpt-4o` - More capable but pricier (~$2.50 per 1M input tokens)
- `gpt-3.5-turbo` - Fastest and cheapest (~$0.50 per 1M tokens)

### Customize the Chatbot Context
Edit the `BLOOP_CONTEXT` variable in `app/api/chat/route.ts` to:
- Add more company information
- Include pricing details
- Add FAQs
- Adjust the tone and personality

### Style the Chat Widget
Modify colors, sizing, and animations in `app/components/ChatBot.tsx`

### Customize Email Templates
Edit the email content in:
- `app/api/save-contact/route.ts` - Welcome email sent when chat starts
- `app/api/send-followup/route.ts` - Follow-up email sent when chat ends

### Update Email Sender
Replace `noreply@bloopglobal.com` with your verified domain in both email API routes

### Configure Resend Audience (Optional)
Add `RESEND_AUDIENCE_ID` to `.env` to automatically save contacts to a specific audience

## Cost Estimation

### OpenAI Costs
Based on typical usage with `gpt-4o-mini`:
- **Small site** (100 conversations/month): ~$2-5/month
- **Medium site** (500 conversations/month): ~$10-20/month
- **High traffic** (2000+ conversations/month): ~$50-100/month

### Resend Costs
- **Free tier**: 3,000 emails/month, 100 contacts
- **Pro tier**: $20/month for 50,000 emails, unlimited contacts

**Total estimated cost**: $5-40/month depending on traffic

Using `gpt-4o-mini` and Resend's free tier keeps costs very low!

## Troubleshooting

### Chat not appearing?
- Check that you added the API key to `.env`
- Restart your development server
- Check browser console for errors

### "OpenAI API key not configured" error?
- Make sure `OPENAI_API_KEY` is in your `.env` file
- Restart the dev server after adding the key

### Slow responses?
- Consider switching to `gpt-3.5-turbo` for faster responses
- Check your internet connection
- Verify OpenAI API status: [status.openai.com](https://status.openai.com)

### Emails not sending?
- Verify your `RESEND_API_KEY` is correct in `.env`
- Check that your domain is verified in Resend
- Update the `from` email addresses in the API routes to use your verified domain
- Check Resend logs at [resend.com/logs](https://resend.com/logs)

### Contact form shows but emails fail?
- The chat will still work even if emails fail
- Check browser console for errors
- Verify Resend API key is valid
- Make sure you're not exceeding Resend's free tier limits

### How to test emails locally?
- Use Resend's testing domain (works without verification)
- Or add your test email to Resend's verified senders
- Check the email arrives in spam folder if not in inbox

## Important Setup Notes

### Domain Verification in Resend
1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain (e.g., `bloopglobal.com`)
3. Add the DNS records Resend provides
4. Wait for verification (can take a few minutes to 24 hours)
5. Update the `from` email in both API routes to use your verified domain

Example:
```typescript
from: 'Bloop Global <noreply@bloopglobal.com>'
```

### Creating a Resend Audience (Optional)
1. Go to [Resend Audiences](https://resend.com/audiences)
2. Click "Create Audience"
3. Copy the Audience ID
4. Add to `.env`: `RESEND_AUDIENCE_ID=your-audience-id-here`

This lets you segment and manage your chatbot leads separately!

## Support

Questions? Email: ask@bloopglobal.com
