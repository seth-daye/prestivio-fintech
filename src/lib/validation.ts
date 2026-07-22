import type { ApplicationFormData, FormErrors } from './applicationTypes';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[\d\s\(\)\-]{8,20}$/;
const TAX_CODE_REGEX = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;
const POSTAL_CODE_REGEX = /^\d{5}$/;
const PROVINCE_REGEX = /^[A-Z]{2}$/i;

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function validateStep(step: number, data: ApplicationFormData): FormErrors {
  const errors: FormErrors = {};
  switch (step) {
    case 0: {
      if (!data.firstName.trim()) errors.firstName = 'required';
      if (!data.lastName.trim()) errors.lastName = 'required';
      if (!data.dateOfBirth) errors.dateOfBirth = 'required';
      else if (isNaN(new Date(data.dateOfBirth).getTime())) errors.dateOfBirth = 'invalidDate';
      else if (calculateAge(data.dateOfBirth) < 18) errors.dateOfBirth = 'underage';
      if (!data.taxCode.trim()) errors.taxCode = 'required';
      else if (!TAX_CODE_REGEX.test(data.taxCode.trim())) errors.taxCode = 'invalidTaxCode';
      if (!data.email.trim()) errors.email = 'required';
      else if (!EMAIL_REGEX.test(data.email.trim())) errors.email = 'invalidEmail';
      if (!data.mobilePhone.trim()) errors.mobilePhone = 'required';
      else if (!PHONE_REGEX.test(data.mobilePhone.trim())) errors.mobilePhone = 'invalidPhone';
      break;
    }
    case 1: {
      if (!data.street.trim()) errors.street = 'required';
      if (!data.city.trim()) errors.city = 'required';
      if (!data.province.trim()) errors.province = 'required';
      else if (!PROVINCE_REGEX.test(data.province.trim())) errors.province = 'invalidProvince';
      if (!data.postalCode.trim()) errors.postalCode = 'required';
      else if (!POSTAL_CODE_REGEX.test(data.postalCode.trim())) errors.postalCode = 'invalidPostalCode';
      if (!data.region.trim()) errors.region = 'required';
      break;
    }
    case 2: {
      if (!data.employmentStatus) errors.employmentStatus = 'selectOption';
      if (!data.employer.trim()) errors.employer = 'required';
      if (!data.monthlyNetIncome.trim()) errors.monthlyNetIncome = 'required';
      else if (Number(data.monthlyNetIncome) <= 0) errors.monthlyNetIncome = 'invalidIncome';
      if (!data.employmentStartDate) errors.employmentStartDate = 'required';
      if (!data.contractType) errors.contractType = 'selectOption';
      break;
    }
    case 3: {
      if (!data.loanType) errors.loanType = 'selectOption';
      if (!data.requestedAmount.trim()) errors.requestedAmount = 'required';
      else if (Number(data.requestedAmount) < 1000) errors.requestedAmount = 'invalidAmount';
      if (!data.loanDuration.trim()) errors.loanDuration = 'required';
      else if (Number(data.loanDuration) < 12 || Number(data.loanDuration) > 120) errors.loanDuration = 'invalidDuration';
      if (!data.purpose.trim()) errors.purpose = 'required';
      break;
    }
    case 5: {
      if (!data.gdprConsent) errors.gdprConsent = 'gdprRequired';
      if (!data.privacyConsent) errors.privacyConsent = 'privacyRequired';
      break;
    }
  }
  return errors;
}

export function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) return 'fileTooLarge';
  if (!ACCEPTED_TYPES.includes(file.type)) return 'invalidFileType';
  return null;
}

export function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
  return `PRE-${year}-${random}`;
}
