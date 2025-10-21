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
CONVERTKIT_BUILD_SHEET_FORM_ID=your_convertkit_build_sheet_form_id_here
```
- Get your API key from [ConvertKit Account Settings](https://app.convertkit.com/account_settings/advanced)
- Create forms in ConvertKit for Vanguard applicants and Build Sheet subscribers
- Used to automatically add applicants and newsletter subscribers to your email marketing lists

### Supabase Database
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```
- Get these from your [Supabase Dashboard](https://app.supabase.com)
- Used to store applications, quiz results, and manage application workflow
- `SUPABASE_SERVICE_ROLE_KEY` is for server-side operations (keep secret)

### Internal Notifications
```
INTERNAL_NOTIFICATION_EMAIL=ask@bloopglobal.com
```
- Email address where internal notifications about new applications will be sent
- **Currently configured:** `ask@bloopglobal.com` (hardcoded in the API route)

## Setup Instructions

1. **Supabase Setup:**
   - Sign up at [supabase.com](https://supabase.com)
   - Create a new project
   - Go to Settings > API to get your URL and keys
   - Run the SQL migration in `supabase/migrations/001_create_applications_table.sql`
   - Add to your `.env.local` file

2. **Resend Setup:**
   - Sign up at [resend.com](https://resend.com)
   - Verify your domain `updates.bloopglobal.com` (already configured)
   - Generate an API key
   - Add to your `.env.local` file

3. **ConvertKit Setup (Optional):**
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

To test the complete application system:
1. Fill out the form on `/vanguard`
2. Check that application is saved to Supabase
3. View application in admin dashboard at `/admin/applications`
4. Check that emails are sent via Resend
5. Verify applicants are added to ConvertKit (if configured)
6. Check internal notifications are received
7. Approve application in admin dashboard
8. Send quiz invitation from `/admin/quiz-invitations`
9. Complete quiz and check results in database

## Security Notes

- Never commit API keys to version control
- Use different API keys for development and production
- Regularly rotate API keys
- Monitor email sending limits and costs
