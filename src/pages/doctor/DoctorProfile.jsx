import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/common/Button';
import { User, Shield, Bell, Lock, IdentificationCard, Buildings } from '@phosphor-icons/react';
import api from '../../services/api';
import '../patient/PatientProfile.css';

const DoctorProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/profiles/doctor');
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

    const { personal, professional, clinic } = profile;

    return (
        <DashboardLayout role="doctor" user={{ name: personal.name, avatar: null }}>
            <div className="flex-between mb-4">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Doctor Profile</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage your professional details and account settings.</p>
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
                </div>
            </div>

            <div className="profile-section">
                <h2><IdentificationCard size={20} weight="bold" /> Professional Details</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Specialty</label>
                        <p>{professional.specialty}</p>
                    </div>
                    <div className="info-item">
                        <label>License Number</label>
                        <p>{professional.licenseNumber || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                        <label>Years of Experience</label>
                        <p>{professional.experienceYears ? `${professional.experienceYears} Years` : 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h2><Buildings size={20} weight="bold" /> Clinic Information</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Clinic Name</label>
                        <p>{clinic.name || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                        <label>Address</label>
                        <p>{clinic.address || 'N/A'}</p>
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

export default DoctorProfile;
