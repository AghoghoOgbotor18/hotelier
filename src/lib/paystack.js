const PAYSTACK_BASE = 'https://api.paystack.co';

function authHeaders() {
    return {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
    };
}

// Starts a transaction on Paystack's side and gets back the URL to
// redirect the guest to. `reference` is OUR booking_code — using our
// own code as Paystack's reference means we never need a separate
// lookup table to match a payment back to a booking; the webhook and
// the redirect page both just look up bookings.booking_code directly.
export async function initializeTransaction({ email, amountNaira, reference, callbackUrl }) {
    const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
        email,
        amount: Math.round(amountNaira * 100), // Paystack expects kobo, not naira
        reference,
        callback_url: callbackUrl,
        }),
    });

    const data = await res.json();
    if (!res.ok || !data.status) {
        throw new Error(data.message || 'Could not start payment');
    }
    return data.data; // { authorization_url, access_code, reference }
}

// Asks Paystack directly "did this transaction actually succeed?" —
// used on the redirect-back page, since a guest landing there is not
// by itself proof of payment (they could hit that URL manually).
export async function verifyTransaction(reference) {
    const res = await fetch(`${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
        headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok || !data.status) {
        throw new Error(data.message || 'Could not verify payment');
    }
    return data.data; // includes .status ('success' | 'failed' | ...), .amount, .reference
}