import React from 'react';
import { render, screen } from '@testing-library/react';
import FormValidation from '../FormValidation';
import { ValidationError } from '../../types/validation';

describe('FormValidation', () => {
  const mockErrors: ValidationError[] = [
    { field: 'email', message: 'Invalid email' },
    { field: 'password', message: 'Password is required' },
  ];

  it('should render nothing when there are no errors', () => {
    const { container } = render(<FormValidation errors={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render error messages when there are errors', () => {
    render(<FormValidation errors={mockErrors} />);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('should render error messages with correct styling', () => {
    render(<FormValidation errors={mockErrors} />);

    const errorMessages = screen.getAllByRole('listitem');
    errorMessages.forEach((message) => {
      expect(message).toHaveClass('text-red-500');
    });
  });

  it('should render error container with correct styling', () => {
    const { container } = render(<FormValidation errors={mockErrors} />);
    const errorContainer = container.firstChild;

    expect(errorContainer).toHaveClass(
      'bg-red-50',
      'border',
      'border-red-200',
      'rounded-md',
      'p-4',
      'mb-4'
    );
  });

  it('should render error icon', () => {
    render(<FormValidation errors={mockErrors} />);
    const errorIcon = screen.getByTestId('error-icon');

    expect(errorIcon).toBeInTheDocument();
    expect(errorIcon).toHaveClass('text-red-400');
  });

  it('should render error list with correct styling', () => {
    const { container } = render(<FormValidation errors={mockErrors} />);
    const errorList = container.querySelector('ul');

    expect(errorList).toHaveClass('list-disc', 'list-inside', 'space-y-1');
  });

  it('should handle empty errors array', () => {
    const { container } = render(<FormValidation errors={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should handle null errors', () => {
    const { container } = render(<FormValidation errors={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should handle undefined errors', () => {
    const { container } = render(<FormValidation errors={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should handle errors with empty messages', () => {
    const errorsWithEmptyMessages: ValidationError[] = [
      { field: 'email', message: '' },
      { field: 'password', message: '' },
    ];

    render(<FormValidation errors={errorsWithEmptyMessages} />);
    const errorMessages = screen.queryAllByRole('listitem');
    expect(errorMessages).toHaveLength(0);
  });

  it('should handle errors with null messages', () => {
    const errorsWithNullMessages: ValidationError[] = [
      { field: 'email', message: null },
      { field: 'password', message: null },
    ];

    render(<FormValidation errors={errorsWithNullMessages} />);
    const errorMessages = screen.queryAllByRole('listitem');
    expect(errorMessages).toHaveLength(0);
  });

  it('should handle errors with undefined messages', () => {
    const errorsWithUndefinedMessages: ValidationError[] = [
      { field: 'email', message: undefined },
      { field: 'password', message: undefined },
    ];

    render(<FormValidation errors={errorsWithUndefinedMessages} />);
    const errorMessages = screen.queryAllByRole('listitem');
    expect(errorMessages).toHaveLength(0);
  });

  it('should handle errors with special characters in messages', () => {
    const errorsWithSpecialChars: ValidationError[] = [
      { field: 'email', message: 'Invalid email!@#$%^&*()' },
      { field: 'password', message: 'Password is required!@#$%^&*()' },
    ];

    render(<FormValidation errors={errorsWithSpecialChars} />);

    expect(screen.getByText('Invalid email!@#$%^&*()')).toBeInTheDocument();
    expect(screen.getByText('Password is required!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle errors with long messages', () => {
    const longMessage = 'This is a very long error message that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.';
    const errorsWithLongMessages: ValidationError[] = [
      { field: 'email', message: longMessage },
      { field: 'password', message: longMessage },
    ];

    render(<FormValidation errors={errorsWithLongMessages} />);

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });
}); 