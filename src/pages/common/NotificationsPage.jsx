import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Bell, Check } from '@phosphor-icons/react';

const NotificationsPage = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const res = await api.get('/notifications');
            setNotifications(res.data);
        } catch (err) {
            console.error("Failed to fetch notifications", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleMarkRead = async () => {
        try {
            await api.put('/notifications/read');
            fetchNotifications(); // Refresh to clear styles or remove
        } catch (err) {
            console.error("Failed to mark read", err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <DashboardLayout role={user.role.toLowerCase()} user={user}>
            <div className="flex-between mb-4">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Notifications</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Stay updated with your latest activities.</p>
                </div>
                <Button variant="ghost" icon={<Check />} onClick={handleMarkRead}>Mark all as read</Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {notifications.length > 0 ? notifications.map(notif => (
                    <Card key={notif.id} className="p-4" style={{
                        borderLeft: notif.isRead ? 'none' : '4px solid var(--primary-color)',
                        background: notif.isRead ? 'white' : '#F8FAFC'
                    }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: '#E0F2FE', color: '#0284C7',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                            }}>
                                <Bell size={16} weight="fill" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', marginBottom: '4px', fontWeight: notif.isRead ? 600 : 700 }}>{notif.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>{notif.message}</p>
                                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                                    {new Date(notif.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </Card>
                )) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                        <Bell size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                        <p>No notifications yet.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default NotificationsPage;
