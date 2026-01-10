import React, { useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../layouts/DashboardLayout';
import WeeklyCalendar from '../../components/patient/WeeklyCalendar';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { Calendar, Clock, VideoCamera, MapPin, DotsThreeVertical } from '@phosphor-icons/react';
import { APPOINTMENTS } from '../../data/mockData';

const PatientAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    React.useEffect(() => {
        const fetchApts = async () => {
            try {
                const res = await api.get('/appointments');
                // Currently backend returns them sorted ASC by date.
                // We can separate upcoming vs history if we want.
                // For MVP, just list all or filter in frontend.
                setAppointments(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchApts();
    }, []);

    return (
        <DashboardLayout role="patient">
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>Appointments</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Manage your scheduled visits and history.</p>
            </div>

            {/* Weekly Calendar View (Static for now, but could inject props) */}
            <div style={{ marginBottom: '40px' }}>
                {/* Note: In a full app, we'd pass appointments prop to WeeklyCalendar */}
                <WeeklyCalendar />
            </div>

            <div style={{ marginTop: '48px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>All Appointments</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px' }}>
                    {appointments.length > 0 ? appointments.map(apt => (
                        <Card key={apt.id} className="p-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div style={{ width: '48px', height: '48px', background: '#F1F5F9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>Dr. {apt.doctorName} - {apt.type}</h4>
                                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock /> {apt.date} @ {apt.time}</span>
                                        <Badge variant="neutral" size="sm" style={{ background: apt.status === 'Scheduled' ? '#EFF6FF' : '#F1F5F9', color: apt.status === 'Scheduled' ? 'var(--primary-color)' : 'inherit' }}>{apt.status}</Badge>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">View Details</Button>
                        </Card>
                    )) : (
                        <p style={{ color: 'var(--text-secondary)' }}>No appointments found.</p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PatientAppointments;
