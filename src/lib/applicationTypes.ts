export type DocumentType = 'identityCard' | 'taxCode' | 'payslips' | 'bankStatement' | 'otherDocuments';

export type UploadedFile = {
  file: File;
  path: string;
  name: string;
  size: number;
};

export type ApplicationFormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  taxCode: string;
  email: string;
  mobilePhone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  region: string;
  employmentStatus: string;
  employer: string;
  monthlyNetIncome: string;
  employmentStartDate: string;
  contractType: string;
  loanType: string;
  requestedAmount: string;
  loanDuration: string;
  purpose: string;
  documents: Partial<Record<DocumentType, UploadedFile>>;
  gdprConsent: boolean;
  privacyConsent: boolean;
  marketingConsent: boolean;
};

export const initialFormData: ApplicationFormData = {
  firstName: '', lastName: '', dateOfBirth: '', taxCode: '', email: '', mobilePhone: '',
  street: '', city: '', province: '', postalCode: '', region: '',
  employmentStatus: '', employer: '', monthlyNetIncome: '', employmentStartDate: '', contractType: '',
  loanType: '', requestedAmount: '', loanDuration: '', purpose: '',
  documents: {}, gdprConsent: false, privacyConsent: false, marketingConsent: false,
};

export type FormErrors = Partial<Record<keyof ApplicationFormData, string>>;

export type DatabasePayload = {
  reference_number: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  tax_code: string;
  email: string;
  mobile_phone: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  region: string;
  employment_status: string;
  employer: string;
  monthly_net_income: number;
  employment_start_date: string;
  contract_type: string;
  loan_type: string;
  requested_amount: number;
  loan_duration_months: number;
  loan_purpose: string;
  document_paths: Record<string, string>;
  gdpr_consent: boolean;
  privacy_consent: boolean;
  marketing_consent: boolean;
};
