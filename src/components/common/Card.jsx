import React from 'react';
import './Card.css';

const Card = ({ children, className = '', noPadding = false, ...props }) => {
    return (
        <div
            className={`glass-panel card-base ${noPadding ? 'p-0' : 'p-6'} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
