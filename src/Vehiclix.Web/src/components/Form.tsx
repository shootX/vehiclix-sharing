import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children, className = '', ...props }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-6 ${className}`}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form; 