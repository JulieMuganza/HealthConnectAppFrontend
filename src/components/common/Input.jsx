import React from 'react';
import './Input.css';

const Input = ({
    label,
    error,
    icon,
    type = 'text',
    className = '',
    ...props
}) => {
    return (
        <div className={`input-wrapper ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <div className={`input-container ${error ? 'has-error' : ''}`}>
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    className="input-field"
                    type={type}
                    {...props}
                />
            </div>
            {error && <span className="input-error">{error}</span>}
        </div>
    );
};

export default Input;
