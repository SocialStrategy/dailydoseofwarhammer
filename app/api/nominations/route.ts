import { NextRequest, NextResponse } from 'next/server'

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

    // Here you would typically use a service like SendGrid, Nodemailer, or Resend
    // For now, we'll log the submission and return success
    console.log('Creator Nomination Received:', {
      creatorName,
      submitterEmail,
      timestamp: new Date().toISOString()
    })

    // In a production environment, you would send the email here
    // Example with a hypothetical email service:
    /*
    await emailService.send({
      to: 'nominations@dailydoseofwarhammer.com',
      subject: emailSubject,
      text: emailBody,
      replyTo: submitterEmail
    })
    */

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
