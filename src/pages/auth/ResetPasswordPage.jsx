import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Envelope, Lock, Key } from '@phosphor-icons/react';
import api from '../../services/api';
import './AuthPagePro.css';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        token: '',
        newPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            await api.post('/auth/reset-password', formData);
            setMessage('Password has been reset successfully. Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Reset failed');
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
                        <h1>Set New Password</h1>
                        <p>Enter your email, token, and new password.</p>
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
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <Input
                            label="Reset Token (Check Console/Email)"
                            placeholder="Paste token here"
                            type="text"
                            required
                            icon={<Key size={18} />}
                            name="token"
                            value={formData.token}
                            onChange={handleChange}
                        />

                        <Input
                            label="New Password"
                            placeholder="••••••••"
                            type="password"
                            required
                            icon={<Lock size={18} />}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />

                        <Button type="submit" fullWidth isLoading={isLoading}>
                            Update Password
                        </Button>
                    </form>

                    <div className="auth-footer-text">
                        <a href="/login">Back to Login</a>
                    </div>
                </div>
            </div>
            <div className="auth-visual-panel" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80)' }}>
                <div className="auth-visual-overlay"></div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
