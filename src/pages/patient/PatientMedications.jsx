import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { Pill, WarningCircle, Clock, CheckCircle } from '@phosphor-icons/react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const PatientMedications = () => {
    const { user } = useAuth();
    const [view, setView] = React.useState('active'); // 'active' or 'history'
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const res = await api.get('/reminders');
                setMedications(res.data);
            } catch (err) {
                console.error("Failed to fetch reminders", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMedications();
    }, []);

    // Helper to calculate status (Mock logic for demo, as DB might not store daily logs yet)
    const getStatus = (med) => {
        // Simplified status logic
        return 'due';
    };

    if (loading) return <div>Loading...</div>;

    const medList = medications.map(m => ({
        id: m.id,
        name: m.medicationName,
        dosage: m.dosage,
        frequency: m.frequency,
        instructions: m.instructions,
        status: 'due', // Default
        nextDose: 'Today', // Placeholder
        duration: 'Ongoing',
        timeLeft: '',
        progress: 0
    }));

    return (
        <DashboardLayout role="patient" user={user}>
            <div className="flex-between mb-4">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Medications</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Track your prescriptions and intake schedule.</p>
                </div>
                {/* View toggle (Active/History) - Keep UI but logic is simplified */}
                <div style={{ display: 'flex', background: '#F1F5F9', padding: '4px', borderRadius: '8px' }}>
                    <button
                        onClick={() => setView('active')}
                        style={{
                            padding: '6px 16px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 600,
                            background: view === 'active' ? 'white' : 'transparent',
                            color: view === 'active' ? 'var(--primary-color)' : 'var(--text-secondary)',
                            boxShadow: view === 'active' ? 'var(--shadow-sm)' : 'none',
                            border: 'none', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                    >Active</button>
                    <button
                        onClick={() => setView('history')}
                        style={{
                            padding: '6px 16px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 600,
                            background: view === 'history' ? 'white' : 'transparent',
                            color: view === 'history' ? 'var(--primary-color)' : 'var(--text-secondary)',
                            boxShadow: view === 'history' ? 'var(--shadow-sm)' : 'none',
                            border: 'none', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                    >History</button>
                </div>
            </div>

            {view === 'active' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                    {medList.length > 0 ? medList.map(med => (
                        <Card key={med.id}>
                            <div className="flex-between" style={{ marginBottom: '16px' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '12px',
                                    background: '#F0FDFA', color: '#0F766E',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Pill size={24} weight="fill" />
                                </div>
                                <Badge variant={med.status === 'taken' ? 'success' : 'warning'}>
                                    {med.status === 'taken' ? 'Taken today' : 'Due: ' + med.nextDose}
                                </Badge>
                            </div>

                            <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{med.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
                                <strong>{med.dosage}</strong> • {med.frequency}
                            </p>

                            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
                                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <WarningCircle size={16} weight="fill" color="var(--primary-color)" />
                                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Instructions:</span>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>{med.instructions}</p>
                            </div>

                            <div className="flex-between">
                                <Button variant="ghost" size="sm">View History</Button>
                                <Button variant="primary" size="sm" onClick={() => alert(`Marked ${med.name} as taken.`)}>Mark as Taken</Button>
                            </div>
                        </Card>
                    )) : (
                        <p>No active medications.</p>
                    )}
                </div>
            ) : (
                <Card className="p-0">
                    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        No history available yet.
                    </div>
                </Card>
            )}
        </DashboardLayout>
    );
};

export default PatientMedications;
