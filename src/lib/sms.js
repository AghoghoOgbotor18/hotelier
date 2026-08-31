function formatPhoneForTwilio(phone) {
    const digits = phone.replace(/\D/g, ''); // strip spaces, existing +, etc.
    if (digits.startsWith('234')) return `+${digits}`;
    if (digits.startsWith('0')) return `+234${digits.slice(1)}`;
    return `+${digits}`;
}

export async function sendBookingConfirmationSms({
    guestPhone,
    bookingCode,
    roomName,
    roomNumber,
    }) {
    const message =
        `Hotelier: Booking confirmed! ID ${bookingCode}, ${roomName} (Room ${roomNumber}). ` +
        `Show this text or give your name at the front desk to check in.`;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    const body = new URLSearchParams({
        To: formatPhoneForTwilio(guestPhone),
        From: fromNumber,
        Body: message,
    });

    const res = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
        method: 'POST',
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
        }
    );

    const data = await res.json();
    if (!res.ok) {
        // Twilio's error messages are usually specific and useful — e.g.
        // "The number ... is unverified" on a trial account, which is
        // the most common thing you'll hit while testing.
        throw new Error(data.message || 'Twilio SMS send failed');
    }
    return data;
}