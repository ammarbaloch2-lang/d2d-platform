# Email Setup Guide for D2D Contact Form

The contact form on your website sends emails to `contact@dare2discover.sa` and sends an auto-reply to the customer.

## Quick Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and configure your SMTP settings

3. Restart the development server:
   ```bash
   npm run dev
   ```

## SMTP Configuration Options

### Option 1: Gmail (Recommended for Development)

1. Enable 2-Step Verification on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an App Password for "Mail"
4. Update your `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM=noreply@dare2discover.sa
```

### Option 2: Microsoft 365 / Outlook

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
SMTP_FROM=noreply@dare2discover.sa
```

### Option 3: Custom SMTP Server

Contact your email hosting provider for:
- SMTP Host
- SMTP Port
- Authentication credentials

### Option 4: SendGrid (Recommended for Production)

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API Key
3. Configure:

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_FROM=noreply@dare2discover.sa
```

### Option 5: Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-smtp-password
SMTP_FROM=noreply@dare2discover.sa
```

## Email Features

### What happens when a user submits the contact form:

1. **Email to Your Team**: An email is sent to `contact@dare2discover.sa` with:
   - Customer's name, email, and phone
   - Subject and message
   - Professional HTML formatting
   - Reply-to set to customer's email

2. **Auto-Reply to Customer**: The customer receives:
   - Confirmation that their message was received
   - Copy of their submitted message
   - Your contact information
   - Links to your social media
   - Professional D2D branding

## Testing the Contact Form

1. Fill out the contact form on your website
2. Check that you receive an email at `contact@dare2discover.sa`
3. Verify the customer receives an auto-reply
4. Test with invalid email addresses to ensure validation works

## Troubleshooting

### "Authentication failed" Error

- **Gmail**: Make sure you're using an App Password, not your regular password
- **Outlook**: Check that "Less secure app access" is enabled
- Verify SMTP_USER and SMTP_PASS are correct

### "Connection timeout" Error

- Check your SMTP_HOST and SMTP_PORT
- Verify your firewall allows outbound SMTP connections
- Try SMTP_SECURE=true with port 465

### Emails not arriving

- Check spam/junk folders
- Verify `contact@dare2discover.sa` email exists and can receive emails
- Test with a different recipient email temporarily

### Error: "Failed to send email"

- Check server logs for detailed error messages
- Verify all environment variables are set
- Ensure nodemailer is installed: `npm install nodemailer`

## Production Deployment

For production, consider using:
- **SendGrid** (99 emails/day free)
- **Mailgun** (100 emails/day free)
- **Amazon SES** (62,000 emails/month free)

These services provide better deliverability, analytics, and reliability than Gmail.

## Security Notes

- Never commit `.env.local` to git (it's already in .gitignore)
- Use strong, unique passwords
- For Gmail, always use App Passwords, never your main password
- Consider using environment-specific email addresses for testing

## Support

If you need help setting up emails, contact your hosting provider or email service support.
