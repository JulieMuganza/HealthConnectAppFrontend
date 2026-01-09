import React, { useState } from 'react';
import { X, BellRinging, Pill, CalendarCheck } from '@phosphor-icons/react';
import Button from '../common/Button';
import Input from '../common/Input';
import api from '../../services/api';

const AddReminderModal = ({ isOpen, onClose, patient }) => {
    const [formData, setFormData] = useState({
        medicationName: '',
        dosage: '',
        frequency: '',
        instructions: ''
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen || !patient) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/reminders', {
                patientId: patient.id,
                ...formData
            });
            alert('Reminder added successfully!');
            onClose();
            setFormData({ medicationName: '', dosage: '', frequency: '', instructions: '' });
        } catch (error) {
            alert('Failed to add reminder');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: 'white', borderRadius: '16px', width: '100%', maxWidth: '500px',
                padding: '24px', position: 'relative', margin: '20px'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '20px', right: '20px',
                        background: 'none', border: 'none', cursor: 'pointer', color: '#64748B'
                    }}
                >
                    <X size={24} />
                </button>

                <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: '#F0F9FF', color: '#0EA5E9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <BellRinging size={24} weight="fill" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#0F172A' }}>Prescribe Medication</h2>
                        <p style={{ margin: 0, color: '#64748B', fontSize: '0.9rem' }}>For {patient.name}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Input
                        label="Medication Name"
                        name="medicationName"
                        value={formData.medicationName}
                        onChange={handleChange}
                        required
                        icon={<Pill size={18} />}
                        placeholder="e.g. Lisinopril"
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Input
                            label="Dosage"
                            name="dosage"
                            value={formData.dosage}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 10mg"
                        />
                        <Input
                            label="Frequency"
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Daily"
                            icon={<CalendarCheck size={18} />}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Instructions</label>
                        <textarea
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                            className="input-field"
                            rows="3"
                            placeholder="Take with food..."
                            style={{ paddingTop: '12px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button type="submit" isLoading={loading}>Submit Prescription</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReminderModal;
