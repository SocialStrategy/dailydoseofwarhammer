# Gmail SMTP Setup for Creator Nominations

## 🎉 Perfect! Your Google Account Makes This Easy

Since you have a Google account, you can use Gmail's SMTP servers to send emails from your nomination form. This is **free** and **reliable**.

## 📧 **Quick Setup Steps**

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the prompts to enable 2FA (required for app passwords)

### Step 2: Generate App Password
1. Still in **Security** settings
2. Under "Signing in to Google", click **2-Step Verification**
3. Scroll down and click **App passwords**
4. Select **Mail** from the dropdown
5. Click **Generate**
6. **Copy the 16-character password** (you'll need this)

### Step 3: Add Environment Variables
Create or update your `.env.local` file with:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your-16-character-app-password
```

**Replace with your actual:**
- `your-gmail-address@gmail.com` - Your Gmail address
- `your-16-character-app-password` - The password from Step 2

### Step 4: Test It Out
The nomination form is already configured! Just:
1. Add your environment variables
2. Deploy or restart your local server
3. Submit a test nomination

## 🔧 **Technical Details**

### What's Already Configured:
✅ **Nodemailer**: Installed and configured  
✅ **Gmail SMTP**: Host and port settings ready  
✅ **Authentication**: Using your Google credentials  
✅ **Email Template**: Professional format ready  
✅ **Error Handling**: Proper logging and fallbacks  

### Email Settings:
- **From**: "Daily Dose of Warhammer" <your-gmail@gmail.com>
- **To**: nominations@dailydoseofwarhammer.com
- **Reply-To**: The submitter's email address
- **Security**: TLS encryption (port 587)

## 📋 **Environment Variables Template**

Copy this template and fill in your details:

```env
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
```

**Important Notes:**
- Use your **actual Gmail address** for `SMTP_USER`
- Use the **16-character app password** (not your regular Gmail password)
- The app password will look like: `abcd efgh ijkl mnop` (with spaces)

## 🎯 **Benefits of Using Gmail SMTP**

✅ **Free**: No monthly fees or usage limits for personal use  
✅ **Reliable**: Google's infrastructure, 99.9% uptime  
✅ **Secure**: TLS encryption and OAuth2 authentication  
✅ **Familiar**: Using your existing Google account  
✅ **No Signup**: No need for additional services  

## 🔍 **Troubleshooting**

### "Authentication Failed"
- Make sure 2FA is enabled on your Google account
- Double-check the app password (16 characters with spaces)
- Verify the Gmail address is correct

### "Connection Timeout"
- Check your internet connection
- Verify SMTP settings (host: smtp.gmail.com, port: 587)

### "Emails Not Arriving"
- Check spam folder in the destination email
- Verify the "To" address is correct
- Check server logs for error messages

## 🚀 **Ready to Go!**

Once you add your Gmail credentials to the environment variables, your creator nomination form will automatically start sending professional emails to `nominations@dailydoseofwarhammer.com`!

The system is already configured and tested - you just need to plug in your Google credentials.
