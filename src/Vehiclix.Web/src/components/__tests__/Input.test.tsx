import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input', () => {
  it('should render input with default props', () => {
    render(<Input type="text" name="test" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'test');
  });

  it('should render input with custom value', () => {
    render(<Input type="text" name="test" value="test value" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test value');
  });

  it('should render input with placeholder', () => {
    render(<Input type="text" name="test" placeholder="Test placeholder" />);
    const input = screen.getByPlaceholderText('Test placeholder');
    expect(input).toBeInTheDocument();
  });

  it('should render input with label', () => {
    render(<Input type="text" name="test" label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render required indicator when required is true', () => {
    render(<Input type="text" name="test" label="Test Label" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-500');
  });

  it('should render error message when error is provided', () => {
    render(<Input type="text" name="test" error="Test Error" />);
    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toHaveClass('text-red-500');
  });

  it('should render help text when help is provided', () => {
    render(<Input type="text" name="test" help="Test Help" />);
    expect(screen.getByText('Test Help')).toBeInTheDocument();
    expect(screen.getByText('Test Help')).toHaveClass('text-gray-500');
  });

  it('should handle onChange event', () => {
    const handleChange = jest.fn();
    render(<Input type="text" name="test" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle onBlur event', () => {
    const handleBlur = jest.fn();
    render(<Input type="text" name="test" onBlur={handleBlur} />);
    const input = screen.getByRole('textbox');
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should handle onFocus event', () => {
    const handleFocus = jest.fn();
    render(<Input type="text" name="test" onFocus={handleFocus} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();
  });

  it('should be disabled when disabled is true', () => {
    render(<Input type="text" name="test" disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should be read-only when readOnly is true', () => {
    render(<Input type="text" name="test" readOnly />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readOnly');
  });

  it('should apply correct styling to input', () => {
    render(<Input type="text" name="test" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'block',
      'w-full',
      'rounded-md',
      'border-gray-300',
      'shadow-sm',
      'focus:border-blue-500',
      'focus:ring-blue-500',
      'sm:text-sm'
    );
  });

  it('should apply correct styling to input with error', () => {
    render(<Input type="text" name="test" error="Test Error" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'block',
      'w-full',
      'rounded-md',
      'border-red-300',
      'shadow-sm',
      'focus:border-red-500',
      'focus:ring-red-500',
      'sm:text-sm'
    );
  });

  it('should apply correct styling to label', () => {
    render(<Input type="text" name="test" label="Test Label" />);
    expect(screen.getByText('Test Label')).toHaveClass(
      'block',
      'text-sm',
      'font-medium',
      'text-gray-700'
    );
  });

  it('should apply correct styling to error message', () => {
    render(<Input type="text" name="test" error="Test Error" />);
    expect(screen.getByText('Test Error')).toHaveClass(
      'mt-1',
      'text-sm',
      'text-red-500'
    );
  });

  it('should apply correct styling to help text', () => {
    render(<Input type="text" name="test" help="Test Help" />);
    expect(screen.getByText('Test Help')).toHaveClass(
      'mt-1',
      'text-sm',
      'text-gray-500'
    );
  });

  it('should apply correct styling to container', () => {
    const { container } = render(<Input type="text" name="test" />);
    expect(container.firstChild).toHaveClass('space-y-1');
  });

  it('should handle empty label', () => {
    render(<Input type="text" name="test" label="" />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('should handle null label', () => {
    render(<Input type="text" name="test" label={null} />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('should handle undefined label', () => {
    render(<Input type="text" name="test" label={undefined} />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('should handle empty error message', () => {
    render(<Input type="text" name="test" error="" />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle null error message', () => {
    render(<Input type="text" name="test" error={null} />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle undefined error message', () => {
    render(<Input type="text" name="test" error={undefined} />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle empty help text', () => {
    render(<Input type="text" name="test" help="" />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle null help text', () => {
    render(<Input type="text" name="test" help={null} />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle undefined help text', () => {
    render(<Input type="text" name="test" help={undefined} />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle special characters in label', () => {
    render(<Input type="text" name="test" label="Test Label!@#$%^&*()" />);
    expect(screen.getByText('Test Label!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle special characters in error message', () => {
    render(<Input type="text" name="test" error="Test Error!@#$%^&*()" />);
    expect(screen.getByText('Test Error!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle special characters in help text', () => {
    render(<Input type="text" name="test" help="Test Help!@#$%^&*()" />);
    expect(screen.getByText('Test Help!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle long label text', () => {
    const longLabel = 'This is a very long label text that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.';
    render(<Input type="text" name="test" label={longLabel} />);
    expect(screen.getByText(longLabel)).toBeInTheDocument();
  });

  it('should handle long error message', () => {
    const longError = 'This is a very long error message that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.';
    render(<Input type="text" name="test" error={longError} />);
    expect(screen.getByText(longError)).toBeInTheDocument();
  });

  it('should handle long help text', () => {
    const longHelp = 'This is a very long help text that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.';
    render(<Input type="text" name="test" help={longHelp} />);
    expect(screen.getByText(longHelp)).toBeInTheDocument();
  });
}); 