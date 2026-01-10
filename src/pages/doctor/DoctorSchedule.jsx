import React, { useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { CalendarCheck, Clock, User, CaretLeft, CaretRight, Plus } from '@phosphor-icons/react';

const DoctorSchedule = () => {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        patientId: '',
        date: '',
        time: '',
        type: 'In-Person'
    });

    React.useEffect(() => {
        // Fetch Appointments
        const fetchMocks = async () => {
            // In real app
            try {
                const resApp = await api.get('/appointments');
                setAppointments(resApp.data);

                const resPat = await api.get('/doctor/patients');
                setPatients(resPat.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMocks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/appointments', formData);
            setAppointments(prev => [...prev, {
                ...res.data,
                // Optimistic UI updates
                patientName: patients.find(p => p.id === parseInt(formData.patientId))?.name,
                status: 'Scheduled'
            }]);
            setIsModalOpen(false);
            setFormData({ patientId: '', date: '', time: '', type: 'In-Person' });
            setFormData({ patientId: '', date: '', time: '', type: 'In-Person' });
            alert("Appointment Scheduled & Patient Notified!");
        } catch (err) {
            console.error(err);
            alert(`Failed to schedule: ${err.response?.data?.error || err.message}`);
        }
    };

    return (
        <DashboardLayout role="doctor" user={{ name: 'Dr. Trav Lie' }}>
            {/* Note: User object would ideally come from AuthContext */}
            <div className="flex-between mb-4">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Schedule</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage patient appointments.</p>
                </div>
                <Button variant="primary" icon={<Plus />} onClick={() => setIsModalOpen(true)}>New Appointment</Button>
            </div>

            <Card style={{ marginBottom: '24px' }}>
                <div style={{ padding: '16px' }}>
                    <h3 style={{ marginBottom: '16px' }}>Upcoming Appointments</h3>
                    {appointments.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {appointments.map(apt => (
                                <div key={apt.id} style={{ background: '#EFF6FF', borderLeft: '4px solid var(--primary-color)', padding: '12px 16px', borderRadius: '4px' }}>
                                    <div className="flex-between">
                                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{apt.date} @ {apt.time}</span>
                                        <Badge variant="neutral">{apt.status}</Badge>
                                    </div>
                                    <h4 style={{ margin: '4px 0', fontSize: '1rem' }}>{apt.type}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        <User /> {apt.patientName || `Patient #${apt.patientId}`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-secondary)' }}>No appointments scheduled.</p>
                    )}
                </div>
            </Card>

            {/* Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '400px' }}>
                        <h3 style={{ marginBottom: '16px' }}>New Appointment</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>Patient</label>
                                <select
                                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                                    value={formData.patientId}
                                    onChange={e => setFormData({ ...formData, patientId: e.target.value })}
                                    required
                                >
                                    <option value="">Select Patient</option>
                                    {patients.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>Date</label>
                                <input
                                    type="date"
                                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>Time</label>
                                <input
                                    type="time"
                                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                                    value={formData.time}
                                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>Type</label>
                                <select
                                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="In-Person">In-Person</option>
                                    <option value="Online">Online</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit" variant="primary">Schedule</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default DoctorSchedule;
