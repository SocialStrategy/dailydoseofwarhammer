import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { creatorName, youtubeLink, instagramLink, websiteLink, whyGreat, submitterEmail } = body

    // Validate required fields
    if (!creatorName || !whyGreat || !submitterEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(submitterEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create email content
    const emailSubject = `New Creator Nomination: ${creatorName}`
    const emailBody = `
New Creator Nomination Received

Creator Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Creator Name: ${creatorName}

Social Links:
• YouTube: ${youtubeLink || 'Not provided'}
• Instagram: ${instagramLink || 'Not provided'}
• Website: ${websiteLink || 'Not provided'}

Why They're Great:
${whyGreat}

Submission Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted by: ${submitterEmail}
Submitted at: ${new Date().toLocaleString('en-US', { 
  timeZone: 'UTC',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})} UTC

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This nomination was submitted through the Daily Dose of Warhammer website.
    `.trim()

    // Send email using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your gmail address
        pass: process.env.SMTP_PASS  // your app password
      }
    })

    await transporter.sendMail({
      from: `"Daily Dose of Warhammer" <${process.env.SMTP_USER}>`,
      to: 'nominations@dailydoseofwarhammer.com',
      subject: emailSubject,
      text: emailBody,
      replyTo: submitterEmail
    })

    console.log('Creator nomination email sent successfully:', {
      creatorName,
      submitterEmail,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Nomination submitted successfully' 
    })

  } catch (error) {
    console.error('Error processing nomination:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
