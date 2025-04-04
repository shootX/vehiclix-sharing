

export const messages = {
  // Form validation messages
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Cannot exceed ${max} characters`,
  pattern: 'The input format is invalid',
  match: 'Fields do not match',
  numeric: 'Please enter a valid number',
  integer: 'Please enter a valid integer',
  positiveNumber: 'Please enter a positive number',
  date: 'Please enter a valid date',
  password: 'Password must contain at least 8 characters, including uppercase, lowercase, and a number',
  
  // Success messages
  loginSuccess: 'Successfully logged in',
  registerSuccess: 'Account created successfully',
  updateSuccess: 'Updated successfully',
  createSuccess: 'Created successfully',
  deleteSuccess: 'Deleted successfully',
  
  // Error messages
  generalError: 'An error occurred. Please try again.',
  loginError: 'Login failed. Please check your credentials.',
  registerError: 'Registration failed. Please try again.',
  networkError: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  validationError: 'Please fix the validation errors.',
  
  // Confirmation messages
  deleteConfirm: 'Are you sure you want to delete this item?',
  cancelConfirm: 'Are you sure you want to cancel? Any unsaved changes will be lost.',
  logoutConfirm: 'Are you sure you want to log out?',
  
  // Status messages
  loading: 'Loading...',
  processing: 'Processing...',
  saving: 'Saving...',
  uploading: 'Uploading...',
  
  // Vehicle-specific messages
  vehicleCreated: 'Vehicle added successfully',
  vehicleUpdated: 'Vehicle information updated',
  vehicleDeleted: 'Vehicle removed from the system',
  vehicleNotFound: 'Vehicle not found',
  
  // Insurance-specific messages
  insuranceCreated: 'Insurance policy created',
  insuranceUpdated: 'Insurance policy updated',
  insuranceExpired: 'Insurance policy has expired',
  insuranceExpiring: 'Insurance policy is expiring soon',
  
  // Claim-specific messages
  claimCreated: 'Claim submitted successfully',
  claimUpdated: 'Claim information updated',
  claimProcessed: 'Claim has been processed',
  claimRejected: 'Claim has been rejected',
  photoUploaded: 'Claim photo uploaded successfully',
  photoDeleted: 'Claim photo deleted successfully',
  
  // Fine-specific messages
  fineCreated: 'Fine recorded successfully',
  finePaid: 'Fine marked as paid',
  fineOverdue: 'Fine payment is overdue',
  
  // API integration messages
  apiConnected: 'API connection established',
  apiDisconnected: 'API connection lost',
  apiKeyGenerated: 'New API key generated',
  apiKeyRevoked: 'API key has been revoked',
  webhookCreated: 'Webhook endpoint created',
  webhookUpdated: 'Webhook endpoint updated',
  webhookDeleted: 'Webhook endpoint deleted',
  syncStarted: 'Data synchronization started',
  syncCompleted: 'Data synchronization completed',
  syncFailed: 'Data synchronization failed',
  
  // User management messages
  userCreated: 'User account created',
  userUpdated: 'User information updated',
  userDeleted: 'User account deleted',
  passwordChanged: 'Password has been changed',
  passwordReset: 'Password reset email sent',
  
  // Report messages
  reportGenerated: 'Report generated successfully',
  reportFailed: 'Failed to generate report',
  reportScheduled: 'Report scheduled for generation',
  noDataForReport: 'No data available for the selected report criteria',
  
  // Provider messages
  providerCreated: 'Provider added successfully',
  providerUpdated: 'Provider information updated',
  providerDeleted: 'Provider removed from the system',
  providerActivated: 'Provider has been activated',
  providerDeactivated: 'Provider has been deactivated',
};

