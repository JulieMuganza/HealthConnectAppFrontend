import React from 'react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { CalendarBlank, Clock, VideoCamera } from '@phosphor-icons/react';
import './AppointmentWidget.css';

const AppointmentWidget = ({ appointments }) => {
    const nextAppointment = appointments.find(a => a.status === 'upcoming');

    return (
        <Card className="appointment-widget h-full" style={{ background: 'linear-gradient(145deg, #0066FF, #3182CE)', color: 'white' }}>
            <div className="widget-header">
                <h3 style={{ color: 'white' }}>Next Session</h3>
                <Badge style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>Upcoming</Badge>
            </div>

            {nextAppointment ? (
                <div className="apt-content">
                    <div className="apt-main">
                        <div className="apt-time-box">
                            <span className="apt-date">{nextAppointment.date}</span>
                            <span className="apt-time">{nextAppointment.time}</span>
                        </div>

                        <div className="apt-details">
                            <h4>{nextAppointment.type}</h4>
                            <p style={{ opacity: 0.9 }}>Video Consultation</p>
                        </div>
                    </div>

                    <div className="apt-doctor">
                        <Avatar src={nextAppointment.avatar} size="md" />
                        <div className="apt-doctor-info">
                            <strong>{nextAppointment.doctorName}</strong>
                            <span>{nextAppointment.doctorRole}</span>
                        </div>
                        <Button
                            variant="ghost"
                            style={{ background: 'white', color: 'var(--primary-color)', marginLeft: 'auto' }}
                            icon={<VideoCamera size={20} />}
                        >
                            Join
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="empty-state">
                    <p>No upcoming appointments</p>
                    <Button variant="secondary" size="sm">Schedule New</Button>
                </div>
            )}
        </Card>
    );
};

export default AppointmentWidget;
