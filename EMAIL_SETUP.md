# Email Setup for Creator Nominations

## Current Status

The creator nomination form is now set up to send submissions to `nominations@dailydoseofwarhammer.com`. The API endpoint is ready, but you'll need to configure an email service to actually send the emails.

## Quick Setup Options

### Option 1: Resend (Recommended - Free tier available)

1. **Sign up**: Go to [resend.com](https://resend.com)
2. **Get API Key**: Create an account and get your API key
3. **Install**: `npm install resend`
4. **Add to .env.local**:
   ```
   RESEND_API_KEY=your_api_key_here
   ```

5. **Update API endpoint** (`app/api/nominations/route.ts`):
   ```typescript
   import { Resend } from 'resend'
   
   const resend = new Resend(process.env.RESEND_API_KEY)
   
   // Replace the commented email service code with:
   await resend.emails.send({
     from: 'noreply@dailydoseofwarhammer.com',
     to: 'nominations@dailydoseofwarhammer.com',
     subject: emailSubject,
     text: emailBody,
     replyTo: submitterEmail
   })
   ```

### Option 2: SendGrid

1. **Sign up**: Go to [sendgrid.com](https://sendgrid.com)
2. **Get API Key**: Create account and generate API key
3. **Install**: `npm install @sendgrid/mail`
4. **Add to .env.local**:
   ```
   SENDGRID_API_KEY=your_api_key_here
   ```

5. **Update API endpoint**:
   ```typescript
   import sgMail from '@sendgrid/mail'
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
   
   await sgMail.send({
     to: 'nominations@dailydoseofwarhammer.com',
     from: 'noreply@dailydoseofwarhammer.com',
     subject: emailSubject,
     text: emailBody,
     replyTo: submitterEmail
   })
   ```

### Option 3: Nodemailer (SMTP)

1. **Install**: `npm install nodemailer`
2. **Add to .env.local**:
   ```
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   ```

3. **Update API endpoint**:
   ```typescript
   import nodemailer from 'nodemailer'
   
   const transporter = nodemailer.createTransporter({
     host: process.env.SMTP_HOST,
     port: parseInt(process.env.SMTP_PORT!),
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS
     }
   })
   
   await transporter.sendMail({
     from: 'noreply@dailydoseofwarhammer.com',
     to: 'nominations@dailydoseofwarhammer.com',
     subject: emailSubject,
     text: emailBody,
     replyTo: submitterEmail
   })
   ```

## What's Already Working

✅ **Form Validation**: Required fields, email format validation  
✅ **API Endpoint**: `/api/nominations` ready to receive submissions  
✅ **Error Handling**: Proper error responses and logging  
✅ **Email Template**: Professional email format with all form data  
✅ **User Feedback**: Success/error messages in the form  

## Email Template Preview

The emails sent to `nominations@dailydoseofwarhammer.com` will look like:

```
Subject: New Creator Nomination: [Creator Name]

New Creator Nomination Received

Creator Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Creator Name: Midwinter Minis

Social Links:
• YouTube: https://youtube.com/@midwinterminis
• Instagram: https://instagram.com/midwinterminis
• Website: https://midwinterminis.com

Why They're Great:
Amazing painting tutorials with clear instructions and great personality. 
They make complex techniques accessible to beginners while still being 
valuable for experienced painters.

Submission Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted by: user@example.com
Submitted at: January 15, 2024 at 10:30:45 UTC

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This nomination was submitted through the Daily Dose of Warhammer website.
```

## Next Steps

1. Choose an email service (Resend recommended for simplicity)
2. Sign up and get API credentials
3. Add credentials to your environment variables
4. Update the API endpoint with the email service code
5. Test the form submission

The form is ready to go - you just need to plug in your preferred email service!
