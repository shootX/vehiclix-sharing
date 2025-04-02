import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../Select';

describe('Select', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  it('should render select with default props', () => {
    render(<Select name="test" options={options} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('name', 'test');
  });

  it('should render select with custom value', () => {
    render(<Select name="test" options={options} value="2" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('2');
  });

  it('should render select with placeholder', () => {
    render(<Select name="test" options={options} placeholder="Select an option" />);
    const placeholder = screen.getByText('Select an option');
    expect(placeholder).toBeInTheDocument();
  });

  it('should render select with label', () => {
    render(<Select name="test" options={options} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render required indicator when required is true', () => {
    render(<Select name="test" options={options} label="Test Label" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-500');
  });

  it('should render error message when error is provided', () => {
    render(<Select name="test" options={options} error="Test Error" />);
    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toHaveClass('text-red-500');
  });

  it('should render help text when help is provided', () => {
    render(<Select name="test" options={options} help="Test Help" />);
    expect(screen.getByText('Test Help')).toBeInTheDocument();
    expect(screen.getByText('Test Help')).toHaveClass('text-gray-500');
  });

  it('should handle onChange event', () => {
    const handleChange = jest.fn();
    render(<Select name="test" options={options} onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle onBlur event', () => {
    const handleBlur = jest.fn();
    render(<Select name="test" options={options} onBlur={handleBlur} />);
    const select = screen.getByRole('combobox');
    fireEvent.blur(select);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should handle onFocus event', () => {
    const handleFocus = jest.fn();
    render(<Select name="test" options={options} onFocus={handleFocus} />);
    const select = screen.getByRole('combobox');
    fireEvent.focus(select);
    expect(handleFocus).toHaveBeenCalled();
  });

  it('should be disabled when disabled is true', () => {
    render(<Select name="test" options={options} disabled />);
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('should apply correct styling to select', () => {
    render(<Select name="test" options={options} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(
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

  it('should apply correct styling to select with error', () => {
    render(<Select name="test" options={options} error="Test Error" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(
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
    render(<Select name="test" options={options} label="Test Label" />);
    expect(screen.getByText('Test Label')).toHaveClass(
      'block',
      'text-sm',
      'font-medium',
      'text-gray-700'
    );
  });

  it('should apply correct styling to error message', () => {
    render(<Select name="test" options={options} error="Test Error" />);
    expect(screen.getByText('Test Error')).toHaveClass(
      'mt-1',
      'text-sm',
      'text-red-500'
    );
  });

  it('should apply correct styling to help text', () => {
    render(<Select name="test" options={options} help="Test Help" />);
    expect(screen.getByText('Test Help')).toHaveClass(
      'mt-1',
      'text-sm',
      'text-gray-500'
    );
  });

  it('should apply correct styling to container', () => {
    const { container } = render(<Select name="test" options={options} />);
    expect(container.firstChild).toHaveClass('space-y-1');
  });

  it('should handle empty label', () => {
    render(<Select name="test" options={options} label="" />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('should handle null label', () => {
    render(<Select name="test" options={options} label={null} />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('should handle undefined label', () => {
    render(<Select name="test" options={options} label={undefined} />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('should handle empty error message', () => {
    render(<Select name="test" options={options} error="" />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle null error message', () => {
    render(<Select name="test" options={options} error={null} />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle undefined error message', () => {
    render(<Select name="test" options={options} error={undefined} />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle empty help text', () => {
    render(<Select name="test" options={options} help="" />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle null help text', () => {
    render(<Select name="test" options={options} help={null} />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle undefined help text', () => {
    render(<Select name="test" options={options} help={undefined} />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle special characters in label', () => {
    render(<Select name="test" options={options} label="Test Label!@#$%^&*()" />);
    expect(screen.getByText('Test Label!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle special characters in error message', () => {
    render(<Select name="test" options={options} error="Test Error!@#$%^&*()" />);
    expect(screen.getByText('Test Error!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle special characters in help text', () => {
    render(<Select name="test" options={options} help="Test Help!@#$%^&*()" />);
    expect(screen.getByText('Test Help!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle long label text', () => {
    const longLabel = 'This is a very long label text that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.';
    render(<Select name="test" options={options} label={longLabel} />);
    expect(screen.getByText(longLabel)).toBeInTheDocument();
  });

  it('should handle long error message', () => {
    const longError = 'This is a very long error message that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.';
    render(<Select name="test" options={options} error={longError} />);
    expect(screen.getByText(longError)).toBeInTheDocument();
  });

  it('should handle long help text', () => {
    const longHelp = 'This is a very long help text that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.';
    render(<Select name="test" options={options} help={longHelp} />);
    expect(screen.getByText(longHelp)).toBeInTheDocument();
  });

  it('should handle empty options array', () => {
    render(<Select name="test" options={[]} />);
    const select = screen.getByRole('combobox');
    expect(select.children).toHaveLength(1); // Only placeholder option
  });

  it('should handle null options', () => {
    render(<Select name="test" options={null} />);
    const select = screen.getByRole('combobox');
    expect(select.children).toHaveLength(1); // Only placeholder option
  });

  it('should handle undefined options', () => {
    render(<Select name="test" options={undefined} />);
    const select = screen.getByRole('combobox');
    expect(select.children).toHaveLength(1); // Only placeholder option
  });

  it('should handle options with special characters', () => {
    const specialOptions = [
      { value: '1', label: 'Option 1!@#$%^&*()' },
      { value: '2', label: 'Option 2!@#$%^&*()' },
    ];
    render(<Select name="test" options={specialOptions} />);
    expect(screen.getByText('Option 1!@#$%^&*()')).toBeInTheDocument();
    expect(screen.getByText('Option 2!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle options with long labels', () => {
    const longOptions = [
      { value: '1', label: 'This is a very long option label that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.' },
      { value: '2', label: 'Another very long option label that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.' },
    ];
    render(<Select name="test" options={longOptions} />);
    expect(screen.getByText(longOptions[0].label)).toBeInTheDocument();
    expect(screen.getByText(longOptions[1].label)).toBeInTheDocument();
  });
}); 