import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { USERS } from '../../data/mockData';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import PatientCaseModal from '../../components/doctor/PatientCaseModal';
import AddReminderModal from '../../components/doctor/AddReminderModal';
import { ChatCircleDots, BellRinging } from '@phosphor-icons/react';

const PatientList = () => {
    const navigate = useNavigate();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [reminderPatient, setReminderPatient] = useState(null);
    const [patients, setPatients] = useState([]); // Real state

    // Fetch real patients
    React.useEffect(() => {
        import('../../services/api').then(module => {
            const api = module.default;
            api.get('/doctor/patients').then(res => setPatients(res.data)).catch(err => console.error(err));
        });
    }, []);

    return (
        <DashboardLayout role="doctor" user={USERS.doctor}>
            <div style={{ marginBottom: '24px' }}>
                <h1>My Patients</h1>
            </div>

            <Card className="p-0" style={{ overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748B', fontWeight: 600, letterSpacing: '0.05em' }}>PATIENT</th>
                                <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748B', fontWeight: 600, letterSpacing: '0.05em' }}>STATUS</th>
                                <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748B', fontWeight: 600, letterSpacing: '0.05em' }}>LAST VISIT</th>
                                <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748B', fontWeight: 600, letterSpacing: '0.05em', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient) => (
                                <tr key={patient.id} className="hover-row" style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <Avatar src={patient.avatar} size="md" />
                                        <div>
                                            <span style={{ display: 'block', fontWeight: 600, color: '#0F172A' }}>{patient.name}</span>
                                            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Id: #{String(patient.id)}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{
                                            background: '#DCFCE7', color: '#166534',
                                            padding: '6px 12px', borderRadius: '20px',
                                            fontSize: '0.75rem', fontWeight: 600,
                                            display: 'inline-flex', alignItems: 'center', gap: '6px'
                                        }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
                                            Active
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', color: '#475569', fontSize: '0.9rem' }}>
                                        2 days ago
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                            <Button variant="ghost" size="sm" icon={<ChatCircleDots size={20} />} onClick={() => navigate(`/doctor/messages?userId=${patient.id}`)}>Message</Button>
                                            <Button variant="ghost" size="sm" icon={<BellRinging size={20} />} onClick={() => setReminderPatient(patient)} title="Prescribe Medication" />
                                            <Button variant="secondary" size="sm" onClick={() => setSelectedPatient(patient)}>View Case</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <style>{`
                    .hover-row:hover { background-color: #F8FAFC; }
                `}</style>
            </Card>

            <PatientCaseModal
                isOpen={!!selectedPatient}
                onClose={() => setSelectedPatient(null)}
                patient={selectedPatient}
            />

            <AddReminderModal
                isOpen={!!reminderPatient}
                onClose={() => setReminderPatient(null)}
                patient={reminderPatient}
            />
        </DashboardLayout>
    );
};

export default PatientList;
