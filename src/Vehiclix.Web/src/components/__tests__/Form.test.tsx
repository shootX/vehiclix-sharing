import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../Form';
import FormGroup from '../FormGroup';
import Input from '../Input';
import FormButtons from '../FormButtons';

describe('Form', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form with children', () => {
    render(
      <Form onSubmit={mockOnSubmit}>
        <div>Test Content</div>
      </Form>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should handle form submission', () => {
    render(
      <Form onSubmit={mockOnSubmit}>
        <FormGroup label="Test">
          <Input type="text" name="test" />
        </FormGroup>
        <FormButtons onSubmit={mockOnSubmit} />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test value' } });
    fireEvent.click(screen.getByText('შენახვა'));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should handle form cancellation', () => {
    render(
      <Form onSubmit={mockOnSubmit} onCancel={mockOnCancel}>
        <FormGroup label="Test">
          <Input type="text" name="test" />
        </FormGroup>
        <FormButtons onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </Form>
    );

    fireEvent.click(screen.getByText('გაუქმება'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should apply correct styling to form', () => {
    const { container } = render(
      <Form onSubmit={mockOnSubmit}>
        <div>Test Content</div>
      </Form>
    );
    expect(container.firstChild).toHaveClass('space-y-6');
  });

  it('should handle form submission with preventDefault', () => {
    render(
      <Form onSubmit={mockOnSubmit}>
        <FormGroup label="Test">
          <Input type="text" name="test" />
        </FormGroup>
        <FormButtons onSubmit={mockOnSubmit} />
      </Form>
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should handle form submission with form data', () => {
    render(
      <Form onSubmit={mockOnSubmit}>
        <FormGroup label="Test">
          <Input type="text" name="test" defaultValue="test value" />
        </FormGroup>
        <FormButtons onSubmit={mockOnSubmit} />
      </Form>
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should handle form submission with validation', () => {
    render(
      <Form onSubmit={mockOnSubmit}>
        <FormGroup label="Test" required>
          <Input type="text" name="test" required />
        </FormGroup>
        <FormButtons onSubmit={mockOnSubmit} />
      </Form>
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should handle form submission with custom validation', () => {
    const mockValidate = jest.fn().mockReturnValue(true);
    render(
      <Form onSubmit={mockOnSubmit} validate={mockValidate}>
        <FormGroup label="Test">
          <Input type="text" name="test" />
        </FormGroup>
        <FormButtons onSubmit={mockOnSubmit} />
      </Form>
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(mockValidate).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('should handle form submission with async validation', async () => {
    const mockValidate = jest.fn().mockResolvedValue(true);
    render(
      <Form onSubmit={mockOnSubmit} validate={mockValidate}>
        <FormGroup label="Test">
          <Input type="text" name="test" />
        </FormGroup>
        <FormButtons onSubmit={mockOnSubmit} />
      </Form>
    );

    const form = screen.getByRole('form');
    await fireEvent.submit(form);
    expect(mockValidate).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('should handle form submission with validation errors', () => {
    const mockValidate = jest.fn().mockReturnValue(false);
    render(
      <Form onSubmit={mockOnSubmit} validate={mockValidate}>
        <FormGroup label="Test">
          <Input type="text" name="test" />
        </FormGroup>
        <FormButtons onSubmit={mockOnSubmit} />
      </Form>
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(mockValidate).toHaveBeenCalled();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should handle form submission with async validation errors', async () => {
    const mockValidate = jest.fn().mockResolvedValue(false);
    render(
      <Form onSubmit={mockOnSubmit} validate={mockValidate}>
        <FormGroup label="Test">
          <Input type="text" name="test" />
        </FormGroup>
        <FormButtons onSubmit={mockOnSubmit} />
      </Form>
    );

    const form = screen.getByRole('form');
    await fireEvent.submit(form);
    expect(mockValidate).toHaveBeenCalled();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should handle form submission with custom error handling', () => {
    const mockOnError = jest.fn();
    render(
      <Form onSubmit={mockOnSubmit} onError={mockOnError}>
        <FormGroup label="Test">
          <Input type="text" name="test" required />
        </FormGroup>
        <FormButtons onSubmit={mockOnSubmit} />
      </Form>
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(mockOnError).toHaveBeenCalled();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should handle form submission with custom success handling', () => {
    const mockOnSuccess = jest.fn();
    render(
      <Form onSubmit={mockOnSubmit} onSuccess={mockOnSuccess}>
        <FormGroup label="Test">
          <Input type="text" name="test" />
        </FormGroup>
        <FormButtons onSubmit={mockOnSubmit} />
      </Form>
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(mockOnSuccess).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalled();
  });
}); 