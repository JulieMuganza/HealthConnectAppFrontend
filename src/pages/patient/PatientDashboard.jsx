import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import MedicationWidget from '../../components/patient/MedicationWidget';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get('/dashboard/patient');
                setDashboardData(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    const greeting = dashboardData?.greeting || 'Welcome';
    const activeMeds = dashboardData?.medications || [];

    if (loading) return <div>Loading...</div>;

    return (
        <DashboardLayout role="patient" user={user}>
            {/* Greeting Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                    {greeting}, {user?.name?.split(' ')[0]}! Glad to have you back 👋
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Here's your health overview for today.</p>
            </div>

            {/* Main Grid Layout */}
            <div className="dashboard-grid">
                {/* Left/Middle Column (Wide) */}
                <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '32px' }} className="col-span-8">

                    {/* Top Stats Row */}
                    <div className="dashboard-stats-grid">
                        <Card className="p-6">
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '12px' }}>Progress Tracking</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 700 }}>85%</span>
                                <Badge variant="success" size="sm">+15%</Badge>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Medication adherence improved over last month.</p>
                            <div style={{ height: '8px', width: '100%', background: '#F1F5F9', borderRadius: '4px', marginTop: '16px' }}>
                                <div style={{ height: '100%', width: '85%', background: 'var(--primary-color)', borderRadius: '4px' }}></div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '12px' }}>Vitals Check</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 700 }}>{dashboardData?.recentVitals?.bp || 'N/A'}</span>
                                <Badge variant="neutral" size="sm">Normal</Badge>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>✓</div>
                                    <span>Blood Pressure stable</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>✓</div>
                                    <span>Heart Rate: {dashboardData?.recentVitals?.heartRate || '-'} bpm</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '12px' }}>Active Meds</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 700 }}>{activeMeds.length}</span>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>prescribed</span>
                            </div>
                            <div style={{ height: '8px', width: '100%', background: '#F1F5F9', borderRadius: '4px', marginTop: '16px' }}>
                                <div style={{ height: '100%', width: '100%', background: 'var(--secondary-color)', borderRadius: '4px' }}></div>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '12px' }}>All taken for today.</p>
                        </Card>
                    </div>

                    {/* Middle Row: Medication Chart / Urgent Support */}
                    <div className="dashboard-middle-grid">
                        {/* Using MedicationWidget as the main "Chart" substitute for now */}
                        <div style={{ gridColumn: 'span 1' }}>
                            <MedicationWidget medications={activeMeds} />
                        </div>

                        {/* Urgent Support Card (Gradient Blue) */}
                        <Card className="p-6" style={{
                            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                            color: 'white',
                            border: 'none',
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                            minHeight: '260px'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'white' }}>Urgent Support</h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: '1.5' }}>Quick access to your doctor when you need immediate help.</p>
                            </div>
                            <Button onClick={() => navigate('/patient/messages')} style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', width: '100%' }}>
                                Contact Doctor
                            </Button>
                        </Card>
                    </div>

                </div>

                {/* Right Column (Narrow) */}
                <div style={{ gridColumn: 'span 4' }} className="col-span-4">
                    <Card className="p-6" style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px' }}>Upcoming</h3>
                        {/* Mock Calendar Header */}
                        <div className="flex-between" style={{ marginBottom: '20px' }}>
                            <span style={{ fontWeight: 600 }}>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                        </div>

                        {/* Next Appointment Display */}
                        {dashboardData?.nextAppointment ? (
                            <div style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '12px' }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>{dashboardData.nextAppointment.doctor}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{dashboardData.nextAppointment.date}</p>
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)' }}>No upcoming appointments.</p>
                        )}

                        <Button fullWidth variant="secondary" style={{ marginTop: '24px' }} onClick={() => navigate('/patient/appointments')}>Schedule New</Button>
                    </Card>

                    <Card className="p-0">
                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 4px 0' }}>Recent Records</h3>
                            {/* Mock static records for now as no API for files yet */}
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>📄</div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Blood Test Results</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Oct 15 • PDF</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <style>{`
                .dashboard-grid {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    gap: 32px;
                    align-items: start;
                }
                .dashboard-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }
                .dashboard-middle-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 20px;
                }
                
                @media (max-width: 1024px) {
                    .col-span-8, .col-span-4 { grid-column: span 12 !important; }
                }

                @media (max-width: 768px) {
                    .dashboard-stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .dashboard-middle-grid {
                        grid-template-columns: 1fr;
                    }
                    .dashboard-grid {
                        gap: 24px;
                    }
                }
            `}</style>
        </DashboardLayout>
    );
};

export default PatientDashboard;
