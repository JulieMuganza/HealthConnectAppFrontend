import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Envelope, Lock, User, IdentificationCard, Stethoscope } from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';
import './AuthPagePro.css';

const SignupPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [role, setRole] = useState('patient'); // Default to patient

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        medicalId: '', // Use as license for doctor, or generic ID for patient
        specialty: ''  // For doctors
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const name = `${formData.firstName} ${formData.lastName}`.trim();
            const payload = {
                name,
                email: formData.email,
                password: formData.password,
                role: role.toUpperCase(), // DOCTOR or PATIENT

            };

            await register(payload);

            // Redirect to login with success message
            // Ideally we'd pass state to display a toast, but for now just navigate
            alert("User created successfully. Please log in.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
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
                        <h1>Create Account</h1>
                        <p>Join us to manage your health professionally.</p>
                    </div>

                    {error && <div className="auth-error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

                    {/* Role Selection */}
                    <div className="role-tabs" style={{ marginBottom: '20px' }}>
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

                    <form onSubmit={handleSignup} className="auth-form-stack">
                        <div className="flex-between gap-4">
                            <Input
                                label="First Name"
                                placeholder="Michael"
                                required
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <Input
                                label="Last Name"
                                placeholder="Smith"
                                required
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>

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
                            label={role === 'doctor' ? "Medical License ID" : "Medical/Insurance ID"}
                            placeholder="ID-12345678"
                            icon={<IdentificationCard size={18} />}
                            name="medicalId"
                            value={formData.medicalId}
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

                        <Button type="submit" fullWidth isLoading={isLoading}>
                            Create Account
                        </Button>
                    </form>

                    <div className="auth-footer-text">
                        Already have an account? <Link to="/login">Log in</Link>
                    </div>
                </div>
            </div>

            {/* Right Panel - Visual */}
            <div className="auth-visual-panel" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80)' }}>
                <div className="auth-visual-overlay">
                    <blockquote>
                        "Your body holds deep wisdom. Trust in it. Learn from it. Nourish it. Watch your life transform and be healthy."
                        <footer>— Bella Bleue</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
