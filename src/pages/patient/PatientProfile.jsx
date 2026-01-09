import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/common/Button';
import { User, Heart, Shield, Bell, Lock } from '@phosphor-icons/react';
import api from '../../services/api';
import './PatientProfile.css';

const PatientProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/profiles/patient');
                setProfile(res.data);
            } catch (err) {
                console.error("Failed to fetch profiles", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!profile) return <div>Failed to load profile.</div>;

    const { personal, medical } = profile;

    return (
        <DashboardLayout role="patient" user={{ name: personal.name, avatar: null }}>
            <div className="flex-between mb-4">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>My Profile</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage your personal information and preferences.</p>
                </div>
            </div>

            <div className="profile-section">
                <h2><User size={20} weight="bold" /> Personal Information</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Full Name</label>
                        <p>{personal.name}</p>
                    </div>
                    <div className="info-item">
                        <label>Email Address</label>
                        <p>{personal.email}</p>
                    </div>
                    <div className="info-item">
                        <label>Phone Number</label>
                        <p>{personal.phone || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                        <label>Date of Birth</label>
                        <p>{personal.dob || 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h2><Heart size={20} weight="bold" /> Medical Information</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Emergency Contact</label>
                        <p>{medical.emergencyContact || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                        <label>Medical History</label>
                        {medical.medicalHistory && medical.medicalHistory.length > 0 ? (
                            <ul className="history-list">
                                {medical.medicalHistory.map((item, index) => (
                                    <li key={index} className="history-item">• {item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No history recorded.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h2><Shield size={20} weight="bold" /> Settings & Security</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
                    <div className="flex-between">
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <Bell size={20} />
                            <span>Notifications</span>
                        </div>
                        <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex-between">
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <Lock size={20} />
                            <span>Change Password</span>
                        </div>
                        <Button variant="ghost" size="sm">Update</Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PatientProfile;
