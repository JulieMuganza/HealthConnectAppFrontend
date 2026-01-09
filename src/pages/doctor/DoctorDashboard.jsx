import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Users, CalendarCheck, Clock, ArrowRight } from '@phosphor-icons/react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get('/dashboard/doctor');
                setDashboardData(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    // Dynamic Greeting
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    if (loading) return <div>Loading...</div>;

    return (
        <DashboardLayout role="doctor" user={user}>
            {/* Header / Greeting */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                    {greeting}, Dr. {user?.name?.split(' ')[1] || user?.name}!
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    Here's your practice overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-grid">

                {/* Main Column (Schedule & Stats) */}
                <div className="col-span-8" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* Stats Grid */}
                    <div className="dashboard-stats-grid">
                        <Card className="p-6">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ background: 'var(--primary-light)', padding: '12px', borderRadius: '12px', color: 'var(--primary-color)' }}>
                                    <Users size={24} weight="fill" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{dashboardData?.stats?.totalPatients || 0}</h3>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Patients</span>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ background: '#F0FDFA', padding: '12px', borderRadius: '12px', color: '#0F766E' }}>
                                    <CalendarCheck size={24} weight="fill" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{dashboardData?.stats?.appointmentsToday || 0}</h3>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Appointments</span>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ background: '#FEF2F2', padding: '12px', borderRadius: '12px', color: '#DC2626' }}>
                                    <Clock size={24} weight="fill" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{dashboardData?.stats?.pendingRequests || 0}</h3>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Pending Reviews</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Schedule Section */}
                    <Card className="p-0">
                        <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>Today's Schedule</h3>
                            <Link to="/doctor/schedule" style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 500, textDecoration: 'none' }}>View All</Link>
                        </div>
                        <div style={{ padding: '0' }}>
                            {dashboardData?.schedule?.length > 0 ? dashboardData.schedule.map((apt, index) => (
                                <div key={apt.id} style={{
                                    padding: '20px 24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottom: index !== dashboardData.schedule.length - 1 ? '1px solid var(--border-subtle)' : 'none'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{
                                            background: 'var(--bg-app)',
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            fontWeight: 700,
                                            color: 'var(--text-main)',
                                            minWidth: '80px',
                                            textAlign: 'center'
                                        }}>
                                            {apt.time}
                                        </div>
                                        <div>
                                            <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 600 }}>{apt.patientName}</h4>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{apt.type}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" icon={<ArrowRight />} />
                                </div>
                            )) : <p style={{ padding: '24px', color: 'var(--text-secondary)' }}>No queries for today.</p>}
                        </div>
                    </Card>
                </div>

                {/* Right Column (Widgets) */}
                <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {/* Requests */}
                    <Card className="p-6">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>Requests</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {dashboardData?.requests?.length > 0 ? dashboardData.requests.map((req) => (
                                <div key={req.id} style={{ display: 'flex', gap: '12px', padding: '12px', background: 'var(--bg-app)', borderRadius: '8px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', marginTop: '6px' }}></div>
                                    <div>
                                        <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '2px' }}>Appointment Request</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{req.patientName}</p>
                                    </div>
                                </div>
                            )) : <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>No pending requests.</p>}
                        </div>
                        <Button fullWidth variant="secondary" style={{ marginTop: '20px' }}>Process Requests</Button>
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
                .col-span-8 { grid-column: span 8; }
                .col-span-4 { grid-column: span 4; }

                @media (max-width: 1024px) {
                    .col-span-8, .col-span-4 { grid-column: span 12 !important; }
                }

                @media (max-width: 768px) {
                    .dashboard-grid { gap: 24px; }
                    .dashboard-stats-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </DashboardLayout>
    );
};

export default DoctorDashboard;
