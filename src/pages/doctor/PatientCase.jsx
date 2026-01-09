import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { USERS } from '../../data/mockData';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import { ArrowLeft, CaretDown, FileText, Pill, Clock } from '@phosphor-icons/react';

const PatientCase = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // In a real app, fetch patient by id. Utilizing mock user for demo.
    const patient = USERS.patient;

    return (
        <DashboardLayout role="doctor" user={USERS.doctor}>
            {/* Back Header */}
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Button variant="ghost" icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Patient Case: {patient.name}</h2>
            </div>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>

                {/* Left Column: Medical History & Notes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* Patient Overview Card */}
                    <Card className="p-6">
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                            <Avatar src={patient.avatar} size="lg" />
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{patient.name}</h3>
                                    <span style={{
                                        background: '#DCFCE7', color: '#166534',
                                        padding: '4px 12px', borderRadius: '20px',
                                        fontSize: '0.85rem', fontWeight: 600
                                    }}>Active Case</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    <div>
                                        <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>DOB</span>
                                        Jan 15, 1985 (41y)
                                    </div>
                                    <div>
                                        <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Gender</span>
                                        Female
                                    </div>
                                    <div>
                                        <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Contact</span>
                                        +1 (555) 012-3456
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Medical Notes */}
                    <Card className="p-6">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: 'var(--primary-light)', padding: '8px', borderRadius: '8px', color: 'var(--primary-color)' }}>
                                    <FileText size={20} weight="fill" />
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Consultation Notes</h3>
                            </div>
                            <Button variant="ghost" size="sm">Add Note +</Button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Urgent Care Visit</h4>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Oct 24, 2023</span>
                                </div>
                                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    Patient presented with reported anxiety and mild chest discomfort. ECG normal. Prescribed stress management techniques.
                                </p>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Routine Checkup</h4>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Sep 12, 2023</span>
                                </div>
                                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    Routine annual physical. Vitals stable. Discussed diet and exercise plan.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Medications & Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* Current Medications */}
                    <Card className="p-6">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <div style={{ background: '#FEF3C7', padding: '8px', borderRadius: '8px', color: '#D97706' }}>
                                <Pill size={20} weight="fill" />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Current Medications</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ padding: '12px', background: 'var(--bg-app)', borderRadius: '8px' }}>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem' }}>Lisinopril</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>10mg • Daily</p>
                            </div>
                            <div style={{ padding: '12px', background: 'var(--bg-app)', borderRadius: '8px' }}>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem' }}>Atorvastatin</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>20mg • Daily</p>
                            </div>
                        </div>
                    </Card>

                    {/* Recent Vitals */}
                    <Card className="p-6">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <div style={{ background: '#E0E7FF', padding: '8px', borderRadius: '8px', color: 'var(--primary-color)' }}>
                                <Clock size={20} weight="fill" />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Recent Vitals</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-app)', borderRadius: '8px' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>BP</span>
                                <h4 style={{ margin: '4px 0 0 0', fontSize: '1.1rem' }}>120/80</h4>
                            </div>
                            <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-app)', borderRadius: '8px' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>HR</span>
                                <h4 style={{ margin: '4px 0 0 0', fontSize: '1.1rem' }}>72</h4>
                            </div>
                        </div>
                    </Card>

                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .dashboard-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </DashboardLayout>
    );
};

export default PatientCase;
