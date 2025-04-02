import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormButtons from '../FormButtons';

describe('FormButtons', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render submit button with default label', () => {
    render(<FormButtons onSubmit={mockOnSubmit} />);
    expect(screen.getByText('შენახვა')).toBeInTheDocument();
  });

  it('should render submit button with custom label', () => {
    render(<FormButtons onSubmit={mockOnSubmit} submitLabel="Custom Submit" />);
    expect(screen.getByText('Custom Submit')).toBeInTheDocument();
  });

  it('should render cancel button when onCancel is provided', () => {
    render(<FormButtons onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    expect(screen.getByText('გაუქმება')).toBeInTheDocument();
  });

  it('should render cancel button with custom label', () => {
    render(
      <FormButtons
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        cancelLabel="Custom Cancel"
      />
    );
    expect(screen.getByText('Custom Cancel')).toBeInTheDocument();
  });

  it('should call onSubmit when submit button is clicked', () => {
    render(<FormButtons onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByText('შენახვა'));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when cancel button is clicked', () => {
    render(<FormButtons onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByText('გაუქმება'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should disable submit button when isLoading is true', () => {
    render(<FormButtons onSubmit={mockOnSubmit} isLoading={true} />);
    const submitButton = screen.getByText('შენახვა');
    expect(submitButton).toBeDisabled();
  });

  it('should disable submit button when disabled is true', () => {
    render(<FormButtons onSubmit={mockOnSubmit} disabled={true} />);
    const submitButton = screen.getByText('შენახვა');
    expect(submitButton).toBeDisabled();
  });

  it('should disable cancel button when disabled is true', () => {
    render(<FormButtons onSubmit={mockOnSubmit} onCancel={mockOnCancel} disabled={true} />);
    const cancelButton = screen.getByText('გაუქმება');
    expect(cancelButton).toBeDisabled();
  });

  it('should show loading spinner when isLoading is true', () => {
    render(<FormButtons onSubmit={mockOnSubmit} isLoading={true} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should not show loading spinner when isLoading is false', () => {
    render(<FormButtons onSubmit={mockOnSubmit} isLoading={false} />);
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  it('should apply correct styling to submit button', () => {
    render(<FormButtons onSubmit={mockOnSubmit} />);
    const submitButton = screen.getByText('შენახვა');
    expect(submitButton).toHaveClass('bg-blue-600', 'text-white');
  });

  it('should apply correct styling to cancel button', () => {
    render(<FormButtons onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    const cancelButton = screen.getByText('გაუქმება');
    expect(cancelButton).toHaveClass('bg-white', 'text-gray-700');
  });

  it('should apply correct styling to disabled buttons', () => {
    render(<FormButtons onSubmit={mockOnSubmit} onCancel={mockOnCancel} disabled={true} />);
    const submitButton = screen.getByText('შენახვა');
    const cancelButton = screen.getByText('გაუქმება');
    expect(submitButton).toHaveClass('opacity-50', 'cursor-not-allowed');
    expect(cancelButton).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('should handle form submission with preventDefault', () => {
    render(<FormButtons onSubmit={mockOnSubmit} />);
    const submitButton = screen.getByText('შენახვა');
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should not call onSubmit when button is disabled', () => {
    render(<FormButtons onSubmit={mockOnSubmit} disabled={true} />);
    fireEvent.click(screen.getByText('შენახვა'));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should not call onCancel when button is disabled', () => {
    render(<FormButtons onSubmit={mockOnSubmit} onCancel={mockOnCancel} disabled={true} />);
    fireEvent.click(screen.getByText('გაუქმება'));
    expect(mockOnCancel).not.toHaveBeenCalled();
  });
}); 