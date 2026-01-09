import React from 'react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { X, FileText, Pill, Clock } from '@phosphor-icons/react';

const PatientCaseModal = ({ isOpen, onClose, patient }) => {
    if (!isOpen || !patient) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div style={{ width: '100%', maxWidth: '800px', margin: '20px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                <Card className="p-0">
                    {/* Header */}
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Patient Case</h2>
                        <Button variant="ghost" icon={<X size={24} />} onClick={onClose} />
                    </div>

                    <div style={{ padding: '24px' }}>
                        {/* Patient Overview */}
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '32px' }}>
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
                                        {patient.dob ? new Date(patient.dob).toLocaleDateString() : 'N/A'}
                                    </div>
                                    <div>
                                        <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Gender</span>
                                        Female
                                    </div>
                                    <div>
                                        <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Contact</span>
                                        {patient.phone ? patient.phone.startsWith('+') ? patient.phone : `+250 ${patient.phone}` : '+250 ...'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="modal-grid" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
                            {/* Left: Notes */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <div style={{ background: 'var(--primary-light)', padding: '6px', borderRadius: '6px', color: 'var(--primary-color)' }}>
                                        <FileText size={18} weight="fill" />
                                    </div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Consultation Notes</h3>
                                </div>
                                <div style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Urgent Care Visit</h4>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Oct 24, 2023</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                        Patient reported anxiety and mild chest discomfort. ECG normal. Prescribed stress management.
                                    </p>
                                </div>
                                <div style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Routine Checkup</h4>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sep 12, 2023</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                        Routine annual physical. Vitals stable. Discussed diet and exercise plan.
                                    </p>
                                </div>
                            </div>

                            {/* Right: Meds & Vitals */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{ background: '#FEF3C7', padding: '6px', borderRadius: '6px', color: '#D97706' }}>
                                            <Pill size={18} weight="fill" />
                                        </div>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Medications</h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ padding: '10px', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
                                            <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem' }}>Lisinopril</h4>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>10mg • Daily</p>
                                        </div>
                                        <div style={{ padding: '10px', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
                                            <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem' }}>Atorvastatin</h4>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>20mg • Daily</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{ background: '#E0E7FF', padding: '6px', borderRadius: '6px', color: 'var(--primary-color)' }}>
                                            <Clock size={18} weight="fill" />
                                        </div>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Vitals</h3>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div style={{ textAlign: 'center', padding: '8px', background: '#F8FAFC', borderRadius: '8px' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>BP</span>
                                            <h4 style={{ margin: '2px 0 0 0', fontSize: '1rem' }}>120/80</h4>
                                        </div>
                                        <div style={{ textAlign: 'center', padding: '8px', background: '#F8FAFC', borderRadius: '8px' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>HR</span>
                                            <h4 style={{ margin: '2px 0 0 0', fontSize: '1rem' }}>72</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style>{`
                        @media (max-width: 640px) {
                            .modal-grid { grid-template-columns: 1fr !important; }
                        }
                    `}</style>
                </Card>
            </div>
        </div>
    );
};

export default PatientCaseModal;
