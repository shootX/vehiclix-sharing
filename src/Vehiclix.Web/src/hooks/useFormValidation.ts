import { useState } from 'react';

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationRules {
  [key: string]: (value: any) => string | undefined;
}

interface UseFormValidationProps {
  initialValues: Record<string, any>;
  validationRules: ValidationRules;
  onSubmit: (values: Record<string, any>) => void;
}

export const useFormValidation = ({
  initialValues,
  validationRules,
  onSubmit,
}: UseFormValidationProps) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: string, value: any): string | undefined => {
    const rule = validationRules[field];
    if (rule) {
      return rule(value);
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationError[] = [];

    Object.keys(validationRules).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors.push({ field, message: error });
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being changed
    setErrors((prev) => prev.filter((error) => error.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors([]);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
};

export default useFormValidation; 