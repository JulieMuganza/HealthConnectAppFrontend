import React from 'react';
import './Button.css';
import { CircleNotch } from '@phosphor-icons/react';

/**
 * Button Component
 * @param {string} variant - 'primary', 'secondary', 'ghost', 'danger'
 * @param {string} size - 'sm', 'md', 'lg'
 * @param {boolean} isLoading - Shows a spinner
 * @param {React.ReactNode} icon - Icon component to display
 * @param {string} iconPosition - 'left' | 'right'
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  isLoading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props 
}) => {
  const baseClass = `btn-base btn-${variant} btn-${size} ${fullWidth ? 'w-full' : ''} ${className}`;
  
  return (
    <button 
      className={baseClass} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <CircleNotch className="animate-spin" size={20} />}
      {!isLoading && icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </button>
  );
};

export default Button;
