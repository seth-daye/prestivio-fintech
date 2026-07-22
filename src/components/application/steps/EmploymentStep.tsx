import { useTranslation } from 'react-i18next';
import type { ApplicationFormData, FormErrors } from '@/lib/applicationTypes';
import { TextField, SelectField, StepHeader } from '../FormFields';

type Props = { data: ApplicationFormData; errors: FormErrors; update: (field: keyof ApplicationFormData, value: string) => void };

export default function EmploymentStep({ data, errors, update }: Props) {
  const { t } = useTranslation('application');
  const employmentOptions = [
    { value: 'employed', label: t('employmentStatuses.employed') },
    { value: 'selfEmployed', label: t('employmentStatuses.selfEmployed') },
    { value: 'pensioner', label: t('employmentStatuses.pensioner') },
    { value: 'unemployed', label: t('employmentStatuses.unemployed') },
  ];
  const contractOptions = [
    { value: 'permanent', label: t('contractTypes.permanent') },
    { value: 'fixedTerm', label: t('contractTypes.fixedTerm') },
    { value: 'temporary', label: t('contractTypes.temporary') },
    { value: 'freelance', label: t('contractTypes.freelance') },
    { value: 'pension', label: t('contractTypes.pension') },
    { value: 'other', label: t('contractTypes.other') },
  ];
  return (
    <div className="animate-fade-up">
      <StepHeader eyebrow={t('progress.employment')} title={t('employment.title')} subtitle={t('employment.subtitle')} />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField name="employmentStatus" label={t('employment.employmentStatus')} placeholder={t('employment.employmentStatusPlaceholder')} value={data.employmentStatus} onChange={(v: string) => update('employmentStatus', v)} error={errors.employmentStatus} options={employmentOptions} required />
        <TextField name="employer" label={t('employment.employer')} placeholder={t('employment.employerPlaceholder')} value={data.employer} onChange={(v: string) => update('employer', v)} error={errors.employer} required />
        <TextField name="monthlyNetIncome" label={t('employment.monthlyNetIncome')} placeholder={t('employment.monthlyNetIncomePlaceholder')} type="number" value={data.monthlyNetIncome} onChange={(v: string) => update('monthlyNetIncome', v)} error={errors.monthlyNetIncome} required />
        <TextField name="employmentStartDate" label={t('employment.employmentStartDate')} type="date" value={data.employmentStartDate} onChange={(v: string) => update('employmentStartDate', v)} error={errors.employmentStartDate} required />
        <div className="sm:col-span-2"><SelectField name="contractType" label={t('employment.contractType')} placeholder={t('employment.employmentStatusPlaceholder')} value={data.contractType} onChange={(v: string) => update('contractType', v)} error={errors.contractType} options={contractOptions} required /></div>
      </div>
    </div>
  );
}
