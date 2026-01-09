import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { USERS, MESSAGES } from '../../data/mockData';
import ChatInterface from '../../components/common/ChatInterface';

const PatientInbox = () => {
    const [messages, setMessages] = useState(MESSAGES.map(m => ({
        ...m,
        isMine: m.sender !== 'Dr. Leonard McCoy' // Mock logic
    })));

    const handleSend = (text) => {
        const newMsg = {
            id: Date.now(),
            sender: USERS.patient.name,
            content: text,
            timestamp: 'Now',
            unread: false,
            isMine: true,
            avatar: USERS.patient.avatar
        };
        setMessages([...messages, newMsg]);
    };

    // Hardcoded recipient for demo
    const recipient = USERS.doctor;

    return (
        <DashboardLayout role="patient" user={USERS.patient}>
            <div style={{ height: 'calc(100vh - 120px)' }}>
                <ChatInterface
                    messages={messages}
                    recipient={recipient}
                    onSend={handleSend}
                />
            </div>
        </DashboardLayout>
    );
};

export default PatientInbox;
