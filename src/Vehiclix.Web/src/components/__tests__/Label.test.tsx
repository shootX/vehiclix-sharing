import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from '../Label';

describe('Label', () => {
  it('should render label with text', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render label with htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('htmlFor', 'test-input');
  });

  it('should render required indicator when required is true', () => {
    render(<Label required>Test Label</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-500');
  });

  it('should apply correct styling to label', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toHaveClass(
      'block',
      'text-sm',
      'font-medium',
      'text-gray-700'
    );
  });

  it('should apply correct styling to required indicator', () => {
    render(<Label required>Test Label</Label>);
    expect(screen.getByText('*')).toHaveClass('ml-0.5', 'text-red-500');
  });

  it('should handle empty text', () => {
    render(<Label></Label>);
    expect(screen.getByText('')).toBeInTheDocument();
  });

  it('should handle null text', () => {
    render(<Label>{null}</Label>);
    expect(screen.getByText('')).toBeInTheDocument();
  });

  it('should handle undefined text', () => {
    render(<Label>{undefined}</Label>);
    expect(screen.getByText('')).toBeInTheDocument();
  });

  it('should handle special characters in text', () => {
    render(<Label>Test Label!@#$%^&*()</Label>);
    expect(screen.getByText('Test Label!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle long text', () => {
    const longText = 'This is a very long label text that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.';
    render(<Label>{longText}</Label>);
    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it('should handle htmlFor with special characters', () => {
    render(<Label htmlFor="test-input!@#$%^&*()">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('htmlFor', 'test-input!@#$%^&*()');
  });

  it('should handle htmlFor with long text', () => {
    const longHtmlFor = 'This is a very long htmlFor value that should be handled properly without any issues. It should be valid and maintain its formatting.';
    render(<Label htmlFor={longHtmlFor}>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('htmlFor', longHtmlFor);
  });

  it('should handle children with React elements', () => {
    render(
      <Label>
        <span>Test</span> <span>Label</span>
      </Label>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('should handle children with mixed content', () => {
    render(
      <Label>
        <span>Test</span> Text <span>Label</span>
      </Label>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('should handle children with numbers', () => {
    render(<Label>Test Label {123}</Label>);
    expect(screen.getByText('Test Label 123')).toBeInTheDocument();
  });

  it('should handle children with boolean values', () => {
    render(<Label>Test Label {true} {false}</Label>);
    expect(screen.getByText('Test Label true false')).toBeInTheDocument();
  });

  it('should handle children with arrays', () => {
    render(<Label>Test Label {['a', 'b', 'c']}</Label>);
    expect(screen.getByText('Test Label abc')).toBeInTheDocument();
  });

  it('should handle children with objects', () => {
    render(<Label>Test Label {{ toString: () => 'object' }}</Label>);
    expect(screen.getByText('Test Label object')).toBeInTheDocument();
  });

  it('should handle children with functions', () => {
    render(<Label>Test Label {() => 'function'}</Label>);
    expect(screen.getByText('Test Label function')).toBeInTheDocument();
  });

  it('should handle children with null values', () => {
    render(<Label>Test Label {null}</Label>);
    expect(screen.getByText('Test Label ')).toBeInTheDocument();
  });

  it('should handle children with undefined values', () => {
    render(<Label>Test Label {undefined}</Label>);
    expect(screen.getByText('Test Label ')).toBeInTheDocument();
  });

  it('should handle children with NaN values', () => {
    render(<Label>Test Label {NaN}</Label>);
    expect(screen.getByText('Test Label NaN')).toBeInTheDocument();
  });

  it('should handle children with Infinity values', () => {
    render(<Label>Test Label {Infinity}</Label>);
    expect(screen.getByText('Test Label Infinity')).toBeInTheDocument();
  });

  it('should handle children with -Infinity values', () => {
    render(<Label>Test Label {-Infinity}</Label>);
    expect(screen.getByText('Test Label -Infinity')).toBeInTheDocument();
  });

  it('should handle children with Date objects', () => {
    const date = new Date('2023-01-01');
    render(<Label>Test Label {date}</Label>);
    expect(screen.getByText(`Test Label ${date.toString()}`)).toBeInTheDocument();
  });

  it('should handle children with RegExp objects', () => {
    const regex = /test/;
    render(<Label>Test Label {regex}</Label>);
    expect(screen.getByText(`Test Label ${regex.toString()}`)).toBeInTheDocument();
  });

  it('should handle children with Error objects', () => {
    const error = new Error('test error');
    render(<Label>Test Label {error}</Label>);
    expect(screen.getByText(`Test Label ${error.toString()}`)).toBeInTheDocument();
  });
}); 