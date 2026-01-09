import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Pill, CheckCircle } from '@phosphor-icons/react';
import './MedicationWidget.css';

const MedicationWidget = ({ medications }) => {
    const navigate = useNavigate();
    return (
        <Card className="medication-widget h-full">
            <div className="widget-header">
                <h3>My Medications</h3>
                <Button variant="ghost" size="sm" onClick={() => navigate('/patient/medications')}>See all</Button>
            </div>

            <div className="medication-list">
                {medications.map((med) => (
                    <div key={med.id} className="med-item">
                        <div className="med-icon-wrapper">
                            <Pill size={24} weight="fill" />
                        </div>
                        <div className="med-info">
                            <div className="med-header">
                                <h4>{med.name}</h4>
                                <Badge variant={med.status === 'taken' ? 'success' : 'neutral'}>
                                    {med.status === 'taken' ? 'Taken' : med.nextDose}
                                </Badge>
                            </div>
                            <p className="med-details">{med.dosage} • {med.frequency}</p>

                            <div className="med-progress-container">
                                <div className="med-progress-bar">
                                    <div className="med-progress-fill" style={{ width: `${med.progress}%` }} />
                                </div>
                                <span className="med-progress-text">{med.timeLeft}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {medications.length === 0 && (
                <div className="empty-state">
                    <p>No active medications</p>
                </div>
            )}
        </Card>
    );
};

export default MedicationWidget;
