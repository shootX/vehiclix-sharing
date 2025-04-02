import React from 'react';

interface FormGroupProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  error,
  required = false,
  children,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="mt-1">{children}</div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormGroup; 