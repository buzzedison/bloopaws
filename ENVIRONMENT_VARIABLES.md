# Environment Variables for Vanguard Application Form

## Required Variables

### Resend Email Service
```
RESEND_API_KEY=your_resend_api_key_here
```
- Get your API key from [Resend Dashboard](https://resend.com/api-keys)
- Used to send confirmation emails to applicants and internal notifications
- **Note:** Your verified domain `updates.bloopglobal.com` is already configured

### ConvertKit Integration (Optional)
```
CONVERTKIT_API_KEY=your_convertkit_api_key_here
CONVERTKIT_VANGUARD_FORM_ID=your_convertkit_form_id_here
```
- Get your API key from [ConvertKit Account Settings](https://app.convertkit.com/account_settings/advanced)
- Create a form in ConvertKit for Vanguard applicants
- Used to automatically add applicants to your email marketing lists

### Internal Notifications
```
INTERNAL_NOTIFICATION_EMAIL=ask@bloopglobal.com
```
- Email address where internal notifications about new applications will be sent
- **Currently configured:** `ask@bloopglobal.com` (hardcoded in the API route)

## Setup Instructions

1. **Resend Setup:**
   - Sign up at [resend.com](https://resend.com)
   - Verify your domain `updates.bloopglobal.com` (already configured)
   - Generate an API key
   - Add to your `.env.local` file

2. **ConvertKit Setup (Optional):**
   - Sign up at [convertkit.com](https://convertkit.com)
   - Create a form for Vanguard Program applicants
   - Get your API key and form ID
   - Add to your `.env.local` file

3. **Email Templates:**
   - The system will automatically send:
     - Confirmation email to applicants
     - Internal notification with applicant details
     - Future: Quiz links to shortlisted candidates

## Testing

To test the application form:
1. Fill out the form on `/vanguard`
2. Check that emails are sent via Resend
3. Verify applicants are added to ConvertKit (if configured)
4. Check internal notifications are received

## Security Notes

- Never commit API keys to version control
- Use different API keys for development and production
- Regularly rotate API keys
- Monitor email sending limits and costs
