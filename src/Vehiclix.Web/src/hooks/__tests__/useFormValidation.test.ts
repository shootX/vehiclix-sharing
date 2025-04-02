import { renderHook, act } from '@testing-library/react-hooks';
import { useFormValidation } from '../useFormValidation';
import { ValidationRules } from '../../types/validation';
import { required, email, minLength } from '../../utils/validation';

describe('useFormValidation', () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationRules: ValidationRules = {
    email: [required, email],
    password: [required, minLength(8)],
  };

  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
  });

  it('should initialize with provided values', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        initialValues,
        validationRules,
        onSubmit,
      })
    );

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should update values on change', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        initialValues,
        validationRules,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleChange({
        target: {
          name: 'email',
          value: 'test@example.com',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.email).toBe('test@example.com');
    expect(result.current.errors.email).toBeUndefined();
  });

  it('should validate field on change', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        initialValues,
        validationRules,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleChange({
        target: {
          name: 'email',
          value: 'invalid-email',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.errors.email).toBeDefined();
  });

  it('should validate all fields on submit', async () => {
    const { result } = renderHook(() =>
      useFormValidation({
        initialValues,
        validationRules,
        onSubmit,
      })
    );

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.errors.email).toBeDefined();
    expect(result.current.errors.password).toBeDefined();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit when form is valid', async () => {
    const { result } = renderHook(() =>
      useFormValidation({
        initialValues,
        validationRules,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleChange({
        target: {
          name: 'email',
          value: 'test@example.com',
        },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: {
          name: 'password',
          value: 'password123',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.errors).toEqual({});
    expect(onSubmit).toHaveBeenCalledWith(result.current.values);
  });

  it('should reset form to initial values', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        initialValues,
        validationRules,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleChange({
        target: {
          name: 'email',
          value: 'test@example.com',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });

  it('should set values manually', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        initialValues,
        validationRules,
        onSubmit,
      })
    );

    const newValues = {
      email: 'test@example.com',
      password: 'password123',
    };

    act(() => {
      result.current.setValues(newValues);
    });

    expect(result.current.values).toEqual(newValues);
  });

  it('should set errors manually', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        initialValues,
        validationRules,
        onSubmit,
      })
    );

    const newErrors = {
      email: 'Invalid email',
      password: 'Password is required',
    };

    act(() => {
      result.current.setErrors(newErrors);
    });

    expect(result.current.errors).toEqual(newErrors);
  });

  it('should handle async validation', async () => {
    const asyncValidation = jest.fn().mockResolvedValue('Async error');
    const rules: ValidationRules = {
      email: [required, email, asyncValidation],
    };

    const { result } = renderHook(() =>
      useFormValidation({
        initialValues,
        validationRules: rules,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleChange({
        target: {
          name: 'email',
          value: 'test@example.com',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.validateField('email');
    });

    expect(result.current.errors.email).toBe('Async error');
  });

  it('should handle validation errors', async () => {
    const validationError = new Error('Validation failed');
    const rules: ValidationRules = {
      email: [
        required,
        () => {
          throw validationError;
        },
      ],
    };

    const { result } = renderHook(() =>
      useFormValidation({
        initialValues,
        validationRules: rules,
        onSubmit,
      })
    );

    act(() => {
      result.current.handleChange({
        target: {
          name: 'email',
          value: 'test@example.com',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.validateField('email');
    });

    expect(result.current.errors.email).toBe(validationError.message);
  });
}); 