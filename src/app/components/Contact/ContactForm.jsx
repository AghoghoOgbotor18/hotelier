'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState('idle'); // idle | submitted
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitted');
    }

    if (status === 'submitted') {
        return (
        <div className="rounded-md border border-brass/30 bg-white p-8 text-center">
            <div className="font-display text-xl text-ink">Message sent</div>
            <p className="mt-2 font-sans text-sm text-stone">
            Thanks, {form.name.split(' ')[0] || 'there'} — our front desk will get back to
            you shortly.
            </p>
        </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-xs text-stone">
                Full Name
                <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="rounded-sm border border-ink/35 px-4 py-3 font-sans text-sm text-ink outline-none focus:border-brass"
                />
                </label>
                <label className="flex flex-col gap-1.5 text-xs text-stone">
                Email
                <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="rounded-sm border border-ink/35 px-4 py-3 font-sans text-sm text-ink outline-none focus:border-brass"
                />
                </label>
            </div>

            <label className="flex flex-col gap-1.5 text-xs text-stone">
                Subject
                <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="rounded-sm border border-ink/35 px-4 py-3 font-sans text-sm text-ink outline-none focus:border-brass"
                />
            </label>

            <label className="flex flex-col gap-1.5 text-xs text-stone">
                Message
                <textarea
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                className="resize-none rounded-sm border border-ink/35 px-4 py-3 font-sans text-sm text-ink outline-none focus:border-brass"
                />
            </label>

            <button
                type="submit"
                className="mt-2 self-start rounded-sm bg-ink px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-ivory transition hover:bg-brass hover:text-ink"
            >
                Send Message
            </button>
        </form>
    );
}