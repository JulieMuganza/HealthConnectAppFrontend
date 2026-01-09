import React from 'react';
import './AuthLayout.css';
import Card from '../components/common/Card';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="auth-layout">
            {/* Decorative Background Elements */}
            <div className="mesh-gradient-1" />
            <div className="mesh-gradient-2" />

            <div className="auth-content">
                <div className="auth-header">
                    <h1 className="brand-title">HealthConnect<span style={{ color: 'var(--secondary-color)' }}>+</span></h1>
                </div>
                <Card className="auth-card">
                    <div className="auth-card-header">
                        {title && <h2>{title}</h2>}
                        {subtitle && <p>{subtitle}</p>}
                    </div>
                    {children}
                </Card>
                <p className="auth-footer">© 2026 HealthConnect Inc.</p>
            </div>
        </div>
    );
};

export default AuthLayout;
