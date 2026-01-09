import React from 'react';
import { Plus, VideoCamera, MapPin } from '@phosphor-icons/react';
import Button from '../common/Button';
import './WeeklyCalendar.css';

const WeeklyCalendar = () => {
    // Mock Appointments: 3 total, 2 physical, 1 online as requested
    // Assuming current week (Mon-Sun).
    const appointments = [
        {
            id: 1,
            day: 1, // Tuesday (0=Mon, 1=Tue... logic typically 0-6) -> Let's say columns are Mon, Tue, Wed...
            startHour: 10,
            duration: 1.5, // 1.5 hours
            title: 'Dr. House - General',
            type: 'physical',
            time: '10:00 AM - 11:30 AM'
        },
        {
            id: 2,
            day: 3, // Thursday
            startHour: 14, // 2 PM
            duration: 1,
            title: 'Dr. Cuddy - Endocrine',
            type: 'physical',
            time: '02:00 PM - 03:00 PM'
        },
        {
            id: 3,
            day: 4, // Friday
            startHour: 9,
            duration: 1,
            title: 'Dr. Wilson - Oncology',
            type: 'online',
            time: '09:00 AM - 10:00 AM'
        }
    ];

    const days = [
        { name: 'Mon', date: '21' },
        { name: 'Tue', date: '22', active: true },
        { name: 'Wed', date: '23' },
        { name: 'Thu', date: '24' },
        { name: 'Fri', date: '25' },
        { name: 'Sat', date: '26' },
        { name: 'Sun', date: '27' },
    ];

    const hours = [9, 10, 11, 12, 13, 14, 15, 16]; // 9am to 4pm

    return (
        <div className="weekly-calendar">
            <div className="wc-header">
                <div className="wc-title">
                    <h3>Appointments</h3>
                    <p>Stay organized and on track with calendar</p>
                </div>
                <div className="wc-controls">
                    <div className="wc-view-toggle">
                        <button className="wc-toggle-btn">Day</button>
                        <button className="wc-toggle-btn active">Week</button>
                        <button className="wc-toggle-btn">Month</button>
                    </div>
                    <Button size="sm" icon={<Plus />}>Add new</Button>
                </div>
            </div>

            <div className="wc-grid">
                {/* Header Row */}
                <div className="wc-header-cell type-empty"></div> {/* Corner */}
                {days.map((day, i) => (
                    <div key={i} className="wc-header-cell" style={{ background: day.active ? '#F8FAFC' : 'transparent' }}>
                        <div className="wc-header-day">{day.name}</div>
                        <div className="wc-header-date" style={{ color: day.active ? 'var(--primary-color)' : 'inherit' }}>{day.date}</div>
                    </div>
                ))}

                {/* Grid Rows */}
                {hours.map((hour) => (
                    <div key={hour} className="wc-row">
                        {/* Time Column */}
                        <div className="wc-cell wc-time-col">
                            {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'pm' : 'am'}
                        </div>

                        {/* Day Cells */}
                        {days.map((day, dayIndex) => {
                            // Find appointment for this day and time
                            // Simplified logic: matches start hour exactly
                            const apt = appointments.find(a => a.day === dayIndex && Math.floor(a.startHour) === hour);

                            return (
                                <div key={dayIndex} className="wc-cell" style={{ position: 'relative' }}>
                                    {/* Mock Current Time Line (e.g., on Tuesday at 10:30am) */}
                                    {day.active && hour === 10 && (
                                        <div className="wc-current-time-line" style={{ top: '50%' }}>
                                            <div className="wc-current-time-dot"></div>
                                        </div>
                                    )}

                                    {apt && (
                                        <div
                                            className={`wc-event wc-event-${apt.type}`}
                                            style={{
                                                height: `${apt.duration * 100}%`, /* simple scale */
                                                top: `0px`
                                            }}
                                        >
                                            <div className="wc-event-title">{apt.title}</div>
                                            <div className="wc-event-type">
                                                {apt.type === 'online' ? <VideoCamera weight="fill" /> : <MapPin weight="fill" />}
                                                {apt.type === 'online' ? 'Online' : 'In-person'}
                                            </div>
                                            <div className="wc-event-time">{apt.time}</div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyCalendar;
