import nodemailer from 'nodemailer';

// Using Gmail SMTP instead of Resend for this project — Resend's
// free-tier sandbox domain only allows sending to the account
// owner's own email, which blocks real recruiters/testers from
// receiving a confirmation to their own inbox. Gmail SMTP sends to
// anyone, at the cost of a small disclaimer in the email itself (see
// below) being honest about it being a personal account, not a
// verified business domain.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
    });

    export async function sendBookingConfirmationEmail({
    guestName,
    guestEmail,
    bookingCode,
    roomName,
    roomNumber,
    checkIn,
    checkOut,
    }) {
    const firstName = (guestName || 'there').split(' ')[0];

    await transporter.sendMail({
        from: `"Hotelier" <${process.env.GMAIL_USER}>`,
        to: guestEmail,
        subject: `Booking confirmed — ${bookingCode}`,
        html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
            <h2 style="color:#0D0D10;">Hi ${firstName}, you're all set.</h2>
            <p>Your room is confirmed at Hotelier.</p>
            <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding:8px 0; color:#6B6455;">Booking ID</td><td style="padding:8px 0; font-family: monospace; font-weight:bold;">${bookingCode}</td></tr>
            <tr><td style="padding:8px 0; color:#6B6455;">Room</td><td style="padding:8px 0;">${roomName} &mdash; Room ${roomNumber}</td></tr>
            <tr><td style="padding:8px 0; color:#6B6455;">Check-in</td><td style="padding:8px 0;">${checkIn}</td></tr>
            <tr><td style="padding:8px 0; color:#6B6455;">Check-out</td><td style="padding:8px 0;">${checkOut}</td></tr>
            </table>
            <p>Show this email or just give your name and Booking ID at the front desk to check in.</p>
            <hr style="border:none; border-top:1px solid #eee; margin:24px 0;" />
            <p style="color:#9a9488; font-size:11px; line-height:1.5;">
            Hotelier is a portfolio/case-study project, not a real hotel booking. This
            email was sent via a personal Gmail account rather than a verified business
            domain, since this project doesn't have one yet — sent purely to demonstrate
            the booking flow working end to end.
            </p>
        </div>
        `,
    });
}