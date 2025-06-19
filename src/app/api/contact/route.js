import { NextResponse } from 'next/server';
import twilio from 'twilio';
import nodemailer from 'nodemailer';
import { addMessage } from '@/lib/contactUtils';

// Initialize Twilio client only if credentials are available
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

// Email transporter only if credentials are available
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store message in our system
    const savedMessage = addMessage({ name, email, phone, subject, message });

    // Send SMS notification
    let smsSent = false;
    let smsError = null;
    try {
      if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
        await twilioClient.messages.create({
          body: `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\nMessage: ${message}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: '+919890602225', // Your target phone number
        });
        smsSent = true;
      } else {
        console.log('SMS not sent: Twilio credentials not configured');
      }
    } catch (error) {
      console.error('SMS sending failed:', error);
      smsError = error.message;
      // Continue with email even if SMS fails
    }

    // Send email notification
    let emailSent = false;
    let emailError = null;
    try {
      if (transporter) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'mumbai@kalikafurniture.com', // Your business email
          subject: `New Contact Form: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Message ID: ${savedMessage.id}</small></p>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } else {
        console.log('Email not sent: Email credentials not configured');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      emailError = error.message;
    }

    // Always return success if message is stored, even if notifications fail
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully. We will get back to you soon!',
        data: {
          messageId: savedMessage.id,
          smsSent,
          emailSent,
          smsError: smsError || null,
          emailError: emailError || null
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 