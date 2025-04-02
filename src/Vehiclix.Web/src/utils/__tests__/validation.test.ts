import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
  positiveNumber,
  date,
  futureDate,
  pastDate,
  vin,
  licensePlate,
  phoneNumber,
  url,
  password,
  confirmPassword,
} from '../validation';
import { VALIDATION_MESSAGES } from '../../constants/messages';

describe('Validation Utils', () => {
  describe('required', () => {
    it('should return undefined for non-empty value', () => {
      expect(required('test')).toBeUndefined();
    });

    it('should return error message for empty value', () => {
      expect(required('')).toBe(VALIDATION_MESSAGES.required('Value'));
    });

    it('should return error message for null value', () => {
      expect(required(null)).toBe(VALIDATION_MESSAGES.required('Value'));
    });

    it('should return error message for undefined value', () => {
      expect(required(undefined)).toBe(VALIDATION_MESSAGES.required('Value'));
    });
  });

  describe('email', () => {
    it('should return undefined for valid email', () => {
      expect(email('test@example.com')).toBeUndefined();
    });

    it('should return error message for invalid email', () => {
      expect(email('invalid-email')).toBe(VALIDATION_MESSAGES.email);
    });

    it('should return undefined for empty value', () => {
      expect(email('')).toBeUndefined();
    });
  });

  describe('minLength', () => {
    it('should return undefined for string with sufficient length', () => {
      expect(minLength('test', 3)).toBeUndefined();
    });

    it('should return error message for string with insufficient length', () => {
      expect(minLength('te', 3)).toBe(VALIDATION_MESSAGES.minLength('Value', 3));
    });

    it('should return undefined for empty value', () => {
      expect(minLength('', 3)).toBeUndefined();
    });
  });

  describe('maxLength', () => {
    it('should return undefined for string within length limit', () => {
      expect(maxLength('test', 5)).toBeUndefined();
    });

    it('should return error message for string exceeding length limit', () => {
      expect(maxLength('testing', 5)).toBe(VALIDATION_MESSAGES.maxLength('Value', 5));
    });

    it('should return undefined for empty value', () => {
      expect(maxLength('', 5)).toBeUndefined();
    });
  });

  describe('numeric', () => {
    it('should return undefined for numeric value', () => {
      expect(numeric('123')).toBeUndefined();
    });

    it('should return error message for non-numeric value', () => {
      expect(numeric('abc')).toBe(VALIDATION_MESSAGES.numeric);
    });

    it('should return undefined for empty value', () => {
      expect(numeric('')).toBeUndefined();
    });
  });

  describe('positiveNumber', () => {
    it('should return undefined for positive number', () => {
      expect(positiveNumber('123')).toBeUndefined();
    });

    it('should return error message for negative number', () => {
      expect(positiveNumber('-123')).toBe(VALIDATION_MESSAGES.positiveNumber);
    });

    it('should return undefined for empty value', () => {
      expect(positiveNumber('')).toBeUndefined();
    });
  });

  describe('date', () => {
    it('should return undefined for valid date', () => {
      expect(date('2024-03-20')).toBeUndefined();
    });

    it('should return error message for invalid date', () => {
      expect(date('invalid-date')).toBe(VALIDATION_MESSAGES.date);
    });

    it('should return undefined for empty value', () => {
      expect(date('')).toBeUndefined();
    });
  });

  describe('futureDate', () => {
    it('should return undefined for future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      expect(futureDate(futureDate.toISOString().split('T')[0])).toBeUndefined();
    });

    it('should return error message for past date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      expect(futureDate(pastDate.toISOString().split('T')[0])).toBe(VALIDATION_MESSAGES.futureDate);
    });

    it('should return undefined for empty value', () => {
      expect(futureDate('')).toBeUndefined();
    });
  });

  describe('pastDate', () => {
    it('should return undefined for past date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      expect(pastDate(pastDate.toISOString().split('T')[0])).toBeUndefined();
    });

    it('should return error message for future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      expect(pastDate(futureDate.toISOString().split('T')[0])).toBe(VALIDATION_MESSAGES.pastDate);
    });

    it('should return undefined for empty value', () => {
      expect(pastDate('')).toBeUndefined();
    });
  });

  describe('vin', () => {
    it('should return undefined for valid VIN', () => {
      expect(vin('1HGCM82633A123456')).toBeUndefined();
    });

    it('should return error message for invalid VIN', () => {
      expect(vin('invalid-vin')).toBe(VALIDATION_MESSAGES.vin);
    });

    it('should return undefined for empty value', () => {
      expect(vin('')).toBeUndefined();
    });
  });

  describe('licensePlate', () => {
    it('should return undefined for valid license plate', () => {
      expect(licensePlate('ABC123')).toBeUndefined();
    });

    it('should return error message for invalid license plate', () => {
      expect(licensePlate('invalid-plate')).toBe(VALIDATION_MESSAGES.licensePlate);
    });

    it('should return undefined for empty value', () => {
      expect(licensePlate('')).toBeUndefined();
    });
  });

  describe('phoneNumber', () => {
    it('should return undefined for valid phone number', () => {
      expect(phoneNumber('+995555123456')).toBeUndefined();
    });

    it('should return error message for invalid phone number', () => {
      expect(phoneNumber('invalid-phone')).toBe(VALIDATION_MESSAGES.phoneNumber);
    });

    it('should return undefined for empty value', () => {
      expect(phoneNumber('')).toBeUndefined();
    });
  });

  describe('url', () => {
    it('should return undefined for valid URL', () => {
      expect(url('https://example.com')).toBeUndefined();
    });

    it('should return error message for invalid URL', () => {
      expect(url('invalid-url')).toBe(VALIDATION_MESSAGES.url);
    });

    it('should return undefined for empty value', () => {
      expect(url('')).toBeUndefined();
    });
  });

  describe('password', () => {
    it('should return undefined for valid password', () => {
      expect(password('Test123!')).toBeUndefined();
    });

    it('should return error message for invalid password', () => {
      expect(password('weak')).toBe(VALIDATION_MESSAGES.password);
    });

    it('should return undefined for empty value', () => {
      expect(password('')).toBeUndefined();
    });
  });

  describe('confirmPassword', () => {
    it('should return undefined for matching passwords', () => {
      expect(confirmPassword('password123', 'password123')).toBeUndefined();
    });

    it('should return error message for non-matching passwords', () => {
      expect(confirmPassword('password123', 'different')).toBe(VALIDATION_MESSAGES.confirmPassword);
    });

    it('should return undefined for empty value', () => {
      expect(confirmPassword('', '')).toBeUndefined();
    });
  });
}); 