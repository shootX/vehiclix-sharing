import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should render button with icon', () => {
    render(
      <Button>
        <svg data-testid="test-icon" />
        Test Button
      </Button>
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should render button with only icon', () => {
    render(
      <Button>
        <svg data-testid="test-icon" />
      </Button>
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle onClick event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);
    fireEvent.click(screen.getByText('Test Button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should be disabled when disabled is true', () => {
    render(<Button disabled>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeDisabled();
  });

  it('should show loading spinner when isLoading is true', () => {
    render(<Button isLoading>Test Button</Button>);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should not show loading spinner when isLoading is false', () => {
    render(<Button isLoading={false}>Test Button</Button>);
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  it('should apply correct styling to primary button', () => {
    render(<Button variant="primary">Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass(
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-blue-500'
    );
  });

  it('should apply correct styling to secondary button', () => {
    render(<Button variant="secondary">Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass(
      'bg-white',
      'text-gray-700',
      'border',
      'border-gray-300',
      'hover:bg-gray-50',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-blue-500'
    );
  });

  it('should apply correct styling to danger button', () => {
    render(<Button variant="danger">Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass(
      'bg-red-600',
      'text-white',
      'hover:bg-red-700',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-red-500'
    );
  });

  it('should apply correct styling to success button', () => {
    render(<Button variant="success">Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass(
      'bg-green-600',
      'text-white',
      'hover:bg-green-700',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-green-500'
    );
  });

  it('should apply correct styling to warning button', () => {
    render(<Button variant="warning">Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass(
      'bg-yellow-600',
      'text-white',
      'hover:bg-yellow-700',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-yellow-500'
    );
  });

  it('should apply correct styling to info button', () => {
    render(<Button variant="info">Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass(
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-blue-500'
    );
  });

  it('should apply correct styling to disabled button', () => {
    render(<Button disabled>Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass(
      'opacity-50',
      'cursor-not-allowed'
    );
  });

  it('should apply correct styling to loading button', () => {
    render(<Button isLoading>Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass(
      'opacity-75',
      'cursor-wait'
    );
  });

  it('should apply correct styling to small button', () => {
    render(<Button size="sm">Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass(
      'px-3',
      'py-1.5',
      'text-sm'
    );
  });

  it('should apply correct styling to medium button', () => {
    render(<Button size="md">Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass(
      'px-4',
      'py-2',
      'text-sm'
    );
  });

  it('should apply correct styling to large button', () => {
    render(<Button size="lg">Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass(
      'px-6',
      'py-3',
      'text-base'
    );
  });

  it('should apply correct styling to full width button', () => {
    render(<Button fullWidth>Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass('w-full');
  });

  it('should handle empty text', () => {
    render(<Button></Button>);
    expect(screen.getByText('')).toBeInTheDocument();
  });

  it('should handle null text', () => {
    render(<Button>{null}</Button>);
    expect(screen.getByText('')).toBeInTheDocument();
  });

  it('should handle undefined text', () => {
    render(<Button>{undefined}</Button>);
    expect(screen.getByText('')).toBeInTheDocument();
  });

  it('should handle special characters in text', () => {
    render(<Button>Test Button!@#$%^&*()</Button>);
    expect(screen.getByText('Test Button!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle long text', () => {
    const longText = 'This is a very long button text that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.';
    render(<Button>{longText}</Button>);
    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it('should handle children with React elements', () => {
    render(
      <Button>
        <span>Test</span> <span>Button</span>
      </Button>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('should handle children with mixed content', () => {
    render(
      <Button>
        <span>Test</span> Text <span>Button</span>
      </Button>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('should handle children with numbers', () => {
    render(<Button>Test Button {123}</Button>);
    expect(screen.getByText('Test Button 123')).toBeInTheDocument();
  });

  it('should handle children with boolean values', () => {
    render(<Button>Test Button {true} {false}</Button>);
    expect(screen.getByText('Test Button true false')).toBeInTheDocument();
  });

  it('should handle children with arrays', () => {
    render(<Button>Test Button {['a', 'b', 'c']}</Button>);
    expect(screen.getByText('Test Button abc')).toBeInTheDocument();
  });

  it('should handle children with objects', () => {
    render(<Button>Test Button {{ toString: () => 'object' }}</Button>);
    expect(screen.getByText('Test Button object')).toBeInTheDocument();
  });

  it('should handle children with functions', () => {
    render(<Button>Test Button {() => 'function'}</Button>);
    expect(screen.getByText('Test Button function')).toBeInTheDocument();
  });

  it('should handle children with null values', () => {
    render(<Button>Test Button {null}</Button>);
    expect(screen.getByText('Test Button ')).toBeInTheDocument();
  });

  it('should handle children with undefined values', () => {
    render(<Button>Test Button {undefined}</Button>);
    expect(screen.getByText('Test Button ')).toBeInTheDocument();
  });

  it('should handle children with NaN values', () => {
    render(<Button>Test Button {NaN}</Button>);
    expect(screen.getByText('Test Button NaN')).toBeInTheDocument();
  });

  it('should handle children with Infinity values', () => {
    render(<Button>Test Button {Infinity}</Button>);
    expect(screen.getByText('Test Button Infinity')).toBeInTheDocument();
  });

  it('should handle children with -Infinity values', () => {
    render(<Button>Test Button {-Infinity}</Button>);
    expect(screen.getByText('Test Button -Infinity')).toBeInTheDocument();
  });

  it('should handle children with Date objects', () => {
    const date = new Date('2023-01-01');
    render(<Button>Test Button {date}</Button>);
    expect(screen.getByText(`Test Button ${date.toString()}`)).toBeInTheDocument();
  });

  it('should handle children with RegExp objects', () => {
    const regex = /test/;
    render(<Button>Test Button {regex}</Button>);
    expect(screen.getByText(`Test Button ${regex.toString()}`)).toBeInTheDocument();
  });

  it('should handle children with Error objects', () => {
    const error = new Error('test error');
    render(<Button>Test Button {error}</Button>);
    expect(screen.getByText(`Test Button ${error.toString()}`)).toBeInTheDocument();
  });
}); 