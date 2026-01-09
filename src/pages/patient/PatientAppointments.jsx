import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import WeeklyCalendar from '../../components/patient/WeeklyCalendar';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { Calendar, Clock, VideoCamera, MapPin, DotsThreeVertical } from '@phosphor-icons/react';
import { APPOINTMENTS } from '../../data/mockData';

const PatientAppointments = () => {
    const [filter, setFilter] = useState('upcoming');

    return (
        <DashboardLayout role="patient">
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>Appointments</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Manage your scheduled visits and history.</p>
            </div>

            {/* Weekly Calendar View */}
            <div style={{ marginBottom: '40px' }}>
                <WeeklyCalendar />
            </div>

            {/* Legacy List View (Optional, kept for history if needed, or we can remove if user wants pure calendar)
                For now, creating a subtle 'History' section below the calendar 
            */}
            <div style={{ marginTop: '48px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Appointment History</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px' }}>
                    {/* Mock History Items */}
                    <Card className="p-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.8 }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ width: '48px', height: '48px', background: '#F1F5F9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>Dr. McCoy - General Checkup</h4>
                                <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock /> Oct 10, 2026</span>
                                    <Badge variant="neutral" size="sm">Completed</Badge>
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm">View Summary</Button>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PatientAppointments;
