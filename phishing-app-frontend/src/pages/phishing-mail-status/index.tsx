import { useState } from "react";

export default function PhishingMailStatusPage() {
    const [emailStatus, setEmailStatus] = useState('');
    const [emailId, setEmailId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        setLoading(true)
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/phishing/status/${emailId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.status === 400) {
                setEmailStatus('Invalid Id')
            } else {
                setEmailStatus(data.status)
            }
            setLoading(false)

        } catch (error) {
            setEmailStatus('Error')
            setLoading(false)
            console.log(error)
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Get Email Status</h2>
                <input
                    type="text"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    placeholder="Enter email id"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Get email status'}
                </button>
                {emailStatus && <p>{emailStatus}</p>}
            </form>
        </div>
    );
}