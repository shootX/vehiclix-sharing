export const required = (value: any): string | undefined => {
  if (value === undefined || value === null || value === '') {
    return 'This field is required';
  }
  return undefined;
};

export const email = (value: string): string | undefined => {
  if (!value) return undefined;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(value)) {
    return 'Invalid email address';
  }
  return undefined;
};

export const minLength = (min: number) => (value: string): string | undefined => {
  if (!value) return undefined;
  if (value.length < min) {
    return `Must be at least ${min} characters`;
  }
  return undefined;
};

export const maxLength = (max: number) => (value: string): string | undefined => {
  if (!value) return undefined;
  if (value.length > max) {
    return `Must be at most ${max} characters`;
  }
  return undefined;
};

export const numeric = (value: string): string | undefined => {
  if (!value) return undefined;
  if (!/^\d+$/.test(value)) {
    return 'Must be a number';
  }
  return undefined;
};

export const positiveNumber = (value: number): string | undefined => {
  if (value === undefined || value === null) return undefined;
  if (value <= 0) {
    return 'Must be a positive number';
  }
  return undefined;
};

export const date = (value: string): string | undefined => {
  if (!value) return undefined;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    return 'Invalid date format (YYYY-MM-DD)';
  }
  const dateObj = new Date(value);
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }
  return undefined;
};

export const futureDate = (value: string): string | undefined => {
  if (!value) return undefined;
  const dateError = date(value);
  if (dateError) return dateError;
  const dateObj = new Date(value);
  if (dateObj <= new Date()) {
    return 'Date must be in the future';
  }
  return undefined;
};

export const pastDate = (value: string): string | undefined => {
  if (!value) return undefined;
  const dateError = date(value);
  if (dateError) return dateError;
  const dateObj = new Date(value);
  if (dateObj >= new Date()) {
    return 'Date must be in the past';
  }
  return undefined;
};

export const vin = (value: string): string | undefined => {
  if (!value) return undefined;
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
  if (!vinRegex.test(value)) {
    return 'Invalid VIN format';
  }
  return undefined;
};

export const licensePlate = (value: string): string | undefined => {
  if (!value) return undefined;
  const plateRegex = /^[A-Z0-9]{2,8}$/;
  if (!plateRegex.test(value)) {
    return 'Invalid license plate format';
  }
  return undefined;
};

export const phoneNumber = (value: string): string | undefined => {
  if (!value) return undefined;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phoneRegex.test(value)) {
    return 'Invalid phone number format';
  }
  return undefined;
};

export const url = (value: string): string | undefined => {
  if (!value) return undefined;
  try {
    new URL(value);
    return undefined;
  } catch {
    return 'Invalid URL format';
  }
};

export const password = (value: string): string | undefined => {
  if (!value) return undefined;
  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(value)) {
    return 'Password must contain at least one number';
  }
  if (!/[!@#$%^&*]/.test(value)) {
    return 'Password must contain at least one special character (!@#$%^&*)';
  }
  return undefined;
};

export const confirmPassword = (password: string) => (value: string): string | undefined => {
  if (!value) return undefined;
  if (value !== password) {
    return 'Passwords do not match';
  }
  return undefined;
}; 