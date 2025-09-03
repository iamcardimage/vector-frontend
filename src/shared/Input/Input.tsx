import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  disabled = false,
  className = '',
}) => {
  const baseClasses =
    'w-full px-3 py-2 border  rouded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const errorClasses = error ? 'border-red-500' : 'border-gray-300';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : '';

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {' '}
          {label}{' '}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`${baseClasses} ${errorClasses} ${disabledClasses}`}
      />
      {error && <p className="mt-1 text-sm text-red-600"></p>}
    </div>
  );
};
