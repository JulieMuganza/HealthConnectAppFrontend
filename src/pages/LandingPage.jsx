import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { Pill, Calendar, MessageCircle, Bell } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            {/* Ambient Background */}
            <div className="landing-background">
                <div className="gradient-blob blob-1"></div>
                <div className="gradient-blob blob-2"></div>
                <div className="gradient-blob blob-3"></div>
            </div>

            <div className="landing-content">
                {/* Header */}
                <header className="landing-header">
                    <div className="logo-section">
                        <div className="logo-icon">+</div>
                        HealthConnect
                    </div>
                    <div className="nav-buttons">
                        <button className="btn-login" onClick={() => navigate('/login')}>
                            Log In
                        </button>
                        <button className="btn-primary" onClick={() => navigate('/signup')}>
                            Get Started
                        </button>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="hero-section">
                    <h1 className="hero-title">
                        Your Health, In Control
                    </h1>
                    <p className="hero-subtitle">
                        Manage your medications, track appointments, and communicate with your doctor—all in one simple, secure platform.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-hero-primary" onClick={() => navigate('/signup')}>
                            Start Free
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <div className="section-header">
                        <h2 className="section-title">Everything You Need</h2>
                        <p className="section-subtitle">Stay on top of your health with these essential features</p>
                    </div>

                    <div className="features-grid">
                        <FeatureCard
                            icon={<Pill size={32} />}
                            title="Medication Reminders"
                            description="Never miss a dose. Get timely alerts for your medications with dosage details and special instructions."
                        />
                        <FeatureCard
                            icon={<Calendar size={32} />}
                            title="Appointment Tracking"
                            description="View upcoming appointments, receive reminders before your visit, and access details anytime."
                        />
                        <FeatureCard
                            icon={<MessageCircle size={32} />}
                            title="Doctor Messages"
                            description="Chat directly with your healthcare provider. Share updates and receive personalized guidance."
                        />
                        <FeatureCard
                            icon={<Bell size={32} />}
                            title="Smart Notifications"
                            description="Stay informed with intelligent alerts for medications, appointments, and doctor messages."
                        />
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="benefits-section">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose HealthConnect?</h2>
                    </div>

                    <div className="benefits-grid">
                        <BenefitItem
                            title="Simple to Use"
                            description="Intuitive interface designed for patients of all ages and tech backgrounds."
                        />
                        <BenefitItem
                            title="Always Available"
                            description="Access your health information anytime, anywhere from your phone or computer."
                        />
                        <BenefitItem
                            title="Better Outcomes"
                            description="Improved medication adherence and appointment attendance with smart reminders."
                        />
                    </div>
                </section>

                {/* CTA Footer */}
                <section className="cta-section">
                    <h2 className="cta-title">Ready to Take Control?</h2>
                    <p className="cta-desc">Join thousands of patients already managing their health better with HealthConnect</p>
                    <button className="btn-cta" onClick={() => navigate('/signup')}>
                        Get Started Now
                    </button>
                </section>

                {/* Footer */}
                <footer className="landing-footer">
                    <p>© 2025 HealthConnect. All rights reserved. Your health, our priority.</p>
                </footer>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="feature-card">
        <div className="feature-icon-wrapper">
            {icon}
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{description}</p>
    </div>
);

const BenefitItem = ({ title, description }) => (
    <div className="benefit-item">
        <h3 className="feature-title" style={{ fontSize: '1.4rem' }}>{title}</h3>
        <p className="feature-desc">{description}</p>
    </div>
);

export default LandingPage;