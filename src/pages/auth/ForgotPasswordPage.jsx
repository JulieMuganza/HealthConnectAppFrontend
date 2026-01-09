import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Envelope } from '@phosphor-icons/react';
import api from '../../services/api';
import './AuthPagePro.css';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            await api.post('/auth/forgot-password', { email });
            setMessage('If an account exists with this email, a reset link (token) has been sent.');
            // In a real app, user checks email. Here, we tell them to check console log for token.
            console.log("Check backend console for the token.");
        } catch (err) {
            setError(err.response?.data?.error || 'Request failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container-pro">
            <div className="auth-form-panel">
                <div className="auth-form-content">
                    <div className="brand-logo-large">
                        <div className="logo-icon">+</div>
                        <span>HealthConnect</span>
                    </div>

                    <div className="auth-header-pro">
                        <h1>Reset Password</h1>
                        <p>Enter your email to receive instructions.</p>
                    </div>

                    {error && <div className="auth-error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                    {message && <div className="auth-success-message" style={{ color: 'green', marginBottom: '1rem' }}>{message}</div>}

                    <form onSubmit={handleSubmit} className="auth-form-stack">
                        <Input
                            label="Email Address"
                            placeholder="name@example.com"
                            type="email"
                            required
                            icon={<Envelope size={18} />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button type="submit" fullWidth isLoading={isLoading}>
                            Send Reset Link
                        </Button>
                    </form>

                    <div className="auth-footer-text">
                        Remember your password? <a href="/login">Log in</a>
                    </div>

                    <div className="auth-footer-text" style={{ marginTop: '10px' }}>
                        <a href="/reset-password">I have a token</a>
                    </div>
                </div>
            </div>
            <div className="auth-visual-panel" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80)' }}>
                <div className="auth-visual-overlay"></div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
