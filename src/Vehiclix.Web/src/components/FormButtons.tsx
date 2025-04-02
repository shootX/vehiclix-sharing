import React from 'react';
import Button from './Button';

interface FormButtonsProps {
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onCancel,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <div className="flex justify-end space-x-3">
      {onCancel && (
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={disabled || isLoading}
        >
          {cancelLabel}
        </Button>
      )}
      <Button
        type="submit"
        isLoading={isLoading}
        disabled={disabled}
      >
        {submitLabel}
      </Button>
    </div>
  );
};

export default FormButtons; 