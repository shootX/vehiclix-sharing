import React from 'react';
import { render, screen } from '@testing-library/react';
import FormGroup from '../FormGroup';
import Input from '../Input';

describe('FormGroup', () => {
  it('should render label', () => {
    render(
      <FormGroup label="Test Label">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render required indicator when required is true', () => {
    render(
      <FormGroup label="Test Label" required>
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-500');
  });

  it('should render error message when error is provided', () => {
    render(
      <FormGroup label="Test Label" error="Test Error">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toHaveClass('text-red-500');
  });

  it('should render help text when help is provided', () => {
    render(
      <FormGroup label="Test Label" help="Test Help">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText('Test Help')).toBeInTheDocument();
    expect(screen.getByText('Test Help')).toHaveClass('text-gray-500');
  });

  it('should render children', () => {
    render(
      <FormGroup label="Test Label">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should apply correct styling to label', () => {
    render(
      <FormGroup label="Test Label">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText('Test Label')).toHaveClass('block', 'text-sm', 'font-medium', 'text-gray-700');
  });

  it('should apply correct styling to error message', () => {
    render(
      <FormGroup label="Test Label" error="Test Error">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText('Test Error')).toHaveClass('mt-1', 'text-sm', 'text-red-500');
  });

  it('should apply correct styling to help text', () => {
    render(
      <FormGroup label="Test Label" help="Test Help">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText('Test Help')).toHaveClass('mt-1', 'text-sm', 'text-gray-500');
  });

  it('should apply correct styling to container', () => {
    const { container } = render(
      <FormGroup label="Test Label">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(container.firstChild).toHaveClass('space-y-1');
  });

  it('should handle empty label', () => {
    render(
      <FormGroup label="">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('should handle null label', () => {
    render(
      <FormGroup label={null}>
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('should handle undefined label', () => {
    render(
      <FormGroup label={undefined}>
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('should handle empty error message', () => {
    render(
      <FormGroup label="Test Label" error="">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle null error message', () => {
    render(
      <FormGroup label="Test Label" error={null}>
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle undefined error message', () => {
    render(
      <FormGroup label="Test Label" error={undefined}>
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle empty help text', () => {
    render(
      <FormGroup label="Test Label" help="">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle null help text', () => {
    render(
      <FormGroup label="Test Label" help={null}>
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle undefined help text', () => {
    render(
      <FormGroup label="Test Label" help={undefined}>
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should handle special characters in label', () => {
    render(
      <FormGroup label="Test Label!@#$%^&*()">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText('Test Label!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle special characters in error message', () => {
    render(
      <FormGroup label="Test Label" error="Test Error!@#$%^&*()">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText('Test Error!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle special characters in help text', () => {
    render(
      <FormGroup label="Test Label" help="Test Help!@#$%^&*()">
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText('Test Help!@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle long label text', () => {
    const longLabel = 'This is a very long label text that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.';
    render(
      <FormGroup label={longLabel}>
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText(longLabel)).toBeInTheDocument();
  });

  it('should handle long error message', () => {
    const longError = 'This is a very long error message that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.';
    render(
      <FormGroup label="Test Label" error={longError}>
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText(longError)).toBeInTheDocument();
  });

  it('should handle long help text', () => {
    const longHelp = 'This is a very long help text that should be displayed properly without any issues or wrapping problems. It should be readable and maintain its formatting.';
    render(
      <FormGroup label="Test Label" help={longHelp}>
        <Input type="text" name="test" />
      </FormGroup>
    );
    expect(screen.getByText(longHelp)).toBeInTheDocument();
  });
}); 