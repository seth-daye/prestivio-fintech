import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import type { ApplicationFormData, FormErrors, DocumentType, UploadedFile, DatabasePayload } from '@/lib/applicationTypes';
import { initialFormData } from '@/lib/applicationTypes';
import { validateStep, generateReferenceNumber } from '@/lib/validation';
import { supabase } from '@/lib/supabase';
import PersonalStep from './steps/PersonalStep';
import AddressStep from './steps/AddressStep';
import EmploymentStep from './steps/EmploymentStep';
import LoanStep from './steps/LoanStep';
import DocumentsStep from './steps/DocumentsStep';
import ConsentStep from './steps/ConsentStep';
import SummaryStep from './steps/SummaryStep';
import { ValidationErrorSummary } from './FormFields';

const TOTAL_STEPS = 7;
const STEP_KEYS = ['personal', 'address', 'employment', 'loan', 'documents', 'consent', 'summary'];

type Props = { onSuccess: (referenceNumber: string) => void };

export default function LoanApplicationForm({ onSuccess }: Props) {
  const { t } = useTranslation('application');
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<ApplicationFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const applicationId = useState(() => crypto.randomUUID())[0];

  const update = useCallback((field: keyof ApplicationFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (showErrors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, [showErrors]);

  const updateBoolean = useCallback((field: keyof ApplicationFormData, value: boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (showErrors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, [showErrors]);

  const updateDocument = useCallback((_field: 'documents', docType: DocumentType, file: UploadedFile | null) => {
    setData((prev) => {
      const docs = { ...prev.documents };
      if (file) docs[docType] = file;
      else delete docs[docType];
      return { ...prev, documents: docs };
    });
  }, []);

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, data);
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); setShowErrors(true); return; }
    setErrors({}); setShowErrors(false);
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const handleBack = () => { setErrors({}); setShowErrors(false); setCurrentStep((s) => Math.max(s - 1, 0)); };
  const handleEdit = (step: number) => { setCurrentStep(step); };

  const handleSubmit = async () => {
    const stepErrors = validateStep(5, data);
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); setShowErrors(true); return; }
    setSubmitting(true); setSubmitError(false);
    try {
      const referenceNumber = generateReferenceNumber();
      const documentPaths: Record<string, string> = {};
      Object.entries(data.documents).forEach(([key, file]) => { if (file) documentPaths[key] = file.path; });
      const payload: DatabasePayload = {
        reference_number: referenceNumber, first_name: data.firstName, last_name: data.lastName,
        date_of_birth: data.dateOfBirth, tax_code: data.taxCode, email: data.email, mobile_phone: data.mobilePhone,
        street: data.street, city: data.city, province: data.province, postal_code: data.postalCode, region: data.region,
        employment_status: data.employmentStatus, employer: data.employer, monthly_net_income: Number(data.monthlyNetIncome),
        employment_start_date: data.employmentStartDate, contract_type: data.contractType, loan_type: data.loanType,
        requested_amount: Number(data.requestedAmount), loan_duration_months: Number(data.loanDuration), loan_purpose: data.purpose,
        document_paths: documentPaths, gdpr_consent: data.gdprConsent, privacy_consent: data.privacyConsent, marketing_consent: data.marketingConsent,
      };
      const { error } = await supabase.from('loan_applications').insert(payload);
      if (error) throw error;
      onSuccess(referenceNumber);
    } catch { setSubmitError(true); } finally { setSubmitting(false); }
  };

  const progressPercent = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="container-px max-w-3xl py-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-500">{t('progress.step', { current: currentStep + 1, total: TOTAL_STEPS })}</span>
          <span className="text-xs text-navy-400">{Math.round(progressPercent)}%</span>
        </div>
        <div className="flex gap-1.5">
          {STEP_KEYS.map((key, i) => (
            <div key={key} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-gold-400' : 'bg-navy-100'}`} />
              <span className={`mt-2 hidden text-[10px] font-medium uppercase tracking-wider sm:block ${i <= currentStep ? 'text-navy-700' : 'text-navy-300'}`}>{t(`progress.${key}`)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft sm:p-8">
        {showErrors && Object.keys(errors).length > 0 && <ValidationErrorSummary errors={errors} />}
        {submitError && (<div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3"><p className="text-sm font-medium text-red-600">{t('errors.submitFailed')}</p></div>)}
        <div key={currentStep}>
          {currentStep === 0 && <PersonalStep data={data} errors={showErrors ? errors : {}} update={update} />}
          {currentStep === 1 && <AddressStep data={data} errors={showErrors ? errors : {}} update={update} />}
          {currentStep === 2 && <EmploymentStep data={data} errors={showErrors ? errors : {}} update={update} />}
          {currentStep === 3 && <LoanStep data={data} errors={showErrors ? errors : {}} update={update} />}
          {currentStep === 4 && <DocumentsStep data={data} update={updateDocument} applicationId={applicationId} />}
          {currentStep === 5 && <ConsentStep data={data} errors={showErrors ? errors : {}} update={updateBoolean} />}
          {currentStep === 6 && <SummaryStep data={data} onEdit={handleEdit} />}
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-navy-100 pt-6">
          <button onClick={handleBack} disabled={currentStep === 0} className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 disabled:pointer-events-none disabled:opacity-40"><ArrowLeft className="h-4 w-4" />{t('buttons.back')}</button>
          {currentStep < TOTAL_STEPS - 1 ? (
            <button onClick={handleNext} className="btn-gold">{t('buttons.next')}<ArrowRight className="h-4 w-4" /></button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="btn-gold disabled:opacity-60">
              {submitting ? (<span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-900 border-t-transparent" />{t('buttons.submit')}</span>) : (<><Send className="h-4 w-4" />{t('buttons.submit')}</>)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
