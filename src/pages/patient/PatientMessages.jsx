import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import './ChatLayout.css';
import { Paperclip, PaperPlaneTilt } from '@phosphor-icons/react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const PatientMessages = () => {
    const { user } = useAuth();
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Fetch Conversations
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await api.get('/conversations');
                setChats(response.data);
            } catch (error) {
                console.error("Failed to fetch conversations", error);
            }
        };
        fetchConversations();
    }, []);

    // Fetch Messages when chat selected
    useEffect(() => {
        if (!selectedChatId) return;
        const fetchMessages = async () => {
            try {
                const response = await api.get(`/conversations/${selectedChatId}/messages`);
                setMessages(response.data);
            } catch (error) {
                console.error("Failed to fetch messages", error);
            }
        };
        fetchMessages();
    }, [selectedChatId]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedChatId) return;
        try {
            const response = await api.post(`/conversations/${selectedChatId}/messages`, {
                text: newMessage
            });
            const sentMsg = {
                id: response.data.id,
                senderId: user.id,
                text: response.data.text,
                time: new Date(response.data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isRead: false
            };
            setMessages([...messages, sentMsg]);
            setNewMessage('');
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const selectedChat = chats.find(c => c.id === selectedChatId);

    const handleCloseChat = (e) => {
        e.stopPropagation();
        setSelectedChatId(null);
    };

    return (
        <DashboardLayout role="patient" user={user}>
            {/* Page Header */}
            <div style={{ padding: '0 0 24px 0' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>Messages</h1>
            </div>

            <div className={`chat-layout ${selectedChatId ? 'mobile-chat-active' : ''}`} style={{ marginTop: '-10px' }}>

                {/* LEFT PANEL: INBOX */}
                <div className="chat-panel inbox-panel">
                    <div className="inbox-header" style={{ paddingBottom: '12px' }}>
                    </div>

                    <div className="chat-list">
                        <h4 style={{ margin: '0 0 12px 12px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Inbox</h4>
                        {chats.length > 0 ? chats.map(chat => (
                            <div
                                key={chat.id}
                                className={`chat-item ${selectedChatId === chat.id ? 'active' : ''}`}
                                onClick={() => setSelectedChatId(chat.id)}
                            >
                                <Avatar size="md" src={chat.participant.avatar} />
                                <div className="chat-item-content">
                                    <div className="chat-item-header">
                                        <span className="chat-name">{chat.participant.name}</span>
                                        <span className="chat-time">{chat.time}</span>
                                    </div>
                                    <div className="chat-preview" style={{ fontWeight: chat.unreadCount > 0 ? '700' : '400', color: chat.unreadCount > 0 ? 'var(--text-main)' : 'var(--text-secondary)' }}>
                                        {chat.lastMessage}
                                    </div>
                                </div>
                                {chat.unreadCount > 0 && (
                                    <div style={{
                                        background: 'var(--error-color)',
                                        color: 'white',
                                        minWidth: '20px',
                                        height: '20px',
                                        borderRadius: '10px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0 6px',
                                        marginLeft: '8px'
                                    }}>
                                        {chat.unreadCount}
                                    </div>
                                )}
                            </div>
                        )) : <p style={{ padding: '20px', color: 'var(--text-secondary)' }}>No conversations yet.</p>}
                    </div>
                </div>

                {/* MIDDLE PANEL: CHAT AREA */}
                <div className="chat-panel active-chat-container">
                    {selectedChatId && selectedChat ? (
                        <>
                            {/* Header */}
                            <div className="chat-header" style={{ justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <Avatar size="md" src={selectedChat.participant.avatar} />
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{selectedChat.participant.name}</h3>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ width: '8px', height: '8px', background: 'var(--success-color)', borderRadius: '50%' }}></span>
                                            Online
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    icon={<span style={{ fontSize: '1.2rem', lineHeight: 1 }}>×</span>}
                                    onClick={handleCloseChat}
                                    style={{
                                        borderRadius: '50%',
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-secondary)',
                                        background: '#F1F5F9'
                                    }}
                                />
                            </div>

                            {/* Messages Area */}
                            <div className="messages-area">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`message-group ${msg.senderId === user.id ? 'mine' : 'theirs'}`}>
                                        {msg.senderId !== user.id && <Avatar size="sm" src={selectedChat.participant.avatar} />}
                                        <div className="message-bubble">
                                            {msg.text}
                                            <div className="message-time">{msg.time}</div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="input-area">
                                <Button variant="ghost" icon={<Paperclip />} />
                                <div className="chat-input-wrapper">
                                    <input
                                        type="text"
                                        placeholder={`Message to ${selectedChat.participant.name.split(' ')[0]}`}
                                        className="chat-input-field"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                                <Button
                                    variant="primary"
                                    icon={<PaperPlaneTilt weight="fill" />}
                                    style={{ borderRadius: '50%', width: '44px', height: '44px', padding: 0 }}
                                    onClick={handleSendMessage}
                                />
                            </div>
                        </>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--text-secondary)' }}>
                            <Avatar size="xl" style={{ marginBottom: '16px', background: '#F1F5F9' }} />
                            <h3>Select a conversation</h3>
                            <p>Choose a contact from the inbox to start chatting.</p>
                        </div>
                    )}
                </div>

            </div>
            <style>{`
                @media (max-width: 768px) {
                    .chat-layout {
                        display: block;
                        height: calc(100vh - 80px); /* Adjust for header */
                        position: relative;
                    }
                    .chat-panel {
                        height: 100%;
                        overflow-y: auto;
                    }
                    /* Default: Show Inbox, Hide Chat */
                    .inbox-panel { display: block; width: 100%; }
                    .active-chat-container { display: none; width: 100%; }

                    /* Active: Hide Inbox, Show Chat */
                    .mobile-chat-active .inbox-panel { display: none; }
                    .mobile-chat-active .active-chat-container { display: block; }
                }
            `}</style>
        </DashboardLayout>
    );
};

export default PatientMessages;
