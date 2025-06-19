# Contact API Integration Guide

This guide explains how to set up and use the dynamic contact API system with SMS and email notifications.

## Features

- ✅ Dynamic contact form submission with API integration
- ✅ SMS notifications sent directly to +918668232452
- ✅ Email notifications to business email
- ✅ Dynamic store location management
- ✅ Contact message management system
- ✅ Real-time form validation and error handling
- ✅ Loading states and user feedback

## API Endpoints

### 1. Contact Form Submission
- **POST** `/api/contact`
- Submits contact form and sends SMS/email notifications

### 2. Store Management
- **GET** `/api/contact/stores` - Fetch all active stores
- **POST** `/api/contact/stores` - Add new store
- **PUT** `/api/contact/stores` - Update existing store
- **DELETE** `/api/contact/stores?id={id}` - Soft delete store

### 3. Message Management
- **GET** `/api/contact/messages` - Fetch contact messages with pagination
- **POST** `/api/contact/messages` - Mark message as read/unread
- **DELETE** `/api/contact/messages?id={id}` - Delete message

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `env.example` to `.env.local` and configure:

```bash
# Twilio Configuration for SMS
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here

# Email Configuration (Gmail)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password_here

# Target phone number for SMS notifications
TARGET_PHONE_NUMBER=+918668232452

# Business email for notifications
BUSINESS_EMAIL=mumbai@kalikafurniture.com
```

### 3. Twilio Setup
1. Sign up for a Twilio account at https://www.twilio.com
2. Get your Account SID and Auth Token from the Twilio Console
3. Purchase a phone number for sending SMS
4. Add these credentials to your `.env.local` file

### 4. Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use this app password in your `.env.local` file

## Usage Examples

### Adding a New Store
```javascript
const newStore = {
  name: "Mumbai Store",
  address: "123 Main Street, Mumbai, Maharashtra",
  phone: "+91 9876543210",
  email: "mumbai@kalikafurniture.com",
  hours: "10:00 AM - 8:00 PM",
  image: "https://example.com/store-image.jpg",
  coordinates: {
    lat: 19.0760,
    lng: 72.8777
  }
};

const response = await fetch('/api/contact/stores', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newStore)
});
```

### Fetching Contact Messages
```javascript
// Get all messages
const response = await fetch('/api/contact/messages');

// Get unread messages with pagination
const response = await fetch('/api/contact/messages?status=unread&page=1&limit=10');
```

### Marking Message as Read
```javascript
const response = await fetch('/api/contact/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messageId: '1234567890',
    status: 'read'
  })
});
```

## SMS Message Format

When a contact form is submitted, an SMS is sent to +918668232452 with the following format:

```
New Contact Form Submission:

Name: John Doe
Email: john@example.com
Phone: +91 9876543210
Subject: Product Inquiry
Message: I'm interested in your furniture collection...
```

## Email Notification Format

A formatted HTML email is sent to the business email with:
- Contact form details
- Message ID for tracking
- Professional formatting

## Error Handling

The system includes comprehensive error handling:
- Form validation on both frontend and backend
- Graceful fallbacks if SMS/email services fail
- User-friendly error messages
- Loading states and success feedback

## Security Features

- Input validation and sanitization
- Environment variable protection
- CORS protection
- Rate limiting (can be added)

## Database Integration

Currently using in-memory storage. To integrate with a database:

1. Replace the in-memory arrays in the API routes
2. Add your database connection (MongoDB, PostgreSQL, etc.)
3. Update the CRUD operations to use your database

## Testing

Test the contact form by:
1. Filling out the form on the contact page
2. Checking your phone for SMS notification
3. Checking your email for notification
4. Verifying the message appears in the messages API

## Troubleshooting

### SMS Not Working
- Verify Twilio credentials are correct
- Check if the phone number is verified in Twilio
- Ensure you have sufficient Twilio credits

### Email Not Working
- Verify Gmail credentials
- Check if 2FA is enabled and app password is correct
- Ensure the email address is correct

### API Errors
- Check browser console for error messages
- Verify all environment variables are set
- Check server logs for detailed error information

## Support

For issues or questions, check the server logs and browser console for detailed error messages. 