export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationRule {
  (value: any): string | undefined;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface FormValidationState {
  values: Record<string, any>;
  errors: ValidationError[];
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
  setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setErrors: React.Dispatch<React.SetStateAction<ValidationError[]>>;
}

export interface UseFormValidationProps {
  initialValues: Record<string, any>;
  validationRules: ValidationRules;
  onSubmit: (values: Record<string, any>) => void;
} 