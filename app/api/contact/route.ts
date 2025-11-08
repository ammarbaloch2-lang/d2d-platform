import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: `"Dare2Discover" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: 'contact@dare2discover.sa',
      subject: `D2D Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(to right, #F5A524, #D4822E); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #F5A524; }
              .value { margin-top: 5px; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">From:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${phone ? `
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${phone}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value" style="white-space: pre-wrap;">${message}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from the D2D Contact Form</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

From: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Subject: ${subject}

Message:
${message}
      `,
      replyTo: email,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Send auto-reply to customer
    const autoReplyOptions = {
      from: `"Dare2Discover" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting Dare2Discover',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(to right, #F5A524, #D4822E); color: white; padding: 20px; border-radius: 5px 5px 0 0; text-align: center; }
              .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
              .footer { text-align: center; margin-top: 20px; padding: 20px; background: #333; color: white; border-radius: 0 0 5px 5px; }
              .social-links { margin-top: 15px; }
              .social-links a { color: #F5A524; text-decoration: none; margin: 0 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">D2D - Dare2Discover</h1>
                <p style="margin: 5px 0 0 0;">Saudi Tourism Group</p>
              </div>
              <div class="content">
                <h2>Thank you for contacting us!</h2>
                <p>Dear ${name},</p>
                <p>We have received your message and appreciate you reaching out to us. Our team will review your inquiry and get back to you as soon as possible, typically within 24-48 hours.</p>
                <p><strong>Your Message Details:</strong></p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong><br>${message}</p>
                <p>If you have any urgent questions, please feel free to contact us directly at:</p>
                <ul>
                  <li>Phone: <a href="tel:+966541331211">+966 541 331 211</a></li>
                  <li>WhatsApp: <a href="https://wa.me/+966541331211">Chat with us</a></li>
                </ul>
                <p>We look forward to helping you create an unforgettable Saudi adventure!</p>
                <p>Best regards,<br><strong>The D2D Team</strong></p>
              </div>
              <div class="footer">
                <p>Follow us on social media:</p>
                <div class="social-links">
                  <a href="https://www.facebook.com/STG.krizvi">Facebook</a> |
                  <a href="https://www.instagram.com/invites/contact/?i=1ualzstv6zo2o&utm_content=2v620uk">Instagram</a> |
                  <a href="https://www.youtube.com/c/SaudiTourismGroupDaretoDiscover">YouTube</a> |
                  <a href="https://www.tiktok.com/@stgd2d">TikTok</a>
                </div>
                <p style="margin-top: 15px; font-size: 12px;">© 2024 Dare2Discover - Saudi Tourism Group</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }

    await transporter.sendMail(autoReplyOptions)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
