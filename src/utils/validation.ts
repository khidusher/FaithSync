/**
 * Input validation and sanitization for FaithSync.
 * Enforces safety, sensible length bounds, and non-destructive trimming.
 */

export interface ValidationResult<T = string> {
  isValid: boolean;
  sanitized: T;
  error?: string;
}

/**
 * Validate user name (first name, last name, full name, display name)
 * Bounds: 1 - 70 characters
 */
export function validateName(name: string, fieldName = 'Name'): ValidationResult<string> {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return { isValid: false, sanitized: '', error: `${fieldName} is required.` };
  }
  if (trimmed.length > 70) {
    return {
      isValid: false,
      sanitized: trimmed.slice(0, 70),
      error: `${fieldName} cannot exceed 70 characters.`
    };
  }
  // Remove control characters except standard spaces
  const sanitized = trimmed.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
  return { isValid: true, sanitized };
}

/**
 * Validate email address
 * Bounds: standard email format, max 100 characters
 */
export function validateEmail(email: string): ValidationResult<string> {
  const trimmed = (email || '').trim().toLowerCase();
  if (!trimmed) {
    return { isValid: false, sanitized: '', error: 'Email address is required.' };
  }
  if (trimmed.length > 100) {
    return { isValid: false, sanitized: trimmed, error: 'Email cannot exceed 100 characters.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, sanitized: trimmed, error: 'Please enter a valid email address.' };
  }
  return { isValid: true, sanitized: trimmed };
}

/**
 * Validate password
 * Bounds: min 6 characters, max 128 characters
 */
export function validatePassword(password: string): ValidationResult<string> {
  if (!password || password.length < 6) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Password must be at least 6 characters long.'
    };
  }
  if (password.length > 128) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Password cannot exceed 128 characters.'
    };
  }
  return { isValid: true, sanitized: password };
}

/**
 * Validate journal reflection and study notes.
 * Preserves paragraphs, formatting, quotes, and punctuation.
 * Max limit: 10,000 characters (ample for deep spiritual journaling).
 */
export function validateReflectionText(
  text: string,
  maxLength = 10000,
  fieldName = 'Reflection'
): ValidationResult<string> {
  if (!text) {
    return { isValid: true, sanitized: '' };
  }
  // Clean null characters or zero-width crashes while preserving newlines
  const sanitized = text.replace(/[\u0000]/g, '');
  if (sanitized.length > maxLength) {
    return {
      isValid: false,
      sanitized: sanitized.slice(0, maxLength),
      error: `${fieldName} cannot exceed ${maxLength.toLocaleString()} characters.`
    };
  }
  return { isValid: true, sanitized };
}

/**
 * Validate personal prayer
 * Title: 1 - 120 characters
 * Body: 1 - 10,000 characters
 */
export function validatePrayerInput(
  title: string,
  body: string
): { isValid: boolean; sanitizedTitle: string; sanitizedBody: string; error?: string } {
  const cleanTitle = (title || '').trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
  const cleanBody = (body || '').replace(/[\u0000]/g, '');

  if (!cleanTitle && !cleanBody.trim()) {
    return {
      isValid: false,
      sanitizedTitle: '',
      sanitizedBody: '',
      error: 'Prayer title or text is required.'
    };
  }

  if (cleanTitle.length > 120) {
    return {
      isValid: false,
      sanitizedTitle: cleanTitle.slice(0, 120),
      sanitizedBody: cleanBody,
      error: 'Prayer title cannot exceed 120 characters.'
    };
  }

  if (cleanBody.length > 10000) {
    return {
      isValid: false,
      sanitizedTitle: cleanTitle,
      sanitizedBody: cleanBody.slice(0, 10000),
      error: 'Prayer body cannot exceed 10,000 characters.'
    };
  }

  return {
    isValid: true,
    sanitizedTitle: cleanTitle || 'Personal Prayer',
    sanitizedBody: cleanBody
  };
}

/**
 * Validate 24-hour reminder time format (HH:MM)
 */
export function validateReminderTime(timeStr: string): ValidationResult<string> {
  const trimmed = (timeStr || '').trim();
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(trimmed)) {
    return {
      isValid: false,
      sanitized: '07:00',
      error: 'Please specify a valid time in HH:MM format.'
    };
  }
  return { isValid: true, sanitized: trimmed };
}

/**
 * Validate reminder days selection
 */
export const VALID_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function validateReminderDays(days: string[]): ValidationResult<string[]> {
  if (!Array.isArray(days) || days.length === 0) {
    return { isValid: true, sanitized: [...VALID_DAYS] };
  }
  const filtered = days.filter(d => VALID_DAYS.includes(d));
  return {
    isValid: true,
    sanitized: filtered.length > 0 ? filtered : [...VALID_DAYS]
  };
}
