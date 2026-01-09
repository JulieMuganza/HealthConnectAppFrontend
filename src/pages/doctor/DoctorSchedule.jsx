import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { USERS, APPOINTMENTS } from '../../data/mockData';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { CalendarCheck, Clock, User, CaretLeft, CaretRight, Plus } from '@phosphor-icons/react';

const DoctorSchedule = () => {
    return (
        <DashboardLayout role="doctor" user={USERS.doctor}>
            <div className="flex-between mb-4">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Schedule</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage patient appointments.</p>
                </div>
                <Button variant="primary" icon={<Plus />}>New Appointment</Button>
            </div>

            <Card style={{ marginBottom: '24px' }}>
                <div className="flex-between" style={{ paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Button variant="ghost" size="sm" icon={<CaretLeft />} />
                        <h3 style={{ fontSize: '1.1rem' }}>October 2026</h3>
                        <Button variant="ghost" size="sm" icon={<CaretRight />} />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '8px' }}>
                        <Button variant="secondary" size="sm" style={{ background: 'white', boxShadow: 'var(--shadow-sm)' }}>Week</Button>
                        <Button variant="ghost" size="sm">Month</Button>
                        <Button variant="ghost" size="sm">Day</Button>
                    </div>
                </div>

                {/* Mock Timeline */}
                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px', overflowX: 'auto', paddingBottom: '12px' }}>
                    {/* Width constraints to ensure it scrolls on mobile if content is wide */}
                    <div style={{ minWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {['Monday 08', 'Tuesday 09', 'Wednesday 10', 'Thursday 11', 'Friday 12'].map((day, i) => (
                            <div key={day} style={{ display: 'flex', gap: '24px' }}>
                                <div style={{ minWidth: '100px', textAlign: 'right', paddingTop: '16px' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: i === 0 ? 'var(--primary-color)' : 'var(--text-secondary)' }}>{day}</span>
                                </div>
                                <div style={{ flex: 1, borderLeft: '2px solid #F1F5F9', paddingLeft: '24px', paddingBottom: '24px' }}>
                                    {i === 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            {APPOINTMENTS.map(apt => (
                                                <div key={apt.id} style={{ background: '#EFF6FF', borderLeft: '4px solid var(--primary-color)', padding: '12px 16px', borderRadius: '0 8px 8px 0' }}>
                                                    <div className="flex-between">
                                                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{apt.time} - {parseInt(apt.time) + 1}:00</span>
                                                        <Badge variant="neutral">{apt.status}</Badge>
                                                    </div>
                                                    <h4 style={{ margin: '4px 0', fontSize: '1rem' }}>{apt.type}</h4>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                        <User /> {USERS.patient.name}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : i === 2 ? (
                                        <div style={{ background: '#FAF5FF', borderLeft: '4px solid #9333EA', padding: '12px 16px', borderRadius: '0 8px 8px 0' }}>
                                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>10:00 - 11:30</span>
                                            <h4 style={{ margin: '4px 0', fontSize: '1rem' }}>Staff Meeting</h4>
                                        </div>
                                    ) : (
                                        <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontStyle: 'italic' }}>No appointments</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </DashboardLayout>
    );
};

export default DoctorSchedule;
