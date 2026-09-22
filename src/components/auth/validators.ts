export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/;
export const BUSINESS_NUMBER_REGEX = /^\d{3}-\d{2}-\d{5}$/;
export const COMPANY_NAME_REGEX = /^[가-힣a-zA-Z0-9\s]{2,50}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
