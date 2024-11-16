const isValidPhone = (number: string): boolean => {
  const cleanedNumber = number.replace(/\s+/g, "");
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(cleanedNumber);
};

const isValidEmail = (email: string): boolean => {
  const cleanedEmail = email.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(cleanedEmail);
};

// Password regex
const alphaNumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/;
const securePasswordLength = 8;

const isAlphaNumeric = (value: string): boolean =>
  alphaNumericRegex.test(value);

const hasSpecialChar = (value: string): boolean => specialCharRegex.test(value);

const isSecureLength = (value: string): boolean =>
  value.length >= securePasswordLength;

const isPasswordSecure = (password: string): boolean => {
  return (
    isAlphaNumeric(password) &&
    hasSpecialChar(password) &&
    isSecureLength(password)
  );
};

export {
  isValidPhone,
  isValidEmail,
  isAlphaNumeric,
  hasSpecialChar,
  isSecureLength,
  isPasswordSecure,
  securePasswordLength,
};
