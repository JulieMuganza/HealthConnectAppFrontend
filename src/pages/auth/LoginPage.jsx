import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Envelope, Lock, Stethoscope, User } from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';
import './AuthPagePro.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [role, setRole] = useState('patient'); // 'patient' or 'doctor'
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const user = await login(formData.email, formData.password);

            // Optional: Check if role matches user.role to warn mismatch?
            // For now, just redirect based on returned user role to be safe
            if (user.role === 'DOCTOR') {
                navigate('/doctor/dashboard');
            } else if (user.role === 'PATIENT') {
                navigate('/patient/dashboard');
            } else {
                navigate('/'); // Admin or other?
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container-pro">
            {/* Left Panel - Form */}
            <div className="auth-form-panel">
                <div className="auth-form-content">
                    <div className="brand-logo-large">
                        <div className="logo-icon">+</div>
                        <span>HealthConnect</span>
                    </div>

                    <div className="auth-header-pro">
                        <h1>Welcome Back</h1>
                        <p>Please enter your details to sign in.</p>
                    </div>

                    {error && <div className="auth-error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

                    {/* Role tabs purely visual for login as backend determines role, but good for UI intent */}
                    <div className="role-tabs">
                        <button
                            type="button"
                            className={`role-tab ${role === 'patient' ? 'active' : ''}`}
                            onClick={() => setRole('patient')}
                        >
                            <User weight="bold" /> Patient
                        </button>
                        <button
                            type="button"
                            className={`role-tab ${role === 'doctor' ? 'active' : ''}`}
                            onClick={() => setRole('doctor')}
                        >
                            <Stethoscope weight="bold" /> Doctor
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="auth-form-stack">
                        <Input
                            label="Email"
                            placeholder="name@example.com"
                            type="email"
                            required
                            icon={<Envelope size={18} />}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Input
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                            required
                            icon={<Lock size={18} />}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <div className="flex-between">
                            <label className="remember-me">
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#" className="forgot-link">Forgot password?</a>
                        </div>

                        <Button type="submit" fullWidth isLoading={isLoading}>
                            Sign In
                        </Button>
                    </form>

                    <div className="auth-footer-text">
                        Don't have an account? <a href="/signup">Sign up</a>
                    </div>
                </div>
            </div>

            {/* Right Panel - Visual */}
            <div className="auth-visual-panel">
                <div className="auth-visual-overlay">
                    <blockquote>
                        "Take care of your body. It’s the only place you have to live."
                        <footer>—  Jim Rohn</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
