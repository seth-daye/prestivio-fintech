import { useTranslation } from 'react-i18next';
import type { ApplicationFormData, FormErrors } from '@/lib/applicationTypes';
import { TextField, SelectField, TextAreaField, StepHeader } from '../FormFields';
import { loanProducts } from '@/data/loans';

type Props = { data: ApplicationFormData; errors: FormErrors; update: (field: keyof ApplicationFormData, value: string) => void };

export default function LoanStep({ data, errors, update }: Props) {
  const { t } = useTranslation('application');
  const { t: tLoans } = useTranslation('loans');
  const loanOptions = loanProducts.map((loan) => ({ value: loan.id, label: tLoans(`loans.${loan.id}.name`) }));
  return (
    <div className="animate-fade-up">
      <StepHeader eyebrow={t('progress.loan')} title={t('loan.title')} subtitle={t('loan.subtitle')} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2"><SelectField name="loanType" label={t('loan.loanType')} placeholder={t('loan.loanTypePlaceholder')} value={data.loanType} onChange={(v: string) => update('loanType', v)} error={errors.loanType} options={loanOptions} required /></div>
        <TextField name="requestedAmount" label={t('loan.requestedAmount')} placeholder={t('loan.requestedAmountPlaceholder')} type="number" value={data.requestedAmount} onChange={(v: string) => update('requestedAmount', v)} error={errors.requestedAmount} required />
        <TextField name="loanDuration" label={t('loan.loanDuration')} placeholder={t('loan.loanDurationPlaceholder')} type="number" value={data.loanDuration} onChange={(v: string) => update('loanDuration', v)} error={errors.loanDuration} required />
        <div className="sm:col-span-2"><TextAreaField name="purpose" label={t('loan.purpose')} placeholder={t('loan.purposePlaceholder')} value={data.purpose} onChange={(v: string) => update('purpose', v)} error={errors.purpose} required /></div>
      </div>
    </div>
  );
}
