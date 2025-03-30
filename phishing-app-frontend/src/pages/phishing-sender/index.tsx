import { useState } from "react";

export default function PhishingSenderPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/phishing/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to: email }),
            });

            if (response.ok) {
                setMessage('Email sent successfully!');
            } else {
                setMessage('Failed to send email.');
            }
        } catch (error) {
            setMessage('Error sending email.');
            console.log(error)
        }

        setLoading(false);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Send Email</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="To"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Email'}
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}