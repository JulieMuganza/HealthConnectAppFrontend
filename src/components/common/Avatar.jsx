import React from 'react';
import { User } from '@phosphor-icons/react';
import './Avatar.css';

const Avatar = ({ src, alt, size = 'md', status, className = '' }) => {
    // User requested "basic profile icon" everywhere, removing custom images.
    // We will render the User icon by default.
    return (
        <div className={`avatar avatar-${size} ${className}`} style={{ background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
            <User weight="bold" style={{ width: '60%', height: '60%' }} />
            {status && <span className={`avatar-status status-${status}`} />}
        </div>
    );
};

export default Avatar;
