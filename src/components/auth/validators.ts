export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/;
export const PASSWORD_RULE_MESSAGE =
  "6~10자, 영문 대소문자·숫자·특수문자(!@#$%^&*)를 각각 1개 이상 포함해주세요.";
export const BUSINESS_NUMBER_REGEX = /^\d{3}-\d{2}-\d{5}$/;
export const COMPANY_NAME_REGEX = /^[가-힣a-zA-Z0-9\s]{2,50}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
