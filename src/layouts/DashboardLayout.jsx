import React, { useState } from 'react';
import { List, Bell, Gear, User } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/common/Avatar';
import Sidebar from '../components/common/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ children, role = 'patient', user, disablePadding = false }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const navigate = useNavigate();

    // Fetch Notifications
    React.useEffect(() => {
        import('../services/api').then(module => {
            const api = module.default;
            const fetchNotifs = async () => {
                try {
                    const [resList, resCount] = await Promise.all([
                        api.get('/notifications'),
                        api.get('/notifications/count')
                    ]);
                    setNotifications(resList.data.slice(0, 5)); // Show recent 5
                    setUnreadCount(resCount.data.count);
                } catch (e) {
                    console.error(e);
                }
            };
            fetchNotifs();
            // Optional: Poll
            const interval = setInterval(fetchNotifs, 30000);
            return () => clearInterval(interval);
        });
    }, []);

    const handleProfileClick = () => {
        navigate(role === 'doctor' ? '/doctor/profile' : '/patient/profile');
    };

    const handleMarkAllRead = async () => {
        try {
            const api = (await import('../services/api')).default;
            await api.put('/notifications/read');
            setUnreadCount(0);
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar - Desktop & Tablet */}
            <div className={`desktop-sidebar-wrapper ${mobileMenuOpen ? 'mobile-visible' : ''}`}>
                <Sidebar
                    role={role}
                    isOpen={sidebarOpen}
                    onToggle={() => setSidebarOpen(!sidebarOpen)}
                />
                {/* Mobile Overlay */}
                {mobileMenuOpen && (
                    <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
                )}
            </div>

            {/* Main Content */}
            <main className="main-content">
                <header className="top-bar-pro">
                    <div className="top-bar-left">
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <List size={24} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', position: 'relative' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            {/* Notification Bell */}
                            <button
                                onClick={() => setNotificationsOpen(!notificationsOpen)}
                                style={{ background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}
                            >
                                <Bell size={20} weight="bold" />
                                {unreadCount > 0 && (
                                    <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', background: 'var(--error-color)', borderRadius: '50%', border: '1px solid white' }}></div>
                                )}
                            </button>
                        </div>

                        {/* Notifications Popover */}
                        {notificationsOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '50px',
                                right: '60px',
                                width: '320px',
                                background: 'white',
                                borderRadius: '16px',
                                boxShadow: 'var(--shadow-lg)',
                                padding: '16px',
                                zIndex: 100,
                                border: '1px solid var(--border-color)'
                            }}>
                                <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem' }}>Notifications</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                                    {notifications.length > 0 ? notifications.map(notif => (
                                        <div
                                            key={notif.id}
                                            onClick={() => { navigate('/notifications'); setNotificationsOpen(false); }}
                                            style={{ display: 'flex', gap: '8px', alignItems: 'start', cursor: 'pointer', opacity: notif.isRead ? 0.6 : 1 }}
                                        >
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: notif.type === 'REMINDER' ? 'var(--warning-color)' : 'var(--primary-color)', marginTop: '6px', flexShrink: 0 }}></div>
                                            <div>
                                                <p style={{ fontSize: '0.9rem', margin: 0 }}>{notif.message}</p>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                    {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    )) : <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No notifications.</p>}
                                </div>
                                <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '8px', textAlign: 'center' }}>
                                    <button
                                        onClick={handleMarkAllRead}
                                        style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.85rem', cursor: 'pointer' }}
                                    >
                                        Mark all as read
                                    </button>
                                </div>
                            </div>
                        )}

                        <div
                            className="user-profile-pro"
                            onClick={handleProfileClick}
                            style={{ cursor: 'pointer' }}
                        >
                            <span className="user-name" style={{ marginRight: '8px', fontSize: '0.85rem' }}>{user?.name?.split(' ')[0] || 'User'}</span>
                            <Avatar src={user?.avatar} size="sm" />
                        </div>
                    </div>
                </header>

                <div className={`content-scrollable-pro ${disablePadding ? 'no-padding' : ''}`}>
                    <div className="content-container" style={disablePadding ? { maxWidth: '100%', margin: 0, height: '100%' } : {}}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
