import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Sent once a booking actually moves to 'confirmed' — never on
// creation, since a 'pending' booking might never get paid for.
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

    await resend.emails.send({
        from: 'Hotelier <onboarding@resend.dev>',
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
            <p style="color:#6B6455; font-size:13px;">Hotelier &middot; Port Harcourt</p>
        </div>
        `,
    });
}