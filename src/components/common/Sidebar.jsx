import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'; // added useLocation for re-render trigger if needed
import api from '../../services/api';
import {
    SquaresFour,
    Users,
    Calendar,
    ChatCircleDots,
    Pill,
    Gear,
    SignOut,
    CaretLeft,
    CaretRight,
    Bell
} from '@phosphor-icons/react';
import './Sidebar.css';

const Sidebar = ({ role = 'patient', isOpen, onToggle, messageCount = 0, reminderCount = 0 }) => {
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);

    // Fetch unread count
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await api.get('/notifications/count');
                setUnreadCount(res.data.count);
            } catch (err) {
                console.error("Failed to fetch notification count", err);
            }
        };
        fetchCount();
        const interval = setInterval(fetchCount, 5000); // Poll every 5s for better responsiveness
        return () => clearInterval(interval);
    }, []);

    // Dynamic menu items logic to inject badges/glows
    const getMenuItems = (role) => {
        const commonItems = [
            { icon: <SquaresFour weight="bold" />, label: role === 'doctor' ? 'Dashboard' : 'Overview', path: role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard' },
            {
                icon: <ChatCircleDots weight="bold" />,
                label: 'Messages',
                path: role === 'doctor' ? '/doctor/messages' : '/patient/messages',
                isMessage: true, // Marker for styling
                count: messageCount
            },
            { icon: <Bell weight="bold" />, label: 'Notifications', path: '/notifications', badge: unreadCount }, // Keep total unread here or use reminderCount if preferred. User said "Sidebar Notifications... keep current display"
        ];

        if (role === 'doctor') {
            return [
                commonItems[0], // Dashboard
                { icon: <Users weight="bold" />, label: 'Patients', path: '/doctor/patients' },
                { icon: <Calendar weight="bold" />, label: 'Schedule', path: '/doctor/schedule' },
                commonItems[1], // Messages
                commonItems[2], // Notifications
            ];
        } else {
            return [
                commonItems[0], // Overview
                { icon: <Calendar weight="bold" />, label: 'Appointments', path: '/patient/appointments' },
                { icon: <Pill weight="bold" />, label: 'Medications', path: '/patient/medications' },
                commonItems[1], // Messages
                commonItems[2], // Notifications
            ];
        }
    };

    const menuItems = getMenuItems(role);

    return (
        <aside className={`sidebar-pro ${isOpen ? 'expanded' : 'collapsed'}`}>
            <div className="sidebar-header">
                <div className="logo-container">
                    <div className="logo-icon">+</div>
                    {isOpen && <span className="logo-text">HealthConnect</span>}
                </div>
                <button className="collapse-btn" onClick={onToggle}>
                    {isOpen ? <CaretLeft /> : <CaretRight />}
                </button>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item-pro ${isActive ? 'active' : ''} ${item.isMessage && item.count > 0 ? 'green-glow' : ''}`}
                        style={{ position: 'relative' }}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        {isOpen && <span className="nav-label">{item.label}</span>}

                        {/* Red Badge for Notifications (Standard) */}
                        {item.badge > 0 && (
                            <span style={{
                                position: 'absolute',
                                right: isOpen ? '20px' : '4px',
                                top: isOpen ? '50%' : '4px',
                                transform: isOpen ? 'translateY(-50%)' : 'none',
                                background: '#EF4444',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                padding: '2px 6px',
                                borderRadius: '10px',
                                minWidth: '18px',
                                textAlign: 'center'
                            }}>
                                {item.badge > 9 ? '9+' : item.badge}
                            </span>
                        )}

                        {/* Green Badge for Messages (New Feature) */}
                        {item.isMessage && item.count > 0 && isOpen && (
                            <span className="message-badge">
                                {item.count} New
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item-pro logout" onClick={() => navigate('/login')}>
                    <span className="nav-icon"><SignOut weight="bold" /></span>
                    {isOpen && <span className="nav-label">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
